<script>
  import { InputSelectionList } from "$lib/form-components/FormComponentType";
</script>

<div class="w-full h-full overflow-hidden overflow-y-auto">
  {#each InputSelectionList as input}
    <svelte:component this={input} />
  {/each}
</div>
