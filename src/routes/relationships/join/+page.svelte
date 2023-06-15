<script lang="ts">
  import RelationshipInviteAccepter from '$components/RelationshipInviteAccepter.svelte';
import type { PageData } from './$types';
  import { signIn } from '@auth/sveltekit/client'

  export let data: PageData;
</script>

{#if !data.signedIn}
  <button class="sign-in-button" on:click={() => signIn(undefined, { callbackUrl: data.callbackUrl })}>Sign In to Accept</button>
{:else}
  <RelationshipInviteAccepter relationshipInvite={data.relationshipInvite}/>
{/if}

<style>
  .sign-in-button {
    border: 0;
    padding: 1em;
    border-radius: 0.5em;
    font-weight: 700;
    margin-top: 1em;
  }
</style>