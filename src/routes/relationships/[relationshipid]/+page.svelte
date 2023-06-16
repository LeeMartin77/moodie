<script lang="ts">
  import RelationshipEditor from '$components/RelationshipEditor.svelte';
	import RelationshipMoodEditor from '$components/RelationshipMoodEditor.svelte';
	import RelationshipNeedEditor from '$components/RelationshipNeedEditor.svelte';
  import type { RelationshipInvite } from '$lib/storage';
  import type { ActionData, PageData } from './$types';

  export let data: PageData;
	export let form: ActionData & RelationshipInvite ;
</script>

<h1>{data.relationship.name}</h1>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

<div class="editors-container">
  <RelationshipEditor relationship={data.relationship} />
  <RelationshipMoodEditor relationship={data.relationship} />
  <RelationshipNeedEditor relationship={data.relationship} />
</div>
<style>
  h1 {
    text-align: center;
  }
  .editors-container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
</style>