<script lang="ts">
  import MoodLogCreator from '$components/MoodLogCreator.svelte';
  import MoodSummary from '$components/MoodSummary.svelte';
	import RelationshipTitle from '$components/RelationshipTitle.svelte';
  import type { ActionData, PageData } from './$types';

  export let data: PageData;
  export let form: ActionData;
</script>

{#if form?.error}
<div>
  {form.error}
</div>
{/if}
<h1>Your Relationship Moods</h1>
{#each data.userRelationships as relationship}
  <div class="relationship-container">
    <RelationshipTitle relationship={relationship}/>
    {#each data.relationshipMoodLogs.filter(x => x.relationshipid === relationship.relationshipid) as moodLog}
      <MoodSummary moodLog={moodLog} isMe={moodLog.userid === data.userId}/>
    {/each}
    <MoodLogCreator relationship={relationship} />
  </div>
{/each}

<style>
  h1 {
    text-align: center;
  }
  .relationship-container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .relationship-container h2 {
    margin: 0;
    margin-bottom: -0.5em;
    text-align: center;
  }
</style>