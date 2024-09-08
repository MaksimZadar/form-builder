<script lang="ts">
  import { type FormInput } from "$lib/form-components/FormComponentType";
  import { formStore } from "$lib/stores/formStore";

  let formInputs: FormInput[] = [];

  $: formInputs = $formStore.formInputs;
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

    console.log(form);
  });
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
    {#each formInputs as formComponent, index (formComponent)}
      <svelte:component
        this={formComponent.component}
        {...formComponent.settings}
      />
    {/each}
  </div>
</div>
