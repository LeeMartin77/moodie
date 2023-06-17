import { addUserRelationshipNeed, deleteUserRelationshipNeed, getUserRelationship } from '$lib/storage';
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
    const need = relationship.needs.find(x => x.id === data.id)
    if (need) {
      // delete existing first
      await deleteUserRelationshipNeed(userId, relationshipid, need)
    }
    await addUserRelationshipNeed(userId, relationshipid, data);
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
    const need = relationship.needs.find(x => x.id === data.id)
    if (!need) {
      // noop
      return json({}, {status: 200});
    }
    await deleteUserRelationshipNeed(userId, relationshipid, need);
    return json({}, {status: 200});
  } catch (err: any) {
    throw error(422, err.message);
  }

};