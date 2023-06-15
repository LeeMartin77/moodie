import { CASSANDRA_CLIENT } from './config'
import type { Mood, Need } from './types';
import { rowToObject } from './utility'

export const getAllDefaultMoods = async (relationshiptype = "romantic") => {
    const result = await CASSANDRA_CLIENT.execute(
        'SELECT id, name, positive, negative FROM moodie.default_mood WHERE relationshiptype = ?;',
        [relationshiptype],
        { prepare: true }
        );

    const mapped = result.rows.map(rowToObject);
    return mapped as Mood[];
}

export const getAllDefaultNeeds = async (relationshiptype = "romantic") => {
    const result = await CASSANDRA_CLIENT.execute(
        'SELECT id, name, active, passive FROM moodie.default_need WHERE relationshiptype = ?;',
        [relationshiptype],
        { prepare: true }
        );

    const mapped = result.rows.map(rowToObject);
    return mapped as Need[];
}