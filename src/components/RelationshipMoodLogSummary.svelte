<script lang="ts">
	import MoodLogCreator from '$components/MoodLogCreator.svelte';
	import MoodSummary from '$components/MoodSummary.svelte';
	import RelationshipTitle from '$components/RelationshipTitle.svelte';
	import type { RelationshipMoodLog, UserRelationship } from '$lib/storage';

	export let userId: string;
	export let relationship: UserRelationship;
	export let notificationsEnabled: boolean;
	export let relationshipMoodLogs: RelationshipMoodLog[];

	let personalUpdate: RelationshipMoodLog | undefined = undefined;

	const handleNewLog = ({ detail: { log } }: CustomEvent<{ log: RelationshipMoodLog }>) => {
		personalUpdate = log;
	};
</script>

<div class="relationship-container">
	<RelationshipTitle {relationship} {notificationsEnabled} />
	{#each relationshipMoodLogs.filter((x) => x.relationshipid === relationship.relationshipid) as moodLog}
		{#if personalUpdate && moodLog.userid === userId}
			<MoodSummary moodLog={personalUpdate || moodLog} isMe={moodLog.userid === userId} />
		{:else}
			<MoodSummary {moodLog} isMe={moodLog.userid === userId} />
		{/if}
	{/each}
	<MoodLogCreator on:newlog={handleNewLog} {relationship} />
</div>

<style>
	h1 {
		text-align: center;
	}
	.relationship-container {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
