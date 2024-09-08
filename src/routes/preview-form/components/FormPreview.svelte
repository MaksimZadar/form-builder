<script lang="ts">
  import { type FormComponent } from "$lib/form-components/FormComponentType";
  import { formStore } from "$lib/stores/formStore";
  import { flip } from "svelte/animate";

  let formComponents: FormComponent[] = [];

  $: formComponents = $formStore.formComponents;
</script>

<div class="w-full flex flex-col h-full">
  <h1 class="text-4xl">{$formStore.formName}</h1>
  {$formStore.formComponents.length}
  <div
    class="flex flex-col justify-start items-center h-full overflow-hidden overflow-y-auto mt-4 p-4 gap-2 bg-slate-200"
  >
    {#each formComponents as formComponent, index (formComponent)}
      <div animate:flip={{ duration: 400 }} class="w-full">
        <svelte:component
          this={formComponent.component}
          {...formComponent.props}
        />
      </div>
    {/each}
  </div>
</div>
