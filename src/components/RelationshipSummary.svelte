<script lang="ts">
	import type { RelationshipInvite, UserRelationship } from '$lib/storage';
	import type { ActionData } from '../routes/relationships/$types';

	export let relationship: UserRelationship;
	export let form: ActionData & RelationshipInvite;
</script>

<div class="relationship-container">
	<h3>{relationship.name}</h3>
	{#if form?.relationshipid && form?.id && form.relationshipid === relationship.relationshipid}
		<a class="invite-link" href={`/relationships/join?inviteid=${form.id}`}>Your invite link</a>
	{/if}
	<form method="POST" action="?/invite">
		<input type="hidden" name="invitername" value={relationship.myname} />
		<input type="hidden" name="relationshipid" value={relationship.relationshipid} />
		<button type="submit">Generate invite</button>
	</form>
	<hr />
	<a class="edit-link" href={`/relationships/${relationship.relationshipid}`}>Edit</a>
	<hr />
	<button
		on:click={() => {
			// @ts-ignore
			document.getElementById('leaveDialog').showModal();
		}}
	>
		Leave
	</button>
	<dialog id="leaveDialog">
		<h4>Are you sure you want to leave?</h4>
		<p>
			You will need to be reinvited by someone inside '{relationship.name}' if you change your mind.
		</p>
		<button
			class="cancel-button"
			on:click={() => {
				// @ts-ignore
				document.getElementById('leaveDialog').close();
			}}>Cancel</button
		>
		<form method="POST" action="?/leave">
			<input type="hidden" name="relationshipid" value={relationship.relationshipid} />
			<button type="submit">Confirm</button>
		</form>
	</dialog>
</div>

<style>
	.relationship-container {
		position: relative;
		background-color: rgba(0, 0, 0, 0.02);
		padding: 1em;
		border-radius: 1em;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	}
	.relationship-container h3 {
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

	h4 {
		text-align: center;
	}
	button {
		border: 0;
		padding: 1em;
		border-radius: 0.5em;
		font-weight: 700;
		margin-top: 1em;
		width: 100%;
		font-size: 14px;
	}
	.edit-link {
		display: block;
		margin-top: 1em;
		border-radius: 0.5em;
		padding: 1em;
		font-weight: 700;
		background-color: #e9e9ed;
		text-align: center;
		text-decoration: none;
		color: initial;
		font-size: 14px;
	}
	.edit-link:visited {
		color: initial;
	}
	.cancel-button {
		border: 1px solid black;
		background-color: white;
	}
	hr {
		margin-top: 16px;
		margin-bottom: 4px;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
	.invite-link {
		text-align: center;
		display: block;
	}
</style>
