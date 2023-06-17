import { addUserRelationshipNeed, getUserRelationship } from '$lib/storage';
import type { Need } from '$lib/storage/types.js';
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
    const needFields: (keyof Need)[] = ['id', 'name', 'active', 'passive'];
    const missingFields = needFields.reduce<string[]>((acc, cur) => {
      if (data[cur] === undefined || data[cur] === null) {
        acc.push(cur)
      }
      return acc;
    }, [])
    if (missingFields.length > 0) {
      throw new Error(`Missing properties: {${missingFields.join(', ')}}`)
    }
    await addUserRelationshipNeed(userId, relationshipid, data);
    return json(data, { status: 200 });
  } catch (err: any) {
    throw error(422, err.message);
  }

};