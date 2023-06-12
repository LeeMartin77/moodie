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