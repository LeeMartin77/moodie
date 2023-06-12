import { CASSANDRA_CLIENT } from './config'
import { rowToObject } from './utility'
export type Mood = {
  id: string,
  name: string,
  positive: boolean,
  negative: boolean
}

export const getAllMoods = async () => {
    const result = await CASSANDRA_CLIENT.execute('SELECT * FROM moodie.mood;');

    const mapped = result.rows.map(rowToObject);
    return mapped as Mood[];
}