import type { PageServerLoadEvent } from './$types';
import {
  deleteUserRelationshipMood,
  deleteUserRelationshipNeed,
  getUserRelationship,
  updateUserRelationship,
} from '$lib/storage';
import { fail, redirect, type Actions, error } from '@sveltejs/kit';
import { userIdGenerator } from '$lib/userIdGenerator';

export const load = async ({ params, parent }: PageServerLoadEvent) => {

  const { session, userId } = await parent();
  if (!session?.user) {
    throw redirect(302, '/');
  }

  const relationship = await getUserRelationship(userId, params.relationshipid);
  if (!relationship) {
    throw error(404, 'Not Found');
  }
  return {
    relationship,
    userId
  };
}

export const actions = {
	update: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user) {
      throw redirect(302, '/auth/signin');
    }
		const data = await request.formData();
    const userId = userIdGenerator(session.user);
		try {
      const relationshipid = data.get('relationshipid') as string;
      if (!relationshipid) {
        throw new Error("relationshipid is required")
      }
      const relationship = await getUserRelationship(userId, relationshipid);
      if (!relationship) {
        throw new Error("unknown relationship id")
      }
      const name = data.get('name') as string;
      if (!name) {
        throw new Error("Name is required")
      }
      const myname = data.get('myname') as string;
      if (!name) {
        throw new Error("Name is required")
      }
      return await updateUserRelationship(userId, name, myname, relationshipid)
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},
  deleteMood: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user) {
      throw redirect(302, '/auth/signin');
    }
		const data = await request.formData();
    const userId = userIdGenerator(session.user);
		try {
      const relationshipid = data.get('relationshipid') as string;
      if (!relationshipid) {
        throw new Error("relationshipid is required")
      }
      const relationship = await getUserRelationship(userId, relationshipid);
      if (!relationship) {
        throw new Error("unknown relationship id")
      }
      const moodid = data.get('moodid') as string;
      if (!moodid) {
        throw new Error("moodid is required")
      }
      const mood = relationship.moods.find(x => x.id === moodid);
      if (!mood) {
        // noop
        return {};
      }
      await deleteUserRelationshipMood(userId, relationshipid, mood);
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},
  deleteNeed: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user) {
      throw redirect(302, '/auth/signin');
    }
		const data = await request.formData();
    const userId = userIdGenerator(session.user);
		try {
      const relationshipid = data.get('relationshipid') as string;
      if (!relationshipid) {
        throw new Error("relationshipid is required")
      }
      const relationship = await getUserRelationship(userId, relationshipid);
      if (!relationship) {
        throw new Error("unknown relationship id")
      }
      const needid = data.get('needid') as string;
      if (!needid) {
        throw new Error("needid is required")
      }
      const need = relationship.needs.find(x => x.id === needid);
      if (!need) {
        // noop
        return {};
      }
      await deleteUserRelationshipNeed(userId, relationshipid, need);
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},
} satisfies Actions;