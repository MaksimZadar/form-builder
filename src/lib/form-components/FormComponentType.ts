import PlainTextInputListTile from "$lib/form-inputs/PlainTextInput/PlainTextInputListTile.svelte";
import EmailInputListTile from "../form-inputs/EmailInput/EmailInputListTile.svelte";

export type FormData = {
  formName: string;
  formInputs: FormInput[];
  logo: File | null;
};

export enum FormInputTypes {
  SIMPLE_INPUT,
  EMAIL_INPUT,
}

export type FormInput = {
  type: FormInputTypes;
  component: ConstructorOfATypedSvelteComponent;
  settings: object;
  sectionId?: string;
};

export const ComponentSelectionList: ConstructorOfATypedSvelteComponent[] = [
  PlainTextInputListTile,
  EmailInputListTile,
];
