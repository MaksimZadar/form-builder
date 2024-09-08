<script>
  import { ComponentSelectionList } from "$lib/form-components/FormComponentType";
</script>

<div class="w-full h-full overflow-hidden overflow-y-auto">
  {#each ComponentSelectionList as component}
    <svelte:component this={component} />
  {/each}
</div>
