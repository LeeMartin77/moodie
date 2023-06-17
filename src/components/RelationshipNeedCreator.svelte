<script lang="ts">
	import type { Need, UserRelationship } from "$lib/storage";
  import { createEventDispatcher } from 'svelte';
  
  export let relationship: UserRelationship

  export let buttonText: string = 'Create'
  export let buttonStyling: string = ''

	const dispatch = createEventDispatcher();

  let name: string | undefined;
  let mode: string | undefined;
  let error: string | undefined;

  function sendNewNeed(need: Need) {
		dispatch('newneed', {
			need
		});
	}


</script>

<button 
type="button"
style={buttonStyling}
  on:click={() => {
  name = undefined;
  mode = undefined;
  error = undefined;
  // @ts-ignore
  document.getElementById("createneedDialog").showModal()
}}>
  {buttonText}
</button>
<dialog id="createneedDialog">
  <form on:submit|preventDefault={() => {
      error = undefined;
      fetch(`/api/relationships/${relationship.relationshipid}/needs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: name?.toLowerCase().replaceAll(' ', ''),
          name: name,
          active: mode === 'active',
          passive: mode === 'passive'
        })
      }).then(res => res.json())
        .then(need => {
          // @ts-ignore
          document.getElementById("createneedDialog").close()
          sendNewNeed(need)
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
        <input type="radio" bind:group={mode} id="active" name="mode" value="active"
               checked>
        <label for="active">Active</label>
      </div>
  
      <div>
        <input type="radio" bind:group={mode} id="passive" name="mode" value="passive">
        <label for="passive">Passive</label>
      </div>

    </div>
    
    <button type="submit">Create</button>
  </form>
  <button 
  type="button" class="cancel-button" on:click={() => {
    // @ts-ignore
    document.getElementById("createneedDialog").close()
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
    width: 100%;
    margin-top: 1em;
  }
</style>