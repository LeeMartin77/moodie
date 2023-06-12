import { CASSANDRA_CLIENT } from './config'
import type { RelationshipInvite, UserRelationship } from './types';
import { rowToObject } from './utility'
import { randomUUID } from 'node:crypto';

export const getUserRelationships = async (userid: string) => {
    const result = await CASSANDRA_CLIENT.execute(
      'SELECT * FROM moodie.user_relationship WHERE userid = ?;',
      [userid],
      { prepare: true }
    );

    const mapped = result.rows.map(rowToObject);
    return mapped as UserRelationship[];
}


export const createUserRelationship = async (userid: string, name: string, relationshipid: string = randomUUID()): Promise<UserRelationship> => {
  await CASSANDRA_CLIENT.execute(
    'INSERT INTO moodie.user_relationship (userid, relationshipid, name) VALUES (?, ?, ?)',
    [userid, relationshipid, name],
    { prepare: true }
  );
  return {
    relationshipid,
    userid,
    name
  };
}


export const createRelationshipInvite = async (inviterid: string, relationshipid: string, invitername: string): Promise<RelationshipInvite> => {
  const id = randomUUID();
  await CASSANDRA_CLIENT.execute(
    'INSERT INTO moodie.relationship_invite (id, inviterid, relationshipid, invitername, redeemed) VALUES (?, ?, ?, ?, ?)',
    [id, inviterid, relationshipid, invitername, false],
    { prepare: true }
  );
  return {
    id,
    relationshipid,
    inviterid,
    invitername,
    redeemed: false,
    redeemedtime: null,
    redeemedbyuserid: null
  };
}