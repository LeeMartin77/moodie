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
  ['00009', `ALTER TABLE moodie.user_relationship ADD (myname text)`],
  ['00010', `CREATE TABLE IF NOT EXISTS moodie.default_mood (
    relationshiptype text,
    id text,
    name text,
    positive boolean,
    negative boolean,
    PRIMARY KEY ((relationshiptype), id)
  )`],
  ['00011', `CREATE TABLE IF NOT EXISTS moodie.default_need (
    relationshiptype text,
    id text,
    name text,
    active boolean,
    passive boolean,
    PRIMARY KEY ((relationshiptype), id)
  )`],
  ['00012', `CREATE TYPE IF NOT EXISTS moodie.mood (
    id text,
    name text,
    active boolean,
    passive boolean
  )`],
  ['00013', `CREATE TYPE IF NOT EXISTS moodie.need (
    id text,
    name text,
    active boolean,
    passive boolean
  )`],
  ['00014', `ALTER TABLE moodie.user_relationship ADD (
      moods set<frozen<moodie.mood>>,
      needs set<frozen<moodie.need>>
  )`],
]

const ROMANTIC_MOOD_SEED_VALUES = [
  ['romantic', 'content', 'Content', true, false],
  ['romantic', 'excited', 'Excited', true, false],
  ['romantic', 'passionate', 'Passionate', true, false],
  ['romantic', 'affectionate', 'Affectionate', true, false],
  ['romantic', 'flirty', 'Flirty', true, false],
  ['romantic', 'happy', 'Happy', true, false],
  ['romantic', 'connected', 'Connected', true, false],
  ['romantic', 'fulfilled', 'Fulfilled', true, false],
  ['romantic', 'calm', 'Calm', true, false],
  ['romantic', 'quiet', 'Quiet', false, false],
  ['romantic', 'focused', 'Focused', false, false],
  ['romantic', 'sad', 'Sad', false, true],
  ['romantic', 'frustrated', 'Frustrated', false, true],
  ['romantic', 'disappointed', 'Disappointed', false, true],
  ['romantic', 'jealous', 'Jealous', false, true],
  ['romantic', 'insecure', 'Insecure', false, true],
  ['romantic', 'confused', 'Confused', false, true],
  ['romantic', 'resentful', 'Resentful', false, true],
  ['romantic', 'hurt', 'Hurt', false, true],
  ['romantic', 'lonely', 'Lonely', false, true],
  ['romantic', 'unfulfilled', 'Unfulfilled', false, true],
];

const FRIENDLY_MOOD_SEED_VALUES = [
  ['friendly', 'content', 'Content', true, false],
  ['friendly', 'excited', 'Excited', true, false],
  ['friendly', 'happy', 'Happy', true, false],
  ['friendly', 'connected', 'Connected', true, false],
  ['friendly', 'fulfilled', 'Fulfilled', true, false],
  ['friendly', 'calm', 'Calm', true, false],
  ['friendly', 'quiet', 'Quiet', false, false],
  ['friendly', 'focused', 'Focused', false, false],
  ['friendly', 'sad', 'Sad', false, true],
  ['friendly', 'frustrated', 'Frustrated', false, true],
  ['friendly', 'disappointed', 'Disappointed', false, true],
  ['friendly', 'confused', 'Confused', false, true],
  ['friendly', 'lonely', 'Lonely', false, true],
];

const BLANK_MOOD_SEED_VALUES = [
  ['blank', 'positive', 'Positive', true, false],
  ['blank', 'neutral', 'Neutral', false, false],
  ['blank', 'negative', 'Negative', false, true],
]
// type id name positive negative
const MOOD_SEED_VALUES = [
  ...ROMANTIC_MOOD_SEED_VALUES,
  ...FRIENDLY_MOOD_SEED_VALUES,
  ...BLANK_MOOD_SEED_VALUES
]

const ROMANTIC_NEED_SEED_VALUES = [
  ['romantic', 'emotional_support', 'Emotional Support', true, false],
  ['romantic', 'talking_time', 'Talking Time', true, false],
  ['romantic', 'physical_touch', 'Physical Touch', true, false],
  ['romantic', 'sex_and_desire', 'Sex', true, false],
  ['romantic', 'do_something_together', 'Do Something Together', true, false],
  ['romantic', 'decisions_made', 'Decisions Made For Me', true, false],
  ['romantic', 'affection', 'Affection', true, false],
  ['romantic', 'attention', 'Attention', true, false],
  ['romantic', 'encouragement', 'Encouragement', true, false],
  ['romantic', 'nothing', 'Nothing', false, true],
  ['romantic', 'stability', 'Stability', false, true],
  ['romantic', 'time_alone', 'Time Alone', false, true],
  ['romantic', 'quiet_time_together', 'Quiet Time Together', false, true],
  ['romantic', 'empathy', 'Empathy', false, true],
  ['romantic', 'comfort', 'Comfort', false, true],
  ['romantic', 'solace', 'Solace', false, true],
  ['romantic', 'routine', 'Routine', false, true],
  ['romantic', 'appreciation', 'Appreciation', false, true],
]


const FRIENDLY_NEED_SEED_VALUES = [
  ['friendly', 'emotional_support', 'Emotional Support', true, false],
  ['friendly', 'talking_time', 'Talking Time', true, false],
  ['friendly', 'do_something_together', 'Do Something Together', true, false],
  ['friendly', 'encouragement', 'Encouragement', true, false],
  ['friendly', 'nothing', 'Nothing', false, true],
  ['friendly', 'stability', 'Stability', false, true],
  ['friendly', 'quiet_time_together', 'Quiet Time Together', false, true],
  ['friendly', 'comfort', 'Comfort', false, true],
  ['friendly', 'solace', 'Solace', false, true],
]

const BLANK_NEED_SEED_VALUES = [
  ['blank', 'nothing', 'Nothing', false, true],
]

// type id name active passive
const NEED_SEED_VALUES = [
  ...ROMANTIC_NEED_SEED_VALUES,
  ...FRIENDLY_NEED_SEED_VALUES,
  ...BLANK_NEED_SEED_VALUES
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SEEDS: [string, any[]][] = [
  ['INSERT INTO moodie.default_mood (relationshiptype, id, name, positive, negative)', MOOD_SEED_VALUES],
  ['INSERT INTO moodie.default_need (relationshiptype, id, name, active, passive)', NEED_SEED_VALUES]
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