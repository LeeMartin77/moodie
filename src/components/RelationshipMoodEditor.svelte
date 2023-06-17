<script lang="ts">
	import type { Mood, UserRelationship } from "$lib/storage";
	import RelationshipMoodCreator from "./RelationshipMoodCreator.svelte";

  export let relationship: UserRelationship

  const handleNewMood = (disp: CustomEvent<{ mood: Mood }>) => {
    relationship.moods = [disp.detail.mood, ...relationship.moods]
    relationship = relationship
  }
</script>
<div class="relationship-container">
  <h3>Moods</h3>
  <RelationshipMoodCreator relationship={relationship} on:newmood={handleNewMood} />
  <hr />
  <div class="mood-list">
    {#each relationship.moods as mood}
    <form method="POST" action="?/deleteMood">
      <input type="hidden" name="relationshipid" value={relationship.relationshipid}/>
      <input type="hidden" name="moodid" value={mood.id}/>
      <div class="mood-row">
        <div>{mood.name}</div>
        <button type="submit">Delete</button>
      </div>
    </form>
    {/each}
  </div>
</div>
<style>  
h3 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
}
hr {
  width: 100%;
  border-color: rgba(0,0,0,0.1);
}
.relationship-container {
  position: relative;
  background-color: rgba(0,0,0,0.02);
  padding: 1em;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  gap: 0.5em;
  display: flex;
  flex-direction: column;
}
.mood-list {
  gap: 0.5em;
  display: flex;
  flex-direction: column;
  height: 12em;
  overflow-y: scroll;
}

.mood-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.mood-row div {
  width: auto;
}

.mood-row button {
  padding: 0.5em;
  border-radius: 0.5em;
  font-weight: 700;
  border: none;
}
</style>