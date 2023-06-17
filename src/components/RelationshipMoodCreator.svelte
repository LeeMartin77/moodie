<script lang="ts">
	import type { Mood, UserRelationship } from "$lib/storage";
  import { createEventDispatcher } from 'svelte';
  
  export let relationship: UserRelationship

  export let buttonText: string = 'Create'
  export let buttonStyling: string = ''

	const dispatch = createEventDispatcher();

  let name: string | undefined;
  let sentiment: string | undefined;
  let error: string | undefined;

  function sendNewMood(mood: Mood) {
		dispatch('newmood', {
			mood
		});
	}
</script>

<button style={buttonStyling}
  type="button"
  on:click={() => {
  name = undefined;
  sentiment = undefined;
  error = undefined;
  // @ts-ignore
  document.getElementById("createMoodDialog").showModal()
}}>
  {buttonText}
</button>
<dialog id="createMoodDialog">
  <form on:submit|preventDefault={() => {
      error = undefined;
      fetch(`/api/relationships/${relationship.relationshipid}/moods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: name?.toLowerCase().replaceAll(' ', ''),
          name: name,
          positive: sentiment === 'positive',
          negative: sentiment === 'negative'
        })
      }).then(res => res.json())
        .then(mood => {
          // @ts-ignore
          document.getElementById("createMoodDialog").close()
          sendNewMood(mood)
        }).catch(err => {
          error = err;
        })
  }}>
    <div class="form-group">
      <label for="name">Name</label>
      <input id="name" name="name" bind:value={name} required/>
    </div>
    <div class="form-group">
      <div>
        <input type="radio" bind:group={sentiment} id="positive" name="sentiment" value="positive"
               checked>
        <label for="positive">positive</label>
      </div>
  
      <div>
        <input type="radio" bind:group={sentiment} id="neutral" name="sentiment" value="neutral">
        <label for="neutral">neutral</label>
      </div>
  
      <div>
        <input type="radio" bind:group={sentiment} id="negative" name="sentiment" value="negative">
        <label for="negative">negative</label>
      </div>
    </div>
    
    <button type="submit">Create</button>
  </form>
  <button 
  type="button"
  class="cancel-button" on:click={() => {
    // @ts-ignore
    document.getElementById("createMoodDialog").close()
  }}>Cancel</button>
</dialog>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group input {
    border: 0;
    padding: 0.5em;
    border: 1px solid lightgray;
  }
  
  button {
    border: 0;
    padding: 1em;
    border-radius: 0.5em;
    font-weight: 700;
  }
  .cancel-button {
    border: 1px solid black;
    background-color: white;
  }
</style>