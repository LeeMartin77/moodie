import { CASSANDRA_CLIENT } from './config'
import type { Mood, Need } from './types';
import { rowToObject } from './utility'

export const getAllMoods = async () => {
    const result = await CASSANDRA_CLIENT.execute('SELECT * FROM moodie.mood;');

    const mapped = result.rows.map(rowToObject);
    return mapped as Mood[];
}

export const getAllNeeds = async () => {
    const result = await CASSANDRA_CLIENT.execute('SELECT * FROM moodie.need;');

    const mapped = result.rows.map(rowToObject);
    return mapped as Need[];
}