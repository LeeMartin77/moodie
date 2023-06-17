import { addUserRelationshipMood, deleteUserRelationshipMood, getUserRelationship } from '$lib/storage';
import type { Mood } from '$lib/storage/types.js';
import { userIdGenerator } from '$lib/userIdGenerator';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request, locals, params: {relationshipid} }) => {

  const session = await locals.getSession();
  if (!session || !session.user) {
    throw error(401, 'Not signed in');
  }
  const data = await request.json();
  const userId = userIdGenerator(session.user);

  try {
    const relationship = await getUserRelationship(userId, relationshipid);
    if (!relationship) {
      throw new Error("unknown relationship id")
    }
    const moodFields: (keyof Mood)[] = ['id', 'name', 'positive', 'negative'];
    const missingFields = moodFields.reduce<string[]>((acc, cur) => {
      if (data[cur] === undefined || data[cur] === null) {
        acc.push(cur)
      }
      return acc;
    }, [])
    if (missingFields.length > 0) {
      throw new Error(`Missing properties: {${missingFields.join(', ')}}`)
    }
    await addUserRelationshipMood(userId, relationshipid, data);
    return json(data, { status: 200 });
  } catch (err: any) {
    throw error(422, err.message);
  }

};

export const DELETE = async ({ request, locals, params: {relationshipid} }) => {

  const session = await locals.getSession();
  if (!session || !session.user) {
    throw error(401, 'Not signed in');
  }
  const data = await request.json();
  const userId = userIdGenerator(session.user);

  try {
    const relationship = await getUserRelationship(userId, relationshipid);
    if (!relationship) {
      throw new Error("unknown relationship id")
    }
    const mood = relationship.moods.find(x => x.id === data.id)
    if (!mood) {
      // noop
      return json({}, {status: 200});
    }
    await deleteUserRelationshipMood(userId, relationshipid, data);
    return json({}, {status: 200});
  } catch (err: any) {
    throw error(422, err.message);
  }

};