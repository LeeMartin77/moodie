<script>

	import { RELATIONSHIP_TYPE_KEY_NAMES } from "$lib/constants";

</script>
<h2>Create a new Relationship</h2>
<div class="creator-container">
  <form method="POST" action="?/create">
    <div class="form-group">
      <label for="name">Relationship Name</label>
      <input id="name" name="name" required/>
    </div>
    <div class="form-group">
      <label for="myname">Your Name</label>
      <input id="myname" name="myname" required/>
    </div>
    <div class="form-group">
      <label for="relationshiptype">Initial Moods/Needs</label>
      <select id="relationshiptype" name="relationshiptype" value="" required>
        {#each Object.entries(RELATIONSHIP_TYPE_KEY_NAMES) as [key, name]}
          <option value={key}>{name}</option>
        {/each}
      </select>
    </div>
    <button type="submit">Create New</button>
  </form>
</div>
<style>  
  .creator-container {
    position: relative;
    background-color: rgba(0,0,0,0.01);
    padding: 1em;
    border-radius: 1em;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  h2 {
    margin: 2em 0 0.5em 0;
    padding-bottom: 0.5em;
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
  
  .form-group input {
    border: 0;
    padding: 0.5em;
    border: 1px solid lightgray;
  }
  
  .form-group select {
    border: 0;
    padding: 0.5em;
    font-size: 1em;
    font-weight: 700;
  }

  button {
    border: 0;
    padding: 1em;
    border-radius: 0.5em;
    font-weight: 700;
    margin-top: 1em;
  }
  </style>