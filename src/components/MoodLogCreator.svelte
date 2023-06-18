<script lang="ts">
	import type { Mood, Need, UserRelationship } from "$lib/storage";
	import MoodFeelingIndicator from "./MoodFeelingIndicator.svelte";
	import RelationshipMoodCreator from "./RelationshipMoodCreator.svelte";
	import RelationshipNeedCreator from "./RelationshipNeedCreator.svelte";

  export let relationship: UserRelationship

  let feeling = 3;

  let logMood = '';
  let logNeed = '';

  const handleNewMood = ({ detail: { mood }}: CustomEvent<{ mood: Mood }>) => {
    relationship.moods = [mood, ...relationship.moods.filter(x => x.id !== mood.id)]
    relationship = relationship
    logMood = mood.id
  }

  const handleNewNeed = ({ detail: { need }}: CustomEvent<{ need: Need }>) => {    
    relationship.needs = [need, ...relationship.needs.filter(x => x.id !== need.id)]
    relationship = relationship
    logNeed = need.id
  }

  const moodLogButtonStyles = `
            border: 1px solid black;
            background-color: transparent;
            border-radius: 1em;
            width: 2.5em;
            height: 2.5em;
            padding: 0.5em;`
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
      <div class="dropdown-with-creator">
        <select id="moodid" bind:value={logMood} name="moodid" required>
          {#each relationship.moods as mood}
            <option value={mood.id}>{mood.name}</option>
          {/each}
        </select>
        <RelationshipMoodCreator relationship={relationship} 
          on:newmood={handleNewMood}
          buttonText={'+'}
          buttonStyling={moodLogButtonStyles}
            />
      </div>
    </div>
    <div class="form-group">
      <label for="needid">Need</label>
      <div class="dropdown-with-creator">
        <select id="needid" bind:value={logNeed} name="needid" required>
          {#each relationship.needs as need}
            <option value={need.id}>{need.name}</option>
          {/each}
        </select>
        <RelationshipNeedCreator relationship={relationship} 
          on:newneed={handleNewNeed}
          buttonText={'+'}
          buttonStyling={moodLogButtonStyles}
            />
      </div>
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
  
  .dropdown-with-creator {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    align-items: center;
    justify-content: space-between;
  }

  .dropdown-with-creator select {
    flex-grow: 1;
  }
</style>