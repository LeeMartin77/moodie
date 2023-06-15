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
  inviterid: string,
  invitername: string,
  redeemed: boolean,
  redeemedtime: Date | null,
  redeemedbyuserid: string | null
}

export type UserRelationship = {
  userid: string,
  relationshipid: string,
  name: string,
  myname: string,
  moods: Mood[],
  needs: Need[],
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
  time: Date,
}