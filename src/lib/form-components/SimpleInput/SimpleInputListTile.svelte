<script lang="ts">
  import FormComponentListTile from "$lib/custom-components/FormComponentListTile/FormComponentListTile.svelte";
  import { formStore } from "$lib/stores/formStore";
  import { Checkbox, TextInput } from "carbon-components-svelte";
  import { FormComponentTypesEnum } from "../FormComponentType";
  import SimpleInput from "./SimpleInput.svelte";

  let label = "";
  let placeholder = "";
  let isRequired = false;

  let labelInvalid = false;

  function addComponent(): boolean {
    // if (!label) {
    //   labelInvalid = true;
    //   return false;
    // }

    formStore.addFormComponent({
      type: FormComponentTypesEnum.SIMPLE_INPUT,
      component: SimpleInput,
      props: { label, placeholder, isRequired },
    });

    reset();
    return true;
  }

  function reset() {
    label = "";
    placeholder = "";
    isRequired = false;

    labelInvalid = false;
  }
</script>

<FormComponentListTile
  TileTitle="Plain Text Input"
  {addComponent}
  {reset}
  modalHeading="Plain Text Input Settings"
>
  <div class="w-full flex flex-col gap-2" slot="modal-content">
    <TextInput
      bind:value={label}
      invalidText="Label is required"
      labelText="Label"
      helperText="Label for the field"
      required
    />
    <TextInput
      bind:value={placeholder}
      labelText="Placeholder"
      helperText="Placeholder for the field"
    />
    <Checkbox bind:checked={isRequired} labelText="Is required?" />
  </div>
</FormComponentListTile>
