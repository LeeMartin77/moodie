import { CASSANDRA_CLIENT } from './config'
import type { Mood, Need, RelationshipInvite, UserRelationship } from './types';
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


export const createUserRelationship = async (
  userid: string, 
  name: string, 
  myname: string, 
  moods: Mood[], 
  needs: Need[], 
  relationshipid: string = randomUUID()): Promise<UserRelationship> => {
  await CASSANDRA_CLIENT.execute(
    `INSERT INTO moodie.user_relationship (
      userid,
      relationshipid,
      name,
      myname,
      moods,
      needs) VALUES (?, ?, ?, ?, ?, ?)`,
    [userid, relationshipid, name, myname, moods, needs],
    { prepare: true }
  );
  return {
    relationshipid,
    userid,
    name,
    myname,
    moods,
    needs
  };
}

export const updateUserRelationship = async (
  userid: string, 
  name: string, 
  myname: string,
  relationshipid: string = randomUUID()): Promise<void> => {
  await CASSANDRA_CLIENT.execute(
    `INSERT INTO moodie.user_relationship (
      userid,
      relationshipid,
      name,
      myname) VALUES (?, ?, ?, ?)`,
    [userid, relationshipid, name, myname],
    { prepare: true }
  );
}

export const removeUserRelationship = async (userid: string, relationshipid: string): Promise<void> => {
  await CASSANDRA_CLIENT.execute(
    'DELETE FROM moodie.user_relationship WHERE userid = ? and relationshipid = ?',
    [userid, relationshipid],
    { prepare: true }
  );
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

export const redeemRelationshipInvite = async (inviteid: string, redeemedbyuserid: string): Promise<void> => {
  await CASSANDRA_CLIENT.execute(
    `UPDATE moodie.relationship_invite 
      SET redeemed = ?,
        redeemedtime = ?,
        redeemedbyuserid = ?
      WHERE id = ?`,
    [true, new Date().toISOString(), redeemedbyuserid, inviteid],
    { prepare: true }
  );
}

export const getRelationshipInvite = async (id: string): Promise<RelationshipInvite | null>  => {
  const result = await CASSANDRA_CLIENT.execute(
    'SELECT * FROM moodie.relationship_invite WHERE id = ?;',
    [id],
    { prepare: true }
  );
  if (result.rows.length < 1) {
    return null;
  }
  return rowToObject<RelationshipInvite>(result.first());
} 

