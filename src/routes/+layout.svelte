<script lang="ts">
</script>
<div>
  <a href="/">Home</a>
  <a href="/relationships">Relationships</a>
</div>
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
</style>