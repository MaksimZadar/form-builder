<script lang="ts">
  import { ChevronDown, ChevronUp } from "carbon-icons-svelte";

  export let open = false;
  export let title: string = "";
  let external_class = "";
  export { external_class as class };

  function toggleOpen() {
    open = !open;
  }

  $: classes = open
    ? "h-full p-2 border-b border-solid border-slate-400"
    : "h-0 p-0";
</script>

<div class={`w-full flex flex-col ${external_class}`}>
  <button
    id="header"
    class="w-full flex justify-between align-middle items-center p-4 border-b border-solid border-slate-400"
    on:click={toggleOpen}
  >
    <h3>{title}</h3>
    {#if open}
      <ChevronUp size={16} />
    {:else}
      <ChevronDown size={16} />
    {/if}
  </button>
  <div id="content" class={`w-full overflow-hidden transition ${classes}`}>
    <slot />
  </div>
</div>
