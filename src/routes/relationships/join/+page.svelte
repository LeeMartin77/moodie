<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<form method="POST" action="?/accept">
  <input type="hidden" name="inviteid" value={data.relationshipInvite.id}/>
  <input name="name" value={`Relationship with ${data.relationshipInvite.invitername}`}/>
  <button type="submit">Accept</button>
</form>