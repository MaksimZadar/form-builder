<script lang="ts">
  import {
      FormComponentType,
      type FormComponent,
  } from '$lib/form-components/FormComponentType';
  import { formStore } from '$lib/stores/formStore';
  import {
      Button,
      Checkbox,
      Modal,
      TextInput,
  } from 'carbon-components-svelte';
  import { createEventDispatcher } from 'svelte';

  export let formComponent: FormComponent | undefined = undefined;
  export let isEditing: boolean = false;
  export let label: string = '';
  export let placeholder: string = '';
  export let isOptional: boolean = false;
  export let modalOpen = false;
  export let modalHeading: string = 'Plain Text Input Settings';
  export let reset: () => void = () => {
      label = '';
      placeholder = '';
      isOptional = false;
  };

  const dispatch = createEventDispatcher();

  let addComponent = () => {
      formStore.addFormComponent({
          id: crypto.randomUUID(),
          type: FormComponentType.SIMPLE_INPUT,
          settings: { label, placeholder, isOptional },
      });
      reset();
      modalOpen = false;

      dispatch('componentAdded');
  };

  let editComponent = () => {
      if (!formComponent) {
          return;
      }
      
      formStore.updateFormComponent(formComponent.id, { label, placeholder, isOptional });

      console.log($formStore);

      modalOpen = false;

      dispatch('componentEdited');
  };
</script>

<form
  on:submit|preventDefault={() =>
      isEditing ? editComponent() : addComponent()}
>
  <Modal bind:open={modalOpen} {modalHeading} size="xs" on:close passiveModal>
      <div class="w-full flex flex-col gap-2">
          <TextInput
              bind:value={label}
              labelText="Label"
              helperText="Label for the field"
              required
          />
          <TextInput
              bind:value={placeholder}
              labelText="Placeholder"
              helperText="Placeholder for the field"
          />
          <Checkbox bind:checked={isOptional} labelText="Is optional?" />
      </div>
      {#if isEditing}
          <Button type="submit" kind="primary">Update</Button>
      {:else}
          <Button type="submit" kind="primary">Add</Button>
      {/if}
      <Button kind="secondary" on:click={() => (modalOpen = false)}>
          Cancel
      </Button>
  </Modal>
</form>