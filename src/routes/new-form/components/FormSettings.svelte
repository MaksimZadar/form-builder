<script lang="ts">
  import MyAccordion from "$lib/custom-components/Accordion/MyAccordion.svelte";
  import MyAccordionItem from "$lib/custom-components/Accordion/MyAccordionItem.svelte";
  import { formStore } from "$lib/stores/formStore";
  import { Button, FileUploader, TextInput } from "carbon-components-svelte";
  import FormInputsList from "./FormInputsList.svelte";
  import FormSectionsList from "./FormSectionsList.svelte";

  let files: File[] = $formStore.logo ? [$formStore.logo] : [];
</script>

<div class="h-full w-96 border-r border-solid border-slate-500 flex flex-col">
  <MyAccordion>
    <MyAccordionItem open title="Form Settings">
      <div class="w-full p-2 flex flex-col gap-4">
        <TextInput
          labelText="Form Name"
          value={$formStore.formName}
          on:input={(e) => {
            formStore.updateFormName(e.detail?.toString() ?? "");
          }}
        />
        <FileUploader
          labelTitle="Upload Logo"
          buttonLabel="Add logo"
          labelDescription="Supported formats: .jpg, .jpeg, .png"
          accept={[".jpg", ".jpeg", ".png"]}
          status="edit"
          on:remove={() => formStore.updateLogo(null)}
          bind:files
          on:add={() => formStore.updateLogo(files[0])}
        />
        <div class="flex flex-row w-full">
          <Button kind="primary">Save</Button>
          <Button kind="secondary" href="/preview-form">Preview</Button>
        </div>
      </div>
    </MyAccordionItem>
    <MyAccordionItem title="Form Inputs" class="max-h-96">
      <div class="w-full h-full p-2 overflow-hidden overflow-y-auto flex-grow">
        <FormInputsList />
      </div>
    </MyAccordionItem>
    <MyAccordionItem title="Form Sections" class="max-h-96">
      <div class="w-full h-full p-2 overflow-hidden overflow-y-auto flex-grow">
        <FormSectionsList />
      </div>
    </MyAccordionItem>
  </MyAccordion>
</div>
