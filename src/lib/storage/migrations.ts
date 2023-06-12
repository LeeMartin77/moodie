import { CASSANDRA_CLIENT } from './config';

const MIGRATIONS = [
  `CREATE KEYSPACE IF NOT EXISTS moodie WITH REPLICATION = {'class':'SimpleStrategy','replication_factor':1};`,
  `CREATE TABLE IF NOT EXISTS moodie.mood (
    id text PRIMARY KEY,
    name text,
    positive boolean,
    negative boolean
  )`,
  `CREATE TABLE IF NOT EXISTS moodie.need (
    id text PRIMARY KEY,
    name text,
    active boolean,
    passive boolean
  )`,
  `CREATE TABLE IF NOT EXISTS moodie.relationship_invite (
    id text PRIMARY KEY,
    relationshipid text,
    inviterid text,
    invitername text,
    redeemed boolean,
    redeemedtime timestamp,
    redeemedbyuserid text
  )`,
  `CREATE TABLE IF NOT EXISTS moodie.user_relationship (
    userid text,
    relationshipid text,
    name text,
    PRIMARY KEY ((userid), relationshipid)
  )`,
  `CREATE TABLE IF NOT EXISTS moodie.relationship_mood_log (
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
  )`,
  `CREATE TABLE IF NOT EXISTS moodie.relationship_mood_log_history (
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
  )`,
  `CREATE INDEX IF NOT EXISTS ON moodie.relationship_mood_log (time);`,
]

const MOOD_SEED_VALUES = [
  ['flirty', 'Flirty', true, false],
  ['sad', 'Sad', false, true],
  ['passive', 'Passive', false, false],
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      `${seedCommand} values (${seedEntry.map(_ => "?").join(",")});`,
        seedEntry,
      { prepare: true }
    );
  }
}