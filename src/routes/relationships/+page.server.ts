import type { PageServerLoadEvent } from './$types';
import {
  getUserRelationships,
  createUserRelationship,
  createRelationshipInvite,
  removeUserRelationship,
  updateUserRelationship,
  getAllDefaultNeeds,
  getAllDefaultMoods,
  deleteCurrentMoodLog
} from '$lib/storage';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { userIdGenerator } from '$lib/userIdGenerator';

export const load = async ({ parent }: PageServerLoadEvent) => {

  const { session, userId } = await parent();
  if (!session?.user) {
    throw redirect(302, '/');
  }

  const relationships = await getUserRelationships(userId);
  return {
    relationships,
    userId
  };
}

export const actions = {
	create: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user) {
      throw redirect(302, '/auth/signin');
    }
		const data = await request.formData();

		try {
      const name = data.get('name') as string;
      if (!name) {
        throw new Error("Name is required")
      }
      const myname = data.get('myname') as string;
      if (!name) {
        throw new Error("Name is required")
      }
      const [defaultNeeds, defaultMoods] = await Promise.all([getAllDefaultNeeds(),getAllDefaultMoods()])

      return await createUserRelationship(userIdGenerator(session.user), name, myname, defaultMoods, defaultNeeds)
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},
	update: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user) {
      throw redirect(302, '/auth/signin');
    }
		const data = await request.formData();

		try {
      const name = data.get('name') as string;
      if (!name) {
        throw new Error("Name is required")
      }
      const myname = data.get('myname') as string;
      if (!name) {
        throw new Error("Name is required")
      }
      const relationshipid = data.get('relationshipid') as string;
      if (!relationshipid) {
        throw new Error("relationshipid is required")
      }
      return await updateUserRelationship(userIdGenerator(session.user), name, myname, relationshipid)
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},
	leave: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user) {
      throw redirect(302, '/auth/signin');
    }
		const data = await request.formData();

		try {
      const relationshipid = data.get('relationshipid') as string;
      if (!relationshipid) {
        throw new Error("relationshipid is required")
      }
      await deleteCurrentMoodLog(relationshipid, userIdGenerator(session.user))
      return await removeUserRelationship(userIdGenerator(session.user), relationshipid)
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},
	invite: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user) {
      throw redirect(302, '/auth/signin');
    }
		const data = await request.formData();
		try {
      const userId = userIdGenerator(session.user);
      const name = data.get('invitername') as string;
      const relationshipid = data.get('relationshipid') as string;
      if (!name) {
        throw new Error("Inviter name is required")
      }
      if (!relationshipid) {
        throw new Error("relationshipid is required")
      }
      const relationships = await getUserRelationships(userId);
      if (!relationships.map(x => x.relationshipid).includes(relationshipid)) {
        throw new Error("Relationship not found")
      }
      return await createRelationshipInvite(userId, relationshipid, name);
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	}
} satisfies Actions;