<script lang="ts">
    import { type FormComponent } from '$lib/form-components/FormComponentType';
    import { componentDragStore } from '$lib/stores/componentDragStore';
    import { formStore } from '$lib/stores/formStore';
    import { Button } from 'carbon-components-svelte';
    import { Draggable, Edit, TrashCan } from 'carbon-icons-svelte';
    import DropSection from '../DropSections/DropSection.svelte';

    let fromIndex: number | null = null;
    let isDragging = false;
    let draggedComponent: FormComponent | undefined = undefined;

    export let formComponent: FormComponent;
    export let componentIndex: number;
    export let openEditModal: () => void;

    export let removeComponent = () => {
        if (formComponent.sectionId) {
            var section = $formStore.formComponents.find(
                (component) => component.id === formComponent.sectionId,
            );
            if (section) {
                formStore.removeSectionInput(section, formComponent);
            }
        } else {
            formStore.removeFormComponent(formComponent.id);
        }
    };

    let dragStart = () => {
        componentDragStore.setDraggingComponents(componentIndex, formComponent);
    };

    let dragEnd = () => {
        isDragging = false;
        fromIndex = null;
        componentDragStore.setDraggingComponents(null, undefined);
    };

    let drop = (
        event: DragEvent & { currentTarget: EventTarget & HTMLDivElement },
        toIndex: number,
    ) => {
        event.preventDefault();

        if (draggedComponent === undefined || fromIndex === null) {
            dragEnd();
            return;
        }

        // If the dragged component is in the same section
        if (
            formComponent.sectionId &&
            draggedComponent.sectionId &&
            draggedComponent.sectionId === formComponent.sectionId
        ) {
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

            dragEnd();
            return;
        }

        // If the dragged component is in a section but form component is not
        if (draggedComponent.sectionId !== formComponent.sectionId) {
            const currentDraggedComponentSection =
                $formStore.formComponents.find(
                    (component) => component.id === draggedComponent?.sectionId,
                );

            if (currentDraggedComponentSection) {
                formStore.removeSectionInput(
                    currentDraggedComponentSection,
                    draggedComponent,
                );
            }

            draggedComponent.sectionId = undefined;

            formStore.addFormComponent(draggedComponent);
            formStore.moveFormComponent(draggedComponent, toIndex);

            dragEnd();
            return;
        }

        dragEnd();
    };

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

    let showTopDropSection = (): boolean => {
        // if we are in a section
        if (formComponent.sectionId) {
            if (draggedComponent === undefined) {
                return false;
            }

            if (draggedComponent.sectionId === formComponent.sectionId) {
                if (fromIndex !== null && fromIndex > componentIndex) {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            if (draggedComponent?.sectionId !== formComponent.sectionId) {
                return true;
            }
            if (fromIndex !== null && fromIndex > componentIndex) {
                return true;
            }
        }
        return false;
    };

    let showBottomDropSection = (): boolean => {
        // if we are in a section
        if (formComponent.sectionId) {
            if (draggedComponent === undefined) {
                return false;
            }

            if (draggedComponent.sectionId === formComponent.sectionId) {
                if (fromIndex !== null && fromIndex < componentIndex) {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            if (fromIndex !== null && fromIndex < componentIndex) {
                return true;
            }
        }
        return false;
    };
</script>

{#if isDragging && showTopDropSection()}
    <DropSection
        index={componentIndex}
        drop={(event) => drop(event, componentIndex)}
    />
{/if}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="w-full cursor-grab outline-none hover:outline-slate-600 flex items-end"
    draggable="true"
    aria-grabbed="false"
    on:dragstart={dragStart}
    on:dragend={dragEnd}
>
    <slot name="input" />
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
        on:click={() => openEditModal()}
    />
    <Button
        iconDescription="Remove component"
        size="field"
        tooltipPosition="left"
        icon={TrashCan}
        kind="danger"
        on:click={() => removeComponent()}
    />
</div>
{#if isDragging && showBottomDropSection()}
    <DropSection
        index={componentIndex}
        drop={(event) => drop(event, componentIndex)}
    />
{/if}
