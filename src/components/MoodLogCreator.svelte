<script lang="ts">
	import type { Mood, Need, UserRelationship } from "$lib/storage";

  export let relationship: UserRelationship
  export let moods: Mood[]
  export let needs: Need[]
</script>

<div class="submit-container">

  <h4>Update your mood for {relationship.name}</h4>
  <form method="POST" action="?/addlog">
    <input type="hidden" name="relationshipid" value={relationship.relationshipid}/>
    <input type="hidden" name="partnername" value={relationship.myname}/>
    <div class="form-group">
      <label for="feeling">Feeling</label>
      <input id="feeling" type="range" name="feeling" min="0" max="5"  value="3" required/>
    </div>
    <div class="form-group">
      <label for="moodid">Mood</label>
      <select id="moodid" name="moodid" required>
        {#each moods as mood}
          <option value={mood.id}>{mood.name}</option>
        {/each}
      </select>
    </div>
    <div class="form-group">
      <label for="needid">Need</label>
      <select id="needid" name="needid" required>
        {#each needs as need}
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