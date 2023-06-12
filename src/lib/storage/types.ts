export type Mood = {
  id: string,
  name: string,
  positive: boolean,
  negative: boolean
}

export type Need = {
  id: string,
  name: string,
  active: boolean,
  passive: boolean
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
  relationshipid: string,
  name: string
}

export type RelationshipMoodLog = {
  relationshipid: string,
  userid: string,
  partnername: string,
  feeling: number,
  moodid: string,
  mood: string,
  positive: boolean,
  negative: boolean,
  needid: string,
  need: string,
  active: boolean,
  passive: boolean,
  time: string, // ISO 8601 timestamp
}