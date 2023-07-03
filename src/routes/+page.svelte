<script lang="ts">
	import MoodLogCreator from '$components/MoodLogCreator.svelte';
	import MoodSummary from '$components/MoodSummary.svelte';
	import RelationshipTitle from '$components/RelationshipTitle.svelte';
	import type { RelationshipMoodLog } from '$lib/storage';
	import type { PageData } from './$types';

	export let data: PageData;

	let personalUpdates: RelationshipMoodLog[] = [];
	let localRelationshipUpdates: Set<string> = new Set<string>();

	const handleNewLog = ({ detail: { log } }: CustomEvent<{ log: RelationshipMoodLog }>) => {
		let updates = personalUpdates.filter((x) => x.relationshipid !== log.relationshipid);
		updates.push(log);
		localRelationshipUpdates.add(log.relationshipid);
		personalUpdates = updates;
		localRelationshipUpdates = localRelationshipUpdates;
	};
</script>

{#each data.userRelationships as relationship}
	<div class="relationship-container">
		<RelationshipTitle {relationship} notificationsEnabled={data.notificationsEnabled} />
		{#each data.relationshipMoodLogs.filter((x) => x.relationshipid === relationship.relationshipid) as moodLog}
			{#if localRelationshipUpdates.has(relationship.relationshipid) && moodLog.userid === data.userId}
				<MoodSummary
					moodLog={personalUpdates.find((x) => x.relationshipid === relationship.relationshipid) ||
						moodLog}
					isMe={moodLog.userid === data.userId}
				/>
			{:else}
				<MoodSummary {moodLog} isMe={moodLog.userid === data.userId} />
			{/if}
		{/each}
		<MoodLogCreator on:newlog={handleNewLog} {relationship} />
	</div>
{/each}

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
