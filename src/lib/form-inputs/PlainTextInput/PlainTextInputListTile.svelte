<script lang="ts">
  import { ClickableTile } from "carbon-components-svelte";
  import PlainTextSettingsModal from "./PlainTextSettingsModal.svelte";

  let modalOpen = false;
</script>

<ClickableTile on:click={() => (modalOpen = true)}>
  Plain Text Input
</ClickableTile>
<PlainTextSettingsModal bind:modalOpen />
