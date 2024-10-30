<script lang="ts">
    import BasicSectionBuilder from '$lib/form-components/BasicSection/BasicSectionBuilder.svelte';
    import {
        FormComponentType,
        type FormComponent,
    } from '$lib/form-components/FormComponentType';
    import EmailInputBuilder from '$lib/form-inputs/EmailInput/EmailInputBuilder.svelte';
    import PlainTextInputBuilder from '$lib/form-inputs/PlainTextInput/PlainTextInputBuilder.svelte';
    import { componentDragStore } from '$lib/stores/componentDragStore';
    import { formStore } from '$lib/stores/formStore';
    import { Button } from 'carbon-components-svelte';
    import { Draggable, Edit, TrashCan } from 'carbon-icons-svelte';
    import { flip } from 'svelte/animate';
    import DropIntoSection from '../DropSections/DropIntoSection.svelte';
    import DropSection from '../DropSections/DropSection.svelte';

    export let formComponent: FormComponent;
    export let componentIndex: number;
    export let openEditModal: () => void;

    let isDraggingInSection = false;
    let dragStartInSection = (index: number, id: string) => {
        isDraggingInSection = true;
    };

    export let dragEndInSection = () => {
        isDraggingInSection = false;
    };

    let dragStart = () => {
        componentDragStore.setDraggingComponents(componentIndex, formComponent);
    };

    let dragEnd = () => {
        isDragging = false;
        fromIndex = null;
        componentDragStore.setDraggingComponents(null, undefined);
    };

    let removeComponent = () => {
        formStore.removeFormComponent(formComponent.id);
    };

    let getFormComponentByType = (
        componentType: FormComponentType,
    ): ConstructorOfATypedSvelteComponent | null => {
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
    };

    let isDragging = false;
    let fromIndex: number | null = null;
    let draggedComponent: FormComponent | undefined = undefined;

    componentDragStore.subscribe((value) => {
        if (value.fromIndex === null) {
            isDragging = false;
            fromIndex = null;
            draggedComponent = undefined;
            return;
        }

        fromIndex = value.fromIndex;
        isDragging = true;
        draggedComponent = value.draggedComponent;
    });

    let isComponentItsOwnSection = (): boolean => {
        return (
            draggedComponent !== undefined &&
            formComponent.id === draggedComponent.id
        );
    };

    let isComponentInSection = () => {
        return (
            draggedComponent !== undefined &&
            draggedComponent.sectionId &&
            draggedComponent.sectionId === formComponent.id
        );
    };

    let canAddToSection = () => {
        return !isComponentInSection() && !isComponentItsOwnSection();
    };

    let addToSection = (
        event: DragEvent & { currentTarget: EventTarget & HTMLDivElement },
    ) => {
        event.preventDefault();

        if (fromIndex === null || draggedComponent === undefined) {
            return;
        }

        if (draggedComponent.sectionId === formComponent.id) {
            return;
        }

        formStore.addToSection(draggedComponent, formComponent);
    };

    let drop = (
        event: DragEvent & { currentTarget: EventTarget & HTMLDivElement },
        toIndex: number,
    ) => {
        event.preventDefault();

        if (fromIndex !== null && draggedComponent !== undefined) {
            if (draggedComponent.sectionId) {
                const section = $formStore.formComponents.find(
                    (component) => component.id === draggedComponent?.sectionId,
                );
                if (section) {
                    formStore.moveWithinSection(
                        section,
                        draggedComponent,
                        componentIndex,
                    );
                }
            } else {
                formStore.moveFormComponent(draggedComponent, toIndex);
            }
        }

        isDragging = false;
        fromIndex = null;
    };
</script>

{#if isDragging && fromIndex !== null && fromIndex > componentIndex}
    <DropSection
        index={componentIndex}
        drop={(event) => drop(event, componentIndex)}
    />
{/if}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="w-full flex flex-col border-b border-solid border-slate-400 py-4">
    <div
        class="w-full cursor-grab outline-none hover:outline-slate-600 flex mb-4"
        draggable="true"
        aria-grabbed="false"
        on:dragstart={dragStart}
        on:dragend={dragEnd}
    >
        <slot name="section" />
        <Button
            iconDescription="Drag"
            size="field"
            tooltipPosition="bottom"
            icon={Draggable}
            kind="secondary"
            class="cursor-grab"
        />
        <Button
            iconDescription="Edit component"
            size="field"
            tooltipPosition="bottom"
            icon={Edit}
            kind="primary"
            on:click={openEditModal}
        />
        <Button
            iconDescription="Remove component"
            size="field"
            tooltipPosition="left"
            icon={TrashCan}
            kind="danger"
            on:click={removeComponent}
        />
    </div>
    <div class="w-full flex flex-col gap-2">
        {#if formComponent.type === FormComponentType.BASIC_SECTION && formComponent.inputs}
            {#each formComponent.inputs as input, idx (input.id)}
                <div animate:flip={{ duration: 400 }} class="w-full">
                    <svelte:component
                        this={getFormComponentByType(input.type)}
                        {...input.settings}
                        formComponent={input}
                        dragStart={dragStartInSection}
                        dragEnd={dragEndInSection}
                        index={idx}
                    />
                </div>
            {/each}
        {/if}
    </div>
</div>
{#if isDragging && fromIndex !== null && canAddToSection()}
    <DropIntoSection index={componentIndex} drop={addToSection} />
{/if}
{#if isDragging && fromIndex !== null && fromIndex < componentIndex}
    <DropSection
        index={componentIndex}
        drop={(event) => drop(event, componentIndex)}
    />
{/if}
