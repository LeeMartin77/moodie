<script lang="ts">
	import type { RelationshipInvite } from '$lib/storage';
  import type { ActionData, PageData } from './$types';

  export let data: PageData;
	export let form: ActionData & RelationshipInvite ;
</script>

<h1>Your Relationships</h1>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

{#each data.relationships as relationship}
  <h3>{relationship.name}</h3>
  {#if form?.relationshipid && form?.id && form.relationshipid === relationship.relationshipid}
    <a href={`/relationships/join?inviteid=${form.id}`}>Your invite link</a>
  {/if}
  <form method="POST" action="?/invite">
    <input type="hidden" name="invitername" value={relationship.myname}/>
    <input type="hidden" name="relationshipid" value={relationship.relationshipid}/>
    <button type="submit">Generate invite</button>
  </form>
{/each}
{#if data.relationships.length === 0}
  <h3>You currently have no moodie relationships</h3>
{/if}

<h2>Create a new Relationship</h2>
<form method="POST" action="?/create">
  <div>
    <label for="name">Relationship Name</label>
    <input id="name" name="name" required/>
  </div>
  <div>
    <label for="myname">Your Name</label>
    <input id="myname" name="myname" required/>
  </div>
  <button type="submit">Create New</button>
</form>