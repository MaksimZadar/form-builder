<script lang="ts">
  import { formStore } from "$lib/stores/formStore";
  import { TextInput } from "carbon-components-svelte";
</script>

<div class="h-full w-96 border-r border-solid border-slate-500 flex flex-col">
  <div
    id="heading"
    class="flex flex-row p-4 border-b border-solid border-slate-500 justify-between w-full items-center"
  >
    <h2 class="text-2xl flex-grow">Form Settings</h2>
    <!-- <Toggle
      class="flex-shrink justify-center align-middle items-center"
      labelA="Light"
      labelB="Dark"
      toggled={$themeStore !== "white"}
      on:toggle={() => themeStore.toggle()}
    /> -->
  </div>
  <div id="settings" class="flex flex-col p-4 w-full">
    <TextInput
      labelText="Form Name"
      value={$formStore.formName}
      on:input={(e) => {
        formStore.updateFormName(e.detail?.toString() ?? "");
      }}
    />
  </div>
</div>
