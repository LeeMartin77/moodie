<script lang="ts">
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
  <h2>{relationship.name}</h2>
  {#each data.relationshipMoodLogs.filter(x => x.relationshipid === relationship.relationshipid) as moodLog}
    <MoodSummary moodLog={moodLog} isMe={moodLog.userid === data.userId}/>
  {/each}
  <h4>Update your mood for {relationship.name}</h4>
  <form method="POST" action="?/addlog">
    <input type="hidden" name="relationshipid" value={relationship.relationshipid}/>
    <input type="hidden" name="partnername" value={relationship.myname}/>
    <div>
      <label for="feeling">Feeling</label>
      <input id="feeling" type="number" name="feeling" required/>
    </div>
    <div>
      <label for="moodid">Mood</label>
      <select id="moodid" name="moodid" required>
        {#each data.moods as mood}
          <option value={mood.id}>{mood.name}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="needid">Need</label>
      <select id="needid" name="needid" required>
        {#each data.needs as need}
          <option value={need.id}>{need.name}</option>
        {/each}
      </select>
    </div>
    <button type="submit">Submit</button>
  </form>
{/each}