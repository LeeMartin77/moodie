<script lang="ts">
	import type { RelationshipInvite } from "$lib/storage";

  export let relationshipInvite: RelationshipInvite
</script>

<h2>Join a Relationship</h2>
<div class="join-container">
  <form method="POST" action="?/accept">
    <input type="hidden" name="inviteid" value={relationshipInvite.id}/>
    <div class="form-group">
      <label for="name">Relationship Name</label>
      <input id="name" name="name" value={`Relationship with ${relationshipInvite.invitername}`} required/>
    </div>
    <div class="form-group">
      <label for="myname">Your Name</label>
      <input id="myname" name="myname" value={'My Name'} required/>
    </div>
    <button type="submit">Accept</button>
  </form>
</div>
<style>  
  .join-container {
    position: relative;
    background-color: rgba(0,0,0,0.01);
    padding: 1em;
    border-radius: 1em;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  h2 {
    margin: 2em 0 0.5em 0;
    padding-bottom: 0.5em;
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
  </style>