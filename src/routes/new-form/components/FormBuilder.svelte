<script lang="ts">
  import { type FormComponent } from "$lib/form-components/FormComponentType";
  import { formStore } from "$lib/stores/formStore";
  import { Button } from "carbon-components-svelte";
  import { Draggable, TrashCan } from "carbon-icons-svelte";
  import { flip } from "svelte/animate";
  import DropSection from "./DropSection.svelte";

  let formComponents: FormComponent[] = [];

  $: formComponents = $formStore.formComponents;

  let isDragging = false;
  let dragIndex: number | null = null;
  let formLogo: string | null = null;

  formStore.subscribe((form) => {
    if (form.logo) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(form.logo);
      fileReader.onload = (fileReaderEvent) => {
        if (fileReaderEvent.target && fileReaderEvent.target.result) {
          var res = fileReaderEvent.target.result;
          formLogo = res.toString();
        }
      };
    }
  });

  function removeComponent(index: number) {
    formStore.removeFormComponent(index);
  }

  function dragStart(itemIndex: number) {
    isDragging = true;
    dragIndex = itemIndex;
  }

  function drop(
    event: DragEvent & { currentTarget: EventTarget & HTMLDivElement },
    index: number
  ) {
    event.preventDefault();

    if (dragIndex !== null) {
      formStore.moveFormComponent(dragIndex, index);
    }

    isDragging = false;
    dragIndex = null;
  }
</script>

<div class="w-full flex flex-col h-full">
  <div class="w-full flex items-center justify-between">
    <h1 class="text-4xl flex-grow">{$formStore.formName}</h1>
    {#if $formStore.logo}
      <img
        alt="logo"
        class="flex-shrink overflow-hidden max-h-14"
        src={formLogo}
      />
    {/if}
  </div>
  <div
    class="flex flex-col justify-start items-center h-full overflow-hidden overflow-y-auto mt-4 p-4 gap-2 bg-slate-200"
  >
    {#each formComponents as formComponent, index (formComponent)}
      <div animate:flip={{ duration: 400 }} class="w-full">
        {#if isDragging && dragIndex !== null && dragIndex > index}
          <DropSection {index} drop={(event) => drop(event, index)} />
        {/if}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="w-full flex flex-row align-middle items-end border border-black"
          class:my-2={isDragging}
          draggable="true"
          aria-grabbed="false"
          on:dragstart={() => dragStart(index)}
          on:dragend={() => (isDragging = false)}
        >
          <Button
            iconDescription="Drag"
            size="field"
            tooltipPosition="right"
            icon={Draggable}
            kind="secondary"
            class="cursor-grab"
          />
          <svelte:component
            this={formComponent.component}
            {...formComponent.props}
          />
          <Button
            iconDescription="Remove component"
            size="field"
            tooltipPosition="left"
            icon={TrashCan}
            kind="danger"
            on:click={() => removeComponent(index)}
          />
        </div>
        {#if isDragging && dragIndex !== null && dragIndex < index}
          <DropSection {index} drop={(event) => drop(event, index)} />
        {/if}
      </div>
    {/each}
  </div>
</div>
