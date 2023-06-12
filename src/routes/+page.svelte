<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#each data.moods as mood}
  {mood.name}
{/each}