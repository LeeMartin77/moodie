<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>Your Relationships</h1>

{#each data.relationships as relationship}
  {relationship.name}
  <!--TODO: Invite to relationship-->
{/each}

<form method="POST" action="?/create">
  <input name="name" required/>
  <button type="submit">Create New</button>
</form>