import {
  type FormData,
  type FormInput,
} from "$lib/form-components/FormComponentType";
import { writable } from "svelte/store";

function createFormStore() {
  const { subscribe, set, update } = writable<FormData>({
    formName: "New Form",
    logo: null,
    formInputs: [],
  });

  return {
    subscribe,
    set,
    update,
    updateFormName: (newFormName: string) => {
      update((form) => ({ ...form, formName: newFormName }));
    },
    addFormInput: (formInput: FormInput) => {
      update((form) => ({
        ...form,
        formInputs: [...form.formInputs, formInput],
      }));
    },
    removeFormInput: (index: number) => {
      update((form) => ({
        ...form,
        formInputs: form.formInputs.filter((_, i) => i !== index),
      }));
    },
    moveFormInput: (fromIndex: number, toIndex: number) => {
      update((form) => {
        const fromItem = form.formInputs[fromIndex];
        form.formInputs = form.formInputs.filter((_, i) => i !== fromIndex);
        return {
          ...form,
          formInputs: [
            ...form.formInputs.slice(0, toIndex),
            fromItem,
            ...form.formInputs.slice(toIndex),
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
