import type { PageServerLoadEvent } from './$types';
import {
  getUserRelationships,
  getLatestRelationshipMoodLogs
} from '$lib/storage';
import { error, redirect } from '@sveltejs/kit';
import { env } from "$env/dynamic/private";

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

  const notificationsEnabled: boolean = env.MOODIE_NOTIFICATIONS_FEATURE === "true";
  return {
    userId,
    userRelationships,
    relationshipMoodLogs,
    notificationsEnabled
  };
}
