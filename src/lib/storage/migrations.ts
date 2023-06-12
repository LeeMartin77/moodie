import { CASSANDRA_CLIENT } from './config';

const MIGRATIONS = [
  `CREATE KEYSPACE IF NOT EXISTS moodie WITH REPLICATION = {'class':'SimpleStrategy','replication_factor':1};`,
  `CREATE TABLE IF NOT EXISTS moodie.mood (
    id text PRIMARY KEY,
    name text,
    positive boolean,
    negative boolean
  )`
]

const MOOD_SEED_VALUES = [
  ['flirty', 'Flirty', true, false],
  ['sad', 'Sad', false, true],
  ['passive', 'Passive', false, false],
]

const SEEDS: [string, any[]][] = [
  ['INSERT INTO moodie.mood (id, name, positive, negative)', MOOD_SEED_VALUES]
]

export const runMigrations = async () => {
  for (const migration of MIGRATIONS) {
    await CASSANDRA_CLIENT.execute(migration);
  }
  for (const [seedCommand, seedEntries] of SEEDS) {
    for (const seedEntry of seedEntries)
    await CASSANDRA_CLIENT.execute(
      `${seedCommand} values (${seedEntry.map(_ => "?").join(",")});`,
        seedEntry,
      { prepare: true }
    );
  }
}