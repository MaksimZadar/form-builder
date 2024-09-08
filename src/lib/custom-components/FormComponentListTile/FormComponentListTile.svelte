<script lang="ts">
  import { Button, ClickableTile, Modal } from "carbon-components-svelte";

  export let TileTitle = "";
  export let modalHeading: string;

  export let addComponent: () => boolean;
  export let reset: () => void = () => {};

  let modalOpen = false;

  let addComponentInternal = () => {
    if (addComponent()) {
      modalOpen = false;
    }
  };
</script>

<ClickableTile on:click={() => (modalOpen = true)}>
  {TileTitle}
</ClickableTile>
<form on:submit|preventDefault={addComponentInternal}>
  <Modal
    bind:open={modalOpen}
    {modalHeading}
    size="xs"
    on:open={reset}
    on:close
    passiveModal
  >
    <slot name="modal-content" />
    <Button type="submit" kind="primary">Add</Button>
    <Button kind="secondary" on:click={() => (modalOpen = false)}>
      Cancel
    </Button>
  </Modal>
</form>
