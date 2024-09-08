import {
  type FormComponent,
  type FormData,
} from "$lib/form-components/FormComponentType";
import { writable } from "svelte/store";

function createFormStore() {
  const { subscribe, set, update } = writable<FormData>({
    formName: "New Form",
    logo: null,
    formComponents: [
      // {
      //   type: FormComponentTypesEnum.SIMPLE_INPUT,
      //   component: SimpleInput,
      //   props: {
      //     label: "Name",
      //     placeholder: "Enter your name",
      //   },
      // },
    ],
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
    moveFormComponent: (dragIndex: number, index: number) => {
      update((form) => {
        const dragItem = form.formComponents[dragIndex];
        form.formComponents = form.formComponents.filter(
          (_, i) => i !== dragIndex
        );
        return {
          ...form,
          formComponents: [
            ...form.formComponents.slice(0, index),
            dragItem,
            ...form.formComponents.slice(index),
          ],
        };
      });
    },
    updateLogo: (newLogo: File | null) => {
      update((form) => ({ ...form, logo: newLogo }));
    },
  };
}

export const formStore = createFormStore();
