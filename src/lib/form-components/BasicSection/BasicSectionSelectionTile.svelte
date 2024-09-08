<script lang="ts">
  import FormComponentListTile from "$lib/custom-components/FormComponentListTile/FormComponentListTile.svelte";
  import { formStore } from "$lib/stores/formStore";
  import { TextInput } from "carbon-components-svelte";
  import { FormComponentType } from "../FormComponentType";

  let sectionTitle = "";

  function addComponent(): boolean {
    formStore.addFormComponent({
      id: crypto.randomUUID(),
      index: $formStore.formComponents.length,
      settings: { sectionTitle },
      type: FormComponentType.BASIC_SECTION,
    });

    reset();
    return true;
  }

  function reset() {
    sectionTitle = "";
  }
</script>

<FormComponentListTile
  TileTitle="Basic Section"
  {addComponent}
  {reset}
  modalHeading="Email Field Input Settings"
>
  <div class="w-full flex flex-col gap-2" slot="modal-content">
    <TextInput
      bind:value={sectionTitle}
      labelText="Title"
      helperText="Title for the section"
      required
    />
  </div>
</FormComponentListTile>
