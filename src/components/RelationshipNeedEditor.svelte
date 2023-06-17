<script lang="ts">
	import type { Need, UserRelationship } from "$lib/storage";
	import RelationshipNeedCreator from "./RelationshipNeedCreator.svelte";

  export let relationship: UserRelationship
  let busy = false;
  const handleNewNeed = (disp: CustomEvent<{ need: Need }>) => {
    relationship.needs = [disp.detail.need, ...relationship.needs]
    relationship = relationship
  }
  const deleteNeed = (need: Need, index: number) => {
    busy = true;
    fetch(`/api/relationships/${relationship.relationshipid}/needs`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(need)
      }).then(res => {
        if (res.status === 200) {
          relationship.needs.splice(index, 1)
          relationship = relationship;
        }
      }).finally(() => {
        busy = false;
      })
  }
</script>
<div class="relationship-container">
  <h3>Needs</h3>
  <RelationshipNeedCreator relationship={relationship} on:newneed={handleNewNeed} />
  <hr />
  <div class="need-list">
  {#each relationship.needs as need, i}
    <div class="need-row">
      <div>{need.name}</div>
      <button type="submit" on:click={() => deleteNeed(need, i)}>Delete</button>
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
.need-list {
  gap: 0.5em;
  display: flex;
  flex-direction: column;
  height: 12em;
  overflow-y: scroll;
}

.need-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.need-row div {
  width: auto;
}

.need-row button {
  padding: 0.5em;
  border-radius: 0.5em;
  font-weight: 700;
  border: none;
}
</style>