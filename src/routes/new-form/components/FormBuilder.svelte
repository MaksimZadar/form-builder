<script lang="ts">
    import BasicSectionBuilder from '$lib/form-components/BasicSection/BasicSectionBuilder.svelte';
    import {
        FormComponentType,
        type FormComponent,
    } from '$lib/form-components/FormComponentType';
    import EmailInputBuilder from '$lib/form-inputs/EmailInput/EmailInputBuilder.svelte';
    import PlainTextInputBuilder from '$lib/form-inputs/PlainTextInput/PlainTextInputBuilder.svelte';
    import { formStore } from '$lib/stores/formStore';
    import { flip } from 'svelte/animate';

    let formComponentList: FormComponent[] = [];

    $: formComponentList = $formStore.formComponents;

    let isDragging = false;
    let fromIndex: number | null = null;
    let inSectionFromIndex: number | null = null;

    let draggedComponent: FormComponent | undefined = undefined;
    let inSectionDraggedComponent: FormComponent | undefined = undefined;

    let formLogo: string | null = null;

    formStore.subscribe((form) => {
        if (form.logo) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(form.logo);
            fileReader.onload = (fileReaderEvent) => {
                if (fileReaderEvent.target && fileReaderEvent.target.result) {
                    var res = fileReaderEvent.target.result;
                    formLogo = res.toString();
                }
            };
        }
    });

    function getFormComponentByType(
        componentType: FormComponentType,
    ): ConstructorOfATypedSvelteComponent | null {
        switch (componentType) {
            case FormComponentType.BASIC_SECTION:
                return BasicSectionBuilder;
            case FormComponentType.SIMPLE_INPUT:
                return PlainTextInputBuilder;
            case FormComponentType.EMAIL_INPUT:
                return EmailInputBuilder;
            default:
                return null;
        }
    }

    function isComponentASection(componentType: FormComponentType) {
        switch (componentType) {
            case FormComponentType.BASIC_SECTION:
                return true;
            default:
                return false;
        }
    }
</script>

<div class="w-full flex flex-col h-full">
    <div class="w-full flex items-center justify-between">
        <h1 class="text-4xl flex-grow">{$formStore.formName}</h1>
        {#if $formStore.logo}
            <img
                alt="logo"
                class="flex-shrink overflow-hidden max-h-14"
                src={formLogo}
            />
        {/if}
    </div>
    <div
        class="flex flex-col justify-start items-center h-full overflow-hidden overflow-y-auto mt-4 p-4 gap-2 bg-   "
    >
        {#each formComponentList as formComponent, index (formComponent.id)}
            <div animate:flip={{ duration: 400 }} class="w-full">
                <!-- render section separately to form input -->
                {#if isComponentASection(formComponent.type)}
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <svelte:component
                        this={getFormComponentByType(formComponent.type)}
                        {...formComponent.settings}
                        {formComponent}
                        {index}
                    />
                {:else}
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <svelte:component
                        this={getFormComponentByType(formComponent.type)}
                        {...formComponent.settings}
                        {formComponent}
                        {index}
                    />
                {/if}
            </div>
        {/each}
    </div>
</div>
