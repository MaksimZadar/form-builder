<script lang="ts">
  import {
    FormComponentTypesEnum,
    type FormComponent,
  } from "$lib/form-components/FormComponentType";
  import SimpleInput from "$lib/form-components/SimpleInput/SimpleInput.svelte";
  import { formStore } from "$lib/stores/formStore";
  import { Button } from "carbon-components-svelte";
  import { Add, Draggable, TrashCan } from "carbon-icons-svelte";
  import { flip } from "svelte/animate";
  import DropSection from "./DropSection.svelte";

  let formComponents: FormComponent[] = [];

  $: formComponents = $formStore.formComponents;

  let isDragging = false;
  let dragIndex: number | null = null;

  function removeComponent(index: number) {
    formStore.removeFormComponent(index);
  }

  function addComponent() {
    formStore.addFormComponent({
      type: FormComponentTypesEnum.SIMPLE_INPUT,
      component: SimpleInput,
      props: { label: "Email", placeholder: "Enter your email" },
    });
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
  <h1 class="text-4xl">{$formStore.formName}</h1>
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
    <Button
      iconDescription="Add component"
      icon={Add}
      kind="tertiary"
      class="transition-all"
      on:click={() => addComponent()}
    />
  </div>
</div>
