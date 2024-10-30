<script lang="ts">
  import { ClickableTile } from "carbon-components-svelte";
  import BasicSectionSettingsModal from "./BasicSectionSettingsModal.svelte";

  let modalOpen = false;
</script>

<ClickableTile on:click={() => (modalOpen = true)}>
  Basic Section
</ClickableTile>

<BasicSectionSettingsModal bind:modalOpen />
