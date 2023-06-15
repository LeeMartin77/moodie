<script lang="ts">
	import type { RelationshipInvite, UserRelationship } from "$lib/storage";
	import type { ActionData } from "../routes/relationships/$types";

  export let relationship: UserRelationship
  export let form: ActionData & RelationshipInvite ;
</script>
<div class="relationship-container">
  <h3>{relationship.name}</h3>
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
  <hr />
  {#if form?.relationshipid && form?.id && form.relationshipid === relationship.relationshipid}
    <a class="invite-link" href={`/relationships/join?inviteid=${form.id}`}>Your invite link</a>
  {/if}
  <form method="POST" action="?/invite">
    <input type="hidden" name="invitername" value={relationship.myname}/>
    <input type="hidden" name="relationshipid" value={relationship.relationshipid}/>
    <button type="submit">Generate invite</button>
  </form>
  <hr />
  <form method="POST" action="?/leave">
    <input type="hidden" name="relationshipid" value={relationship.relationshipid}/>
    <button type="submit">Leave</button>
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
.relationship-container h3 {
  margin: 0.25em 0 0.5em 0;
  padding-bottom: 0.5em;
  padding-left: 0.5em;
  text-align: center;
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
hr {
  margin-top: 16px;
  margin-bottom: 4px;
  border: 1px solid rgba(0,0,0,0.1);
}
.invite-link {
  text-align: center;
  display: block;
}
</style>