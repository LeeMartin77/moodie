import type { PageServerLoadEvent } from './$types';
import {
  getAllMoods,
  getAllNeeds,
  getUserRelationships,
  getLatestRelationshipMoodLogs,
  insertRelationshipMoodLog
} from '$lib/storage';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async ({ parent }: PageServerLoadEvent) => {
  const { session } = await parent();
  if (!session?.user) {
    throw redirect(302, '/');
  }

  if (!session.user?.email) {
    throw error(500, 'Cannot access user info');
  }

  const userId = session.user.email;

  const moods = await getAllMoods();
  const needs = await getAllNeeds();
  const userRelationships = await getUserRelationships(userId);
  const relationshipMoodLogs = userRelationships.length > 0 ? 
    await getLatestRelationshipMoodLogs(userRelationships.map(x => x.relationshipid)) :
    [];

  return {
    moods,
    needs,
    userRelationships,
    relationshipMoodLogs
  };
}

export const actions = {
  addlog: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user?.email) {
      throw redirect(302, '/auth/signin');
    }
    const userid = session.user?.email;
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
      if (!userRelationships.map(x => x.relationshipid).includes(relationshipid)) {
        throw new Error("Invalid relationshipid")
      }

      const feelingInt = parseInt(feeling);

      if (isNaN(feelingInt)) {
        throw new Error("Invalid feeling")
      }

      const [moods, needs] = await Promise.all([getAllMoods(), getAllNeeds()]);

      const mood = moods.find(x => x.id === moodid);
      const need = needs.find(x => x.id === needid);

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
}