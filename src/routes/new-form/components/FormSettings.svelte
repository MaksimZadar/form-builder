<script lang="ts">
  import MyAccordion from "$lib/custom-components/Accordion/MyAccordion.svelte";
  import MyAccordionItem from "$lib/custom-components/Accordion/MyAccordionItem.svelte";
  import { formStore } from "$lib/stores/formStore";
  import { Button, TextInput } from "carbon-components-svelte";
  import FormInputsList from "./FormInputsList.svelte";
</script>

<div class="h-full w-96 border-r border-solid border-slate-500 flex flex-col">
  <MyAccordion>
    <MyAccordionItem open title="Form Settings">
      <div class="w-full p-2 flex flex-col">
        <TextInput
          labelText="Form Name"
          value={$formStore.formName}
          on:input={(e) => {
            formStore.updateFormName(e.detail?.toString() ?? "");
          }}
        />
        <div class="flex flex-row w-full pt-4">
          <Button kind="primary">Save</Button>
          <Button kind="secondary" href="/preview-form">Preview</Button>
        </div>
      </div>
    </MyAccordionItem>
    <MyAccordionItem title="Form Components" class="h-96">
      <div class="w-full h-full p-2 overflow-hidden overflow-y-auto flex-grow">
        <FormInputsList />
      </div>
    </MyAccordionItem>
  </MyAccordion>
</div>
