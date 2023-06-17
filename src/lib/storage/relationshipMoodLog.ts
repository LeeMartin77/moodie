import { CASSANDRA_CLIENT } from './config'
import type { RelationshipMoodLog } from './types';
import { rowToObject } from './utility'

export const getLatestRelationshipMoodLogs = async (relationshipids: string[]): Promise<RelationshipMoodLog[]> => {
  const relationshipResults = await CASSANDRA_CLIENT.execute(
    'SELECT * FROM moodie.relationship_mood_log WHERE relationshipid IN ?;',
    [relationshipids],
    { prepare: true }
  );

  return relationshipResults.rows.map(rowToObject) as RelationshipMoodLog[];
};

export const insertRelationshipMoodLog = async ({ 
  relationshipid,
  userid,
  partnername,
  feeling,
  moodid,
  mood,
  positive,
  negative,
  needid,
  need,
  active,
  passive
 }: Omit<RelationshipMoodLog, "time">): Promise<void> => {

  await archiveCurrentMoodLog(relationshipid, userid);

  await CASSANDRA_CLIENT.execute(
    `INSERT INTO moodie.relationship_mood_log (
      relationshipid,
      userid,
      partnername,
      feeling,
      moodid,
      mood,
      positive,
      negative,
      needid,
      need,
      active,
      passive,
      time
    )
    VALUES (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    )`,
    [
      relationshipid,
      userid,
      partnername,
      feeling,
      moodid,
      mood,
      positive,
      negative,
      needid,
      need,
      active,
      passive,
      new Date().toISOString()
    ],
    { prepare: true }
  );
};

export async function deleteCurrentMoodLog(relationshipid: string, userid: string) {
  await archiveCurrentMoodLog(relationshipid, userid);
  await CASSANDRA_CLIENT.execute(
    'DELETE FROM moodie.relationship_mood_log WHERE relationshipid = ? and userid = ?;',
    [relationshipid, userid],
    { prepare: true }
  );
}

async function archiveCurrentMoodLog(relationshipid: string, userid: string) {
  const existingRes = await CASSANDRA_CLIENT.execute(
    'SELECT * FROM moodie.relationship_mood_log WHERE relationshipid = ? and userid = ?;',
    [relationshipid, userid],
    { prepare: true }
  );

  const existing = existingRes.first();

  if (existing) {
    const old = rowToObject<RelationshipMoodLog>(existing);
    await CASSANDRA_CLIENT.execute(
      `INSERT INTO moodie.relationship_mood_log_history (
        relationshipid,
        userid,
        time,
        partnername,
        feeling,
        moodid,
        mood,
        positive,
        negative,
        needid,
        need,
        active,
        passive
      )
      VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )`,
      [
        old.relationshipid,
        old.userid,
        old.time,
        old.partnername,
        old.feeling,
        old.moodid,
        old.mood,
        old.positive,
        old.negative,
        old.needid,
        old.need,
        old.active,
        old.passive,
      ],
      { prepare: true }
    );
  }
}
