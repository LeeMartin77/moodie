<script lang="ts">
	import { each } from 'svelte/internal';

	export let feeling: number;

	const maxValue = 5;
	const chunks = Array.apply(null, Array(maxValue)).map(function (x, i) {
		return i;
	});
</script>

<div class="indicator">
	{#each chunks as chunk}
		{#if feeling > chunk}
			<div class="filled chunk" />
		{:else}
			<div class="chunk" />
		{/if}
	{/each}
</div>

<style>
	.indicator {
		display: flex;
		flex-direction: row;
		gap: 0.2em;
	}
	.chunk {
		display: block;
		width: 1em;
		height: 1em;
		border-radius: 0.2em;
		background-color: rgba(0, 0, 0, 0.2);
	}
	.filled {
		background-color: rgba(0, 0, 0, 0.8);
	}
</style>
