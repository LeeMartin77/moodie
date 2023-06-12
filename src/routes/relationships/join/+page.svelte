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
  <input name="name" value={`Relationship with ${data.relationshipInvite.invitername}`}/>
  <button type="submit">Accept</button>
</form>
{/if}