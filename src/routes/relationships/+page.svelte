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
  {relationship.name}
  {#if form?.relationshipid && form.relationshipid === relationship.relationshipid}
    <a href={`/relationships/join?inviteid=${form.id}`}>Your invite link</a>
  {/if}
  <form method="POST" action="?/invite">
    <input name="invitername" required/>
    <input type="hidden" name="relationshipid" value={relationship.relationshipid}/>
    <button type="submit">Invite</button>
  </form>
{/each}

<form method="POST" action="?/create">
  <input name="name" required/>
  <button type="submit">Create New</button>
</form>