<script lang="ts">
  import FormSectionBuilderView from '$lib/custom-components/FormInputBuilderView/FormSectionBuilderView.svelte';
  import type { FormComponent } from '$lib/form-components/FormComponentType';
  import BasicSection from './BasicSection.svelte';
  import BasicSectionSettingsModal from './BasicSectionSettingsModal.svelte';

  export let sectionTitle: string = '';
  export let formComponent: FormComponent;
  export let index: number;

  let editModalOpen = false;
  let openEditModal = () => {
      editModalOpen = true;
  };
</script>

<FormSectionBuilderView 
  componentIndex={index} 
  {formComponent} 
  {openEditModal} 
>
  <BasicSection {sectionTitle} slot="section" />
</FormSectionBuilderView>

<BasicSectionSettingsModal
  bind:modalOpen={editModalOpen}
  {sectionTitle}
  {formComponent}
  isEditing={true}
  on:componentEdited={() => (editModalOpen = false)}
/>