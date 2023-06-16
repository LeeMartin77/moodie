import type { PageServerLoadEvent } from './$types';
import {
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
	}
} satisfies Actions;