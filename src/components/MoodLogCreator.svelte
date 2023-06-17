<script lang="ts">
	import type { UserRelationship } from "$lib/storage";
	import MoodFeelingIndicator from "./MoodFeelingIndicator.svelte";

  export let relationship: UserRelationship

  let feeling = 3;
</script>

<div class="submit-container">

  <h4>Update your mood for {relationship.name}</h4>
  <form method="POST" action="?/addlog">
    <input type="hidden" name="relationshipid" value={relationship.relationshipid}/>
    <input type="hidden" name="partnername" value={relationship.myname}/>
    <div class="form-group">
      <div class="feeling-label-with-indicator">
        <label for="feeling" >Feeling</label>
        <MoodFeelingIndicator feeling={feeling} />
      </div>
      <input id="feeling" type="range" bind:value={feeling} name="feeling" min="0" max="5" required/>
    </div>
    <div class="form-group">
      <label for="moodid">Mood</label>
      <select id="moodid" name="moodid" required>
        {#each relationship.moods as mood}
          <option value={mood.id}>{mood.name}</option>
        {/each}
      </select>
    </div>
    <div class="form-group">
      <label for="needid">Need</label>
      <select id="needid" name="needid" required>
        {#each relationship.needs as need}
          <option value={need.id}>{need.name}</option>
        {/each}
      </select>
    </div>
    <button type="submit">Submit</button>
  </form>
</div>

<style>
  .submit-container {
    position: relative;
    background-color: rgba(0,0,0,0.02);
    padding: 1em;
    border-radius: 1em;
  }

  .feeling-label-with-indicator {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
  }
  .submit-container h4 {
    margin: 0.25em 0 0.5em 0;
    padding-bottom: 0.5em;
    padding-left: 0.5em;
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

  .form-group select {
    border: 0;
    padding: 0.5em;
    font-size: 1em;
    font-weight: 700;
  }

  .form-group input {
    border: 0;
    padding: 0.5em;
  }

  button {
    border: 0;
    padding: 1em;
    border-radius: 0.5em;
    font-weight: 700;
    margin-top: 1em;
  }
</style>