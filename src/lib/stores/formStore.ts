import {
  type FormComponent,
  type FormData,
} from "$lib/form-components/FormComponentType";
import { writable } from "svelte/store";

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
    removeFormComponent: (index: number) => {
      update((form) => ({
        ...form,
        formComponents: form.formComponents.filter((_, i) => i !== index),
      }));
    },
    moveFormComponent: (fromIndex: number, toIndex: number) => {
      update((form) => {
        const fromItem = form.formComponents[fromIndex];
        form.formComponents = form.formComponents.filter(
          (_, i) => i !== fromIndex
        );

        const newFormComponentsList = [
          ...form.formComponents.slice(0, toIndex),
          fromItem,
          ...form.formComponents.slice(toIndex),
        ];

        newFormComponentsList.forEach((input, index) => {
          input.index = index;
        });

        return {
          ...form,
          formComponents: newFormComponentsList,
        };
      });
    },
    updateLogo: (newLogo: File | null) => {
      update((form) => ({ ...form, logo: newLogo }));
    },
  };
}

export const formStore = createFormStore();
