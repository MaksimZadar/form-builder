<script lang="ts">
  import {
      FormComponentType,
      type FormComponent,
  } from '$lib/form-components/FormComponentType';
  import { formStore } from '$lib/stores/formStore';
  import {
      Button,
      Modal,
      TextInput
  } from 'carbon-components-svelte';
  import { createEventDispatcher } from 'svelte';

  export let formComponent: FormComponent | undefined = undefined;
  export let isEditing: boolean = false;
  export let sectionTitle: string = '';
  export let modalOpen = false;
  export let modalHeading: string = 'Section Settings';
  export let reset: () => void = () => {
      sectionTitle = '';
  };

  const dispatch = createEventDispatcher();

  let addComponent = () => {
      formStore.addFormComponent({
          id: crypto.randomUUID(),
          type: FormComponentType.BASIC_SECTION,
          settings: { sectionTitle },
          inputs: [],
      });
      reset();
      modalOpen = false;

      dispatch('componentAdded');
  };

  let editComponent = () => {
      if (!formComponent) {
          console.log("formComponent is undefined");
          return;
      }

      console.log(sectionTitle);
      
      formStore.updateFormComponent(formComponent.id, { sectionTitle });

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
              bind:value={sectionTitle}
              labelText="Title"
              helperText="Title for the section"
              required
          />
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