<script lang="ts">
  import type { ActionData, PageData } from './$types';

  export let data: PageData;
  export let form: ActionData;
</script>

{#if form?.error}
<div>
  {form.error}
</div>
{/if}

{#each data.userRelationships as relationship}
  <h3>{relationship.name}</h3>
  {#each data.relationshipMoodLogs.filter(x => x.relationshipid === relationship.relationshipid) as moodLog}
    <h4>{moodLog.partnername}</h4>
  {/each}
  <form method="POST" action="?/addlog">
    <input type="hidden" name="relationshipid" value={relationship.relationshipid}/>
    <input name="partnername" required/>
    <input type="number" name="feeling" required/>
    <select name="moodid" required>
      <option value="">None</option>
      {#each data.moods as mood}
        <option value={mood.id}>{mood.name}</option>
      {/each}
    </select>
    <select name="needid" required>
      <option value="">None</option>
      {#each data.needs as need}
        <option value={need.id}>{need.name}</option>
      {/each}
    </select>
    <button type="submit">Submit</button>
  </form>
{/each}