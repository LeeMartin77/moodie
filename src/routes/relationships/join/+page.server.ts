import type { PageServerLoadEvent } from './$types';
import {
  createUserRelationship,
  getRelationshipInvite,
  redeemRelationshipInvite,
} from '$lib/storage';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ url }: PageServerLoadEvent) => {

  // TODO: Don't require login
  const id = url.searchParams.get('inviteid');
  if (!id) {
    throw redirect(302, '/');
  }

  const relationshipInvite = await getRelationshipInvite(id);

  if (!relationshipInvite || relationshipInvite.redeemed) {
    throw redirect(302, '/relationships');
  }

  return {
    relationshipInvite
  };
}

export const actions = {
	accept: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user?.email) {
      throw redirect(302, '/auth/signin');
    }
    const userid = session.user?.email;
		const data = await request.formData();

		try {
      const name = data.get('name') as string;
      if (!name) {
        throw new Error("Name is required")
      }
      const inviteid = data.get('inviteid') as string;
      if (!inviteid) {
        throw new Error("inviteid is required")
      }
      const relationshipInvite = await getRelationshipInvite(inviteid);
      
      if (!relationshipInvite || relationshipInvite.redeemed) {
        throw redirect(302, '/relationships');
      }

      await createUserRelationship(userid, name, relationshipInvite.relationshipid)
      await redeemRelationshipInvite(inviteid, userid);
      throw redirect(302, '/relationships');
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	}
}