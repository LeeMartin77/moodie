<script lang="ts">
  import MoodLogCreator from '$components/MoodLogCreator.svelte';
import MoodSummary from '$components/MoodSummary.svelte';
import type { ActionData, PageData } from './$types';
  import { formatRelative } from 'date-fns'

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
    <h2>{relationship.name}</h2>
    {#each data.relationshipMoodLogs.filter(x => x.relationshipid === relationship.relationshipid) as moodLog}
      <MoodSummary moodLog={moodLog} isMe={moodLog.userid === data.userId}/>
    {/each}
    <MoodLogCreator relationship={relationship} moods={data.moods} needs={data.needs}/>
  </div>
{/each}

<style>
  .relationship-container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .relationship-container h2 {
    margin: 0;
    margin-bottom: -0.5em;
  }
</style>