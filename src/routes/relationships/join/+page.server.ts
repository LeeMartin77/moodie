import type { PageServerLoadEvent } from './$types';
import {
  createUserRelationship,
  getAllDefaultMoods,
  getAllDefaultNeeds,
  getRelationshipInvite,
  redeemRelationshipInvite,
} from '$lib/storage';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { userIdGenerator } from '$lib/userIdGenerator';

export const load = async ({ url, parent }: PageServerLoadEvent) => {

  const { session } = await parent();
  const id = url.searchParams.get('inviteid');
  if (!id) {
    throw redirect(302, '/relationships');
  }

  const relationshipInvite = await getRelationshipInvite(id);

  if (!relationshipInvite || relationshipInvite.redeemed) {
    throw redirect(302, '/relationships');
  }

  return {
    relationshipInvite,
    signedIn: !!session?.user?.email,
    callbackUrl: `${url.pathname}?inviteid=${id}`
  };
}

export const actions = {
	accept: async ({ request, locals }) => {
    const session = await locals.getSession();
    if (!session || !session.user) {
      throw redirect(302, '/auth/signin');
    }
    const userid = userIdGenerator(session.user);
		const data = await request.formData();

		try {
      const name = data.get('name') as string;
      if (!name) {
        throw new Error("Name is required")
      }
      const myname = data.get('myname') as string;
      if (!name) {
        throw new Error("myname is required")
      }
      const inviteid = data.get('inviteid') as string;
      if (!inviteid) {
        throw new Error("inviteid is required")
      }
      const relationshipInvite = await getRelationshipInvite(inviteid);
      
      if (!relationshipInvite || relationshipInvite.redeemed) {
        throw redirect(302, '/relationships');
      }

      const [defaultNeeds, defaultMoods] = await Promise.all([getAllDefaultNeeds(),getAllDefaultMoods()])

      await createUserRelationship(userid, name, myname, defaultMoods, defaultNeeds, relationshipInvite.relationshipid)
      await redeemRelationshipInvite(inviteid, userid);
      throw redirect(302, '/relationships');
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	}
} satisfies Actions;