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