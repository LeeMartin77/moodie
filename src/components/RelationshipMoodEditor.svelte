<script lang="ts">
	import type { Mood, UserRelationship } from "$lib/storage";
	import RelationshipMoodCreator from "./RelationshipMoodCreator.svelte";

  export let relationship: UserRelationship

  let busy = false;
  const handleNewMood = ({ detail: { mood }}: CustomEvent<{ mood: Mood }>) => {
    relationship.moods = [mood, ...relationship.moods.filter(x => x.id !== mood.id)]
    relationship = relationship
  }
  const deleteMood = (mood: Mood, index: number) => {
    busy = true;
    fetch(`/api/relationships/${relationship.relationshipid}/moods`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mood)
      }).then(res => {
        if (res.status === 200) {
          relationship.moods.splice(index, 1)
          relationship = relationship;
        }
      }).finally(() => {
        busy = false;
      })
  }
</script>
<div class="relationship-container">
  <h3>Moods</h3>
  <RelationshipMoodCreator relationship={relationship} on:newmood={handleNewMood} />
  <hr />
  <div class="mood-list">
    {#each relationship.moods as mood, i}
    <div class="mood-row">
      <div>{mood.name}</div>
      <button type="submit" disabled={busy} on:click={() => deleteMood(mood, i)}>Delete</button>
    </div>
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
.mood-row button:disabled {
  background-color: rgba(0,0,0,0.1);
  color: rgba(0,0,0,0.2);
}
</style>