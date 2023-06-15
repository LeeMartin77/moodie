import type { PageServerLoadEvent } from './$types';
import {
  getUserRelationships,
  getLatestRelationshipMoodLogs,
  insertRelationshipMoodLog
} from '$lib/storage';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { userIdGenerator } from '$lib/userIdGenerator';

export const load = async ({ parent }: PageServerLoadEvent) => {
  const { session, userId } = await parent();
  if (!session?.user) {
    throw redirect(302, '/');
  }

  if (!userId) {
    throw error(500, 'Cannot access user info');
  }

  const userRelationships = await getUserRelationships(userId);
  const relationshipMoodLogs = userRelationships.length > 0 ? 
    await getLatestRelationshipMoodLogs(userRelationships.map(x => x.relationshipid)) :
    [];

  return {
    userId,
    userRelationships,
    relationshipMoodLogs
  };
}

export const actions = {
  addlog: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user) {
      throw redirect(302, '/auth/signin');
    }
    const userid = userIdGenerator(session.user);
		const data = await request.formData();
    const fields = ["relationshipid", "partnername", "feeling", "moodid", "needid"];
    const neededData = fields.map(x => {
      return data.get(x) 
    });
		try {
      if (!neededData.every(x => !!x)) {
        throw new Error("Missing required data")
      }
      const [relationshipid, partnername, feeling, moodid, needid] = neededData as string[];

      const userRelationships = await getUserRelationships(userid);
      const relationship = userRelationships.find(x => x.relationshipid === relationshipid)
      if (!relationship) {
        throw new Error("Invalid relationshipid")
      }

      const feelingInt = parseInt(feeling);

      if (isNaN(feelingInt)) {
        throw new Error("Invalid feeling")
      }

      const mood = Array.from(relationship.moods).find(x => x.id === moodid);
      const need = Array.from(relationship.needs).find(x => x.id === needid);

      if (!mood) {
        throw new Error("Invalid moodid")
      }
      
      if (!need) {
        throw new Error("Invalid needid")
      }

      await insertRelationshipMoodLog({
        relationshipid,
        userid,
        partnername,
        feeling: feelingInt,
        moodid: mood.id,
        mood: mood.name,
        positive: mood.positive,
        negative: mood.negative,
        needid: need.id,
        need: need.name,
        active: need.active,
        passive: need.passive
      })
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	}
} satisfies Actions;