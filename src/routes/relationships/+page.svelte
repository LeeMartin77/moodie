<script lang="ts">
	import RelationshipCreator from '$components/RelationshipCreator.svelte';
  import RelationshipEditor from '$components/RelationshipEditor.svelte';
	import RelationshipSummary from '$components/RelationshipSummary.svelte';
  import type { RelationshipInvite } from '$lib/storage';
  import type { ActionData, PageData } from './$types';

  export let data: PageData;
	export let form: ActionData & RelationshipInvite ;
</script>

<h1>Your Relationships</h1>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}
<div class="relationship-container">
  {#each data.relationships as relationship}
    <RelationshipSummary relationship={relationship} form={form} />
  {/each}
  {#if data.relationships.length === 0}
    <h3>You currently have no moodie relationships</h3>
  {/if}
</div>

<RelationshipCreator />

<style>
.relationship-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>