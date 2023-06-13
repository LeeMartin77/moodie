import type { PageServerLoadEvent } from './$types';
import {
  getUserRelationships,
  createUserRelationship,
  createRelationshipInvite
} from '$lib/storage';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ parent }: PageServerLoadEvent) => {

  const { session } = await parent();
  if (!session?.user) {
    throw redirect(302, '/');
  }

  if (!session.user?.email) {
    throw error(500, 'Cannot access user info');
  }

  const userId = session.user.email;

  const relationships = await getUserRelationships(userId);
  return {
    relationships,
    userId
  };
}

export const actions = {
	create: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user?.email) {
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
      return await createUserRelationship(session.user?.email, name, myname)
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},
	invite: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user?.email) {
      throw redirect(302, '/auth/signin');
    }
		const data = await request.formData();

    const userId = session.user.email;
		try {
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