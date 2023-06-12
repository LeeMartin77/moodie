import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession();
  if ((!session || !session.user?.email)
      && !event.url.pathname.startsWith('/auth')
      && !event.url.pathname.startsWith('/relationships/join')) {
    throw redirect(302, '/auth/signin');
  }
  return {
    session,
  };
};
