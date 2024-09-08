<script lang="ts">
  import FormComponentListTile from "$lib/custom-components/FormComponentListTile/FormComponentListTile.svelte";
  import { formStore } from "$lib/stores/formStore";
  import { Checkbox, TextInput } from "carbon-components-svelte";
  import { FormComponentTypesEnum } from "../FormComponentType";
  import EmailInput from "./EmailInput.svelte";

  let label = "";
  let placeholder = "";
  let isRequired = false;

  let labelInvalid = false;

  function addComponent(): boolean {
    if (!label) {
      labelInvalid = true;
      return false;
    }

    formStore.addFormComponent({
      type: FormComponentTypesEnum.EMAIL_INPUT,
      component: EmailInput,
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
  TileTitle="Email Field"
  {addComponent}
  {reset}
  modalHeading="Email Field Input Settings"
>
  <form class="w-full flex flex-col gap-2" slot="modal-content">
    <TextInput
      bind:value={label}
      bind:invalid={labelInvalid}
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
  </form>
</FormComponentListTile>
