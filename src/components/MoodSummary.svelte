<script lang="ts">
	import type { RelationshipMoodLog } from "$lib/storage";
	import { formatRelative } from "date-fns";

  export let moodLog: RelationshipMoodLog
  export let isMe: boolean
</script>

<div class="log-container">
  <h3>{moodLog.partnername} {#if isMe}(me){/if}</h3>
  <h5>{formatRelative(moodLog.time, new Date())}</h5>
  <dl>
    <div>
      <dt>Feeling</dt>
      <dd>{moodLog.feeling}</dd>
    </div>
    <div>
      <dt>Mood</dt>
      <dd>{moodLog.mood}</dd>
    </div>
    <div>
      <dt>Need</dt>
      <dd>{moodLog.need}</dd>
    </div>
  </dl>
</div>

<style>
  .log-container {
    position: relative;
    background-color: #EFEFEF;
    padding: 1em;
    border-radius: 1em;
  }
  .log-container h3 {
    margin: 0.25em 0 0.5em 0;
    padding-bottom: 0.5em;
    padding-left: 0.5em;
    border-bottom: 1px solid lightgray;
  }
  .log-container h5 {
    position: absolute;
    top: 0;
    right: 2em;
  }
  dl {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  dt {
    font-weight: 300;

  }
  dd {
    font-weight: 700;
    margin-left: 0;
  }
  dt, dd {
    text-align: center;
  }
</style>