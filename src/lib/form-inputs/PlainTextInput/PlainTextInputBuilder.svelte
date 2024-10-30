<script lang="ts">
    import FormInputBuilderView from "$lib/custom-components/FormInputBuilderView/FormInputBuilderView.svelte";
    import type { FormComponent } from "$lib/form-components/FormComponentType";
    import PlainTextInput from "./PlainTextInput.svelte";
    import PlainTextSettingsModal from "./PlainTextSettingsModal.svelte";

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
  <PlainTextInput  {label} {placeholder} {isOptional} slot="input" />
</FormInputBuilderView>

<PlainTextSettingsModal
    bind:modalOpen={editModalOpen}
    bind:label
    bind:placeholder
    bind:isOptional
    {formComponent}
    isEditing={true}
    on:componentEdited={() => (editModalOpen = false)}
/>
