<script lang="ts">
	import type { UserRelationship } from "$lib/storage";

  export let relationship: UserRelationship
</script>
<div class="relationship-container">
  <form method="POST" action="?/update">
    <input type="hidden" name="relationshipid" value={relationship.relationshipid}/>
    <div class="form-group">
      <label for="name">Relationship Name</label>
      <input id="name" name="name" value={relationship.name} required/>
    </div>
    <div class="form-group">
      <label for="myname">Your Name</label>
      <input id="myname" name="myname" value={relationship.myname} required/>
    </div>
    <button type="submit">Update</button>
  </form>
</div>
<style>  
.relationship-container {
  position: relative;
  background-color: rgba(0,0,0,0.02);
  padding: 1em;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group input {
  border: 0;
  padding: 0.5em;
  border: 1px solid lightgray;
}

button {
  border: 0;
  padding: 1em;
  border-radius: 0.5em;
  font-weight: 700;
  margin-top: 1em;
}
</style>