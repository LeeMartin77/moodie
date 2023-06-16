<script lang="ts">
  import RelationshipEditor from '$components/RelationshipEditor.svelte';
  import type { RelationshipInvite } from '$lib/storage';
  import type { ActionData, PageData } from './$types';

  export let data: PageData;
	export let form: ActionData & RelationshipInvite ;
</script>

<h1>{data.relationship.name}</h1>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

<RelationshipEditor relationship={data.relationship} />

<style>
  h1 {
    text-align: center;
  }
</style>