<script lang="ts">
	import type { Need, UserRelationship } from "$lib/storage";
	import RelationshipNeedCreator from "./RelationshipNeedCreator.svelte";

  export let relationship: UserRelationship

  const handleNewNeed = (disp: CustomEvent<{ need: Need }>) => {
    relationship.needs = [disp.detail.need, ...relationship.needs]
    relationship = relationship
  }
</script>
<div class="relationship-container">
  <h3>Needs</h3>
  <RelationshipNeedCreator relationship={relationship} on:newneed={handleNewNeed} />
  {#each relationship.needs as need}
    
  <form method="POST" action="?/deleteNeed">
    <input type="hidden" name="relationshipid" value={relationship.relationshipid}/>
    <input type="hidden" name="needid" value={need.id}/>
    <div class="need-row">
      <div>{need.name}</div>
      <button type="submit">Delete</button>
    </div>
  </form>
  {/each}
</div>
<style>  
h3 {
  text-align: center;
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