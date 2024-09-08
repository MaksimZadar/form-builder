<script>
  import { SectionSelectionList } from "$lib/form-components/FormComponentType";
</script>

<div class="w-full h-full overflow-hidden overflow-y-auto">
  {#each SectionSelectionList as input}
    <svelte:component this={input} />
  {/each}
</div>
