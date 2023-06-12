export type Mood = {
  id: string,
  name: string,
  positive: boolean,
  negative: boolean
}

export type Relationship = {
  id: string
}

export type RelationshipInvite = {
  id: string,
  relationshipid: string,
  invitername: string,
  redeemed: boolean | undefined,
  redeemedtime: string, // ISO 8601 timestamp
  redeemedbyuserid: string
}

export type UserRelationship = {
  userid: string,
  relationshipid: string
}

export type RelationshipMoodLog = {
  relationshipid: string,
  userid: string,
  partnername: string,
  mood: string,
  positive: boolean,
  negative: boolean,
  time: string, // ISO 8601 timestamp
}