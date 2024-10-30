<script lang="ts">
  import { slide } from "svelte/transition";

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
  transition:slide={{ duration: 400, axis: "y" }}
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
  class="w-full p-2 bg-slate-300 transition-all mb-2 text-center"
>
  <span>Add to section</span>
</div>
