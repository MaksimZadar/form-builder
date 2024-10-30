<script lang="ts">
  import { ClickableTile } from "carbon-components-svelte";
  import EmailSettingsModal from "./EmailSettingsModal.svelte";

  let modalOpen = false;
</script>

<ClickableTile on:click={() => (modalOpen = true)}>
  Email Field
</ClickableTile>

<EmailSettingsModal bind:modalOpen />
