import type { PageServerLoadEvent } from './$types';
import {
  getUserRelationships,
  createUserRelationship
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
      await createUserRelationship(session.user?.email, name)
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	}
};