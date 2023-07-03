<script lang="ts">
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

{#if data.session}
	<div class="navigation">
		<a href="/">Moods</a>
		<a href="/relationships">Relationships</a>
	</div>
{/if}
<div class="content-container">
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.content-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.navigation {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 2em;
	}
	.navigation a {
		text-decoration: none;
		color: inherit;
		padding: 0.5em 1em;
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 0.5em;
	}
	.navigation a:visited {
		color: inherit;
	}
</style>
