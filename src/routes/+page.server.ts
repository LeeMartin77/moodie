import type { PageServerLoadEvent } from './$types';
import {
  getAllMoods,
  getUserRelationships,
  getLatestRelationshipMoodLogs
} from '$lib/storage';

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
  const userRelationships = await getUserRelationships(userId);
  const relationshipMoodLogs = await getLatestRelationshipMoodLogs(userRelationships.map(x => x.relationshipid))

  return {
    moods,
    userRelationships,
    relationshipMoodLogs
  };
}