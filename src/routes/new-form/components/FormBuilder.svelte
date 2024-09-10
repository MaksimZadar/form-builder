<script lang="ts">
    import BasicSection from '$lib/form-components/BasicSection/BasicSection.svelte';
    import {
        FormComponentType,
        type FormComponent,
    } from '$lib/form-components/FormComponentType';
    import EmailInput from '$lib/form-inputs/EmailInput/EmailInput.svelte';
    import PlainTextInput from '$lib/form-inputs/PlainTextInput/PlainTextInput.svelte';
    import { formStore } from '$lib/stores/formStore';
    import { Button } from 'carbon-components-svelte';
    import { Draggable, TrashCan } from 'carbon-icons-svelte';
    import { flip } from 'svelte/animate';
    import DropIntoSection from './DropIntoSection.svelte';
    import DropSection from './DropSection.svelte';

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
        console.log(form);
    });

    function removeComponent(id: string) {
        formStore.removeFormComponent(id);
    }

    function removeSectionComponent(section: FormComponent, input: FormComponent) {
        formStore.removeSectionInput(section, input);
    }

    function dragStart(itemIndex: number, formComponentId: string) {
        isDragging = true;
        fromIndex = itemIndex;
        draggedComponent = formComponentList.find((c) => c.id === formComponentId);
    }

    function dragInSectionStart(section: FormComponent, itemIndex: number, formComponentId: string) {
      isDragging = true;
      inSectionFromIndex = itemIndex;
      inSectionDraggedComponent = section.inputs?.find((c) => c.id === formComponentId);

      console.log(inSectionDraggedComponent);
    }

    function drop(
        event: DragEvent & { currentTarget: EventTarget & HTMLDivElement },
        toIndex: number,
    ) {
        event.preventDefault();

        if (fromIndex !== null && draggedComponent !== undefined) {
            formStore.moveFormComponent(draggedComponent, toIndex);
        }

        isDragging = false;
        fromIndex = null;
    }

    function dropInSection(
        event: DragEvent & { currentTarget: EventTarget & HTMLDivElement },
        section: FormComponent,
        toIndex: number,
    ) {
        event.preventDefault();
        console.log(section, inSectionDraggedComponent, toIndex);

        if (inSectionFromIndex !== null && inSectionDraggedComponent !== undefined) {
            formStore.moveWithinSection(section, inSectionDraggedComponent, toIndex);
        }

        isDragging = false;
        inSectionFromIndex = null;
        inSectionDraggedComponent = undefined;
    }

    function addToSection(
        event: DragEvent & { currentTarget: EventTarget & HTMLDivElement },
        sectionId: string,
    ) {
        event.preventDefault();

        const section = formComponentList.find((c) => c.id === sectionId);
        if (!section || !isComponentASection(section.type)) {
            return;
        }

        if (fromIndex !== null && draggedComponent !== undefined) {
            formStore.addToSection(draggedComponent, section);
        }

        isDragging = false;
        fromIndex = null;
    }

    function getFormComponentByType(
        componentType: FormComponentType,
    ): ConstructorOfATypedSvelteComponent | null {
        switch (componentType) {
            case FormComponentType.BASIC_SECTION:
                return BasicSection;
            case FormComponentType.SIMPLE_INPUT:
                return PlainTextInput;
            case FormComponentType.EMAIL_INPUT:
                return EmailInput;
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

    function isComponentInSection(section: FormComponent, fromIndex: number) {
        let draggedComponent = formComponentList[fromIndex];
        if (
            draggedComponent.sectionId &&
            draggedComponent.sectionId === section.id
        ) {
            return true;
        }

        return false;
    }

    function isComponentItsOwnSection(
        formComponent: FormComponent,
        fromIndex: number,
    ): boolean {
        let draggedComponent = formComponentList[fromIndex];
        return formComponent.id === draggedComponent.id;
    }

    function canAddToSection(section: FormComponent, fromIndex: number) {
        var draggedComponent = formComponentList[fromIndex];
        // if (isComponentASection(draggedComponent.type)) {
        //     return false;
        // }
        return (
            !isComponentInSection(section, fromIndex) &&
            !isComponentItsOwnSection(section, fromIndex)
        );
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
        class="flex flex-col justify-start items-center h-full overflow-hidden overflow-y-auto mt-4 p-4 gap-2 bg-slate-200"
    >
        {#each formComponentList as formComponent, index (formComponent.id)}
            <div animate:flip={{ duration: 400 }} class="w-full">
                <!-- render section separately to form input -->
                {#if isComponentASection(formComponent.type)}
                    {#if isDragging && fromIndex !== null && fromIndex > index}
                        <DropSection
                            {index}
                            drop={(event) => drop(event, index)}
                        />
                    {/if}
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div
                        class="w-full flex flex-row align-middle items-start border border-black border-solid"
                        draggable="true"
                        aria-grabbed="false"
                        on:dragstart={() => dragStart(index,formComponent.id)}
                        on:dragend={() => (isDragging = false)}
                    >
                        <Button
                            iconDescription="Drag"
                            size="field"
                            tooltipPosition="right"
                            icon={Draggable}
                            kind="secondary"
                            class="cursor-grab"
                        />
                        <div class="w-full flex flex-col">
                            <svelte:component
                                this={getFormComponentByType(
                                    formComponent.type,
                                )}
                                {...formComponent.settings}
                            />
                            {#if isComponentASection(formComponent.type) && formComponent.inputs && formComponent.inputs.length > 0}
                                {#each formComponent.inputs as sectionInput, sectionInputIndex (sectionInput.id)}
                                    <div animate:flip={{ duration: 400 }}>
                                        {#if isDragging && inSectionFromIndex !== null && inSectionFromIndex > sectionInputIndex}
                                            <DropSection
                                                index={sectionInputIndex}
                                                drop={(event) =>
                                                    dropInSection(event, formComponent, sectionInputIndex)}
                                            />
                                        {/if}
                                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                                        <div
                                            class="w-full flex flex-row align-middle items-end border border-black"
                                            draggable="true"
                                            aria-grabbed="false"
                                            on:dragstart={() =>
                                                dragInSectionStart(formComponent, sectionInputIndex, sectionInput.id)}
                                            on:dragend={() =>
                                                (isDragging = false)}
                                        >
                                            <Button
                                                iconDescription="Drag"
                                                size="field"
                                                tooltipPosition="right"
                                                icon={Draggable}
                                                kind="secondary"
                                                class="cursor-grab"
                                            />
                                            <svelte:component
                                                this={getFormComponentByType(
                                                    sectionInput.type,
                                                )}
                                                {...sectionInput.settings}
                                            />
                                            <Button
                                                iconDescription="Remove component"
                                                size="field"
                                                tooltipPosition="left"
                                                icon={TrashCan}
                                                kind="danger"
                                                on:click={() =>
                                                    removeSectionComponent(formComponent, sectionInput)}
                                            />
                                        </div>
                                        {#if isDragging && inSectionFromIndex !== null && inSectionFromIndex < sectionInputIndex}
                                            <DropSection
                                                index={sectionInputIndex}
                                                drop={(event) =>
                                                    dropInSection(event, formComponent, sectionInputIndex)}
                                            />
                                        {/if}
                                    </div>
                                {/each}
                            {/if}
                        </div>
                        <Button
                            iconDescription="Remove component"
                            size="field"
                            tooltipPosition="left"
                            icon={TrashCan}
                            kind="danger"
                            on:click={() => removeComponent(formComponent.id)}
                        />
                    </div>
                    {#if isDragging && fromIndex !== null && isComponentASection(formComponent.type) && canAddToSection(formComponent, fromIndex)}
                        <DropIntoSection
                            {index}
                            drop={(event) => addToSection(event, formComponent.id)}
                        />
                    {/if}
                    {#if isDragging && fromIndex !== null && fromIndex < index}
                        <DropSection
                            {index}
                            drop={(event) => drop(event, index)}
                        />
                    {/if}
                {:else}
                    <!-- render inputs -->
                    {#if isDragging && fromIndex !== null && fromIndex > index}
                        <DropSection
                            {index}
                            drop={(event) => drop(event, index)}
                        />
                    {/if}
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div
                        class="w-full flex flex-row align-middle items-end border border-black"
                        draggable="true"
                        aria-grabbed="false"
                        on:dragstart={() => dragStart(index, formComponent.id)}
                        on:dragend={() => (isDragging = false)}
                    >
                        <Button
                            iconDescription="Drag"
                            size="field"
                            tooltipPosition="right"
                            icon={Draggable}
                            kind="secondary"
                            class="cursor-grab"
                        />
                        <svelte:component
                            this={getFormComponentByType(formComponent.type)}
                            {...formComponent.settings}
                        />
                        <Button
                            iconDescription="Remove component"
                            size="field"
                            tooltipPosition="left"
                            icon={TrashCan}
                            kind="danger"
                            on:click={() => removeComponent(formComponent.id)}
                        />
                    </div>
                    {#if isDragging && fromIndex !== null && fromIndex < index}
                        <DropSection
                            {index}
                            drop={(event) => drop(event, index)}
                        />
                    {/if}
                {/if}
            </div>
        {/each}
    </div>
</div>
