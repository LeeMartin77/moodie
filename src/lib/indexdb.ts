import Dexie from "dexie";

class MoodieAppDatabase extends Dexie {
  
  notifications!: Dexie.Table<INotification, string>;

  constructor () {
      super("MoodieBrowserDatabase");
      this.version(1).stores({
        notifications: '++relationshipid, enabled',
      });
  }
}

interface INotification {
  relationshipid: string,
  enabled: boolean,
}


export const db = new MoodieAppDatabase();
