<script lang="ts">
    import FormInputBuilderView from '$lib/custom-components/FormInputBuilderView/FormInputBuilderView.svelte';
    import type { FormComponent } from '$lib/form-components/FormComponentType';
    import EmailInput from './EmailInput.svelte';
    import EmailSettingsModal from './EmailSettingsModal.svelte';

    export let label: string = '';
    export let placeholder: string = '';
    export let isOptional: boolean = false;
    export let formComponent: FormComponent;
    export let index: number;

    let editModalOpen = false;
    let openEditModal = () => {
        editModalOpen = true;
    };
</script>

<FormInputBuilderView 
  componentIndex={index} 
  {formComponent}  
  {openEditModal} 
  on:componentDragging={(e) => console.log(e)}
>
  <EmailInput  {label} {placeholder} {isOptional} slot="input" />
</FormInputBuilderView>

<EmailSettingsModal
    bind:modalOpen={editModalOpen}
    {label}
    {placeholder}
    {isOptional}
    {formComponent}
    isEditing={true}
    on:componentEdited={() => (editModalOpen = false)}
/>
