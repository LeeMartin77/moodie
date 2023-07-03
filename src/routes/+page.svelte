<script lang="ts">
	import RelationshipMoodLogSummary from '$components/RelationshipMoodLogSummary.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.userRelationships as relationship}
	<RelationshipMoodLogSummary
		userId={data.userId}
		relationshipMoodLogs={data.relationshipMoodLogs}
		{relationship}
		notificationsEnabled={data.notificationsEnabled}
	/>
{/each}
