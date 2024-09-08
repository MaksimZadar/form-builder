<script lang="ts">
  export let index: number;
  export let drop: (
    event: DragEvent & { currentTarget: EventTarget & HTMLDivElement },
    index: number
  ) => void;

  let hoveredOver = false;
  let hoveredClasses = "";
  $: hoveredClasses = hoveredClasses && "";
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:dragenter={(event) => {
    event.preventDefault();
    hoveredOver = true;
  }}
  on:dragover={(event) => {
    event.preventDefault();
    hoveredOver = true;
  }}
  on:dragleave={() => (hoveredOver = false)}
  on:drop={(event) => drop(event, index)}
  class="w-full h-1 bg-slate-500 transition-all"
  class:h-5={hoveredOver}
></div>
