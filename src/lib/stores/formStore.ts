import {
  FormComponentType,
  type FormComponent,
  type FormData,
} from "$lib/form-components/FormComponentType";
import { writable } from "svelte/store";

  function isComponentASection(componentType: FormComponentType) {
    switch (componentType) {
      case FormComponentType.BASIC_SECTION:
        return true;
      default:
        return false;
    }
  }

function createFormStore() {
  const { subscribe, set, update } = writable<FormData>({
    formName: "New Form",
    logo: null,
    formComponents: [],
  });

  return {
    subscribe,
    set,
    update,
    updateFormName: (newFormName: string) => {
      update((form) => ({ ...form, formName: newFormName }));
    },
    addFormComponent: (formComponent: FormComponent) => {
      update((form) => ({
        ...form,
        formComponents: [...form.formComponents, formComponent],
      }));
    },
    removeFormComponent: (id: string) => {
      update((form) => ({
        ...form,
        formComponents: form.formComponents.filter((c) => c.id !== id),
      }));
    },
    removeSectionInput: (section: FormComponent, input: FormComponent) => {
      update((form) => {
        const foundSection = form.formComponents.find(
          (component) => component.id === section?.id
        );

        if (!foundSection || !isComponentASection(foundSection.type)) {
          return form;
        }

        foundSection.inputs = foundSection.inputs?.filter((c) => c.id !== input.id);

        return form;
      });
    },
    moveWithinSection: (section: FormComponent, component: FormComponent, toIndex: number) => {
      update((form) => {
        const foundSection = form.formComponents.find(
          (c) => c.id === section.id
        );

        if (!foundSection || !isComponentASection(foundSection.type) || !foundSection.inputs) {
          return form;
        }

        const movedComponent = foundSection.inputs.find(
          (c) => c.id === component.id
        );

        if (!movedComponent) {
          return form;
        }

        foundSection.inputs = foundSection.inputs.filter(
          (c) => c.id !== component.id
        );

        foundSection.inputs = [
          ...foundSection.inputs.slice(0, toIndex),
          movedComponent,
          ...foundSection.inputs.slice(toIndex),
        ];

        return form;
      })
    },
    moveFormComponent: (component: FormComponent, toIndex: number) => {
      update((form) => {
        const fromItem = form.formComponents.find(
          (c) => c.id === component.id
        );
        
        if (!fromItem) {
          return form;
        }

        form.formComponents = form.formComponents.filter(
          (c) => c.id !== component.id
        );

        return {
          ...form,
          formComponents: [
            ...form.formComponents.slice(0, toIndex),
            fromItem,
            ...form.formComponents.slice(toIndex),
          ],
        };
      });
    },
    addToSection: (component: FormComponent, section: FormComponent) => {
      update((form) => {
        const movedComponent = form.formComponents.find(
          (c) => c.id === component.id
        );
        const foundSection = form.formComponents.find(
          (c) => c.id === section?.id
        );

        if (!movedComponent || !foundSection) {
          return form;
        }

        if (!isComponentASection(foundSection.type)) {
          return form;
        }

        // Add component to section
        movedComponent.sectionId = section.id;
        section.inputs?.push(movedComponent);

        // Remove component from form
        form.formComponents = form.formComponents.filter(
          (c) => c.id !== movedComponent.id
        );

        return {
          ...form,
          formComponents: form.formComponents,
        };
      });
    },
    updateLogo: (newLogo: File | null) => {
      update((form) => ({ ...form, logo: newLogo }));
    },
  };
}

export const formStore = createFormStore();
