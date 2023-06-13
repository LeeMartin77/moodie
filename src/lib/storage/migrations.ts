import { CASSANDRA_CLIENT } from './config';

const MIGRATIONS = [
  ['00002', `CREATE TABLE IF NOT EXISTS moodie.mood (
    id text PRIMARY KEY,
    name text,
    positive boolean,
    negative boolean
  )`],
  ['00003', `CREATE TABLE IF NOT EXISTS moodie.need (
    id text PRIMARY KEY,
    name text,
    active boolean,
    passive boolean
  )`],
  ['00004', `CREATE TABLE IF NOT EXISTS moodie.relationship_invite (
    id text PRIMARY KEY,
    relationshipid text,
    inviterid text,
    invitername text,
    redeemed boolean,
    redeemedtime timestamp,
    redeemedbyuserid text
  )`],
  ['00005', `CREATE TABLE IF NOT EXISTS moodie.user_relationship (
    userid text,
    relationshipid text,
    name text,
    PRIMARY KEY ((userid), relationshipid)
  )`],
  ['00006', `CREATE TABLE IF NOT EXISTS moodie.relationship_mood_log (
    relationshipid text,
    userid text,
    partnername text,
    feeling int,
    moodid text,
    mood text,
    positive boolean,
    negative boolean,
    needid text,
    need text,
    active boolean,
    passive boolean,
    time timestamp,
    PRIMARY KEY ((relationshipid), userid)
  )`],
  ['00007', `CREATE TABLE IF NOT EXISTS moodie.relationship_mood_log_history (
    relationshipid text,
    userid text,
    time timestamp,
    partnername text,
    feeling int,
    moodid text,
    mood text,
    positive boolean,
    negative boolean,
    needid text,
    need text,
    active boolean,
    passive boolean,
    PRIMARY KEY ((relationshipid), userid, time)
  )`],
  ['00008', `CREATE INDEX IF NOT EXISTS ON moodie.relationship_mood_log (time);`],
  ['00009', `ALTER TABLE moodie.user_relationship ADD (myname text)`]
]

const MOOD_SEED_VALUES = [
  ['flirty', 'Flirty', true, false],
  ['sad', 'Sad', false, true],
  ['passive', 'Passive', false, false],
]

const NEED_SEED_VALUES = [
  ['attention', 'Attention', true, false],
  ['solitude', 'Time to Myself', false, true]
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SEEDS: [string, any[]][] = [
  ['INSERT INTO moodie.mood (id, name, positive, negative)', MOOD_SEED_VALUES],
  ['INSERT INTO moodie.need (id, name, active, passive)', NEED_SEED_VALUES]
]

export const runMigrations = async () => {
  await CASSANDRA_CLIENT.execute(`CREATE KEYSPACE IF NOT EXISTS moodie WITH REPLICATION = {'class':'SimpleStrategy','replication_factor':1};`)
  await CASSANDRA_CLIENT.execute(`CREATE TABLE IF NOT EXISTS moodie.migrations (key text PRIMARY KEY)`)
  for (const [key, migration] of MIGRATIONS) {
    const res = await CASSANDRA_CLIENT.execute(`SELECT key FROM moodie.migrations WHERE key = ?`, [key], { prepare: true });
    if (res.rows.length === 0) {
      console.log("Running migration: ", key);
      await CASSANDRA_CLIENT.execute(migration);
      await CASSANDRA_CLIENT.execute(`INSERT INTO moodie.migrations (key) VALUES (?)`, [key], { prepare: true })
    }
  }
  for (const [seedCommand, seedEntries] of SEEDS) {
    for (const seedEntry of seedEntries)
    await CASSANDRA_CLIENT.execute(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      `${seedCommand} values (${seedEntry.map(_ => "?").join(",")});`,
        seedEntry,
      { prepare: true }
    );
  }
}