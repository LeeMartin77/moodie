<script lang="ts">
  import type { PageData } from './$types';
  import { signIn } from '@auth/sveltekit/client'

  export let data: PageData;
</script>

{#if !data.signedIn}
<button on:click={() => signIn(undefined, { callbackUrl: data.callbackUrl })}>Sign In to Accept</button>
{:else}
<form method="POST" action="?/accept">
  <input type="hidden" name="inviteid" value={data.relationshipInvite.id}/>
  <div>
    <label for="name">Relationship Name</label>
    <input id="name" name="name" value={`Relationship with ${data.relationshipInvite.invitername}`} required/>
  </div>
  <div>
    <label for="myname">Your Name</label>
    <input id="myname" name="myname" value={'My Name'} required/>
  </div>
  <button type="submit">Accept</button>
</form>
{/if}