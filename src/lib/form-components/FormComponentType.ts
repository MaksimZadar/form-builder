import PlainTextInputListTile from "$lib/form-inputs/PlainTextInput/PlainTextInputListTile.svelte";
import EmailInputListTile from "../form-inputs/EmailInput/EmailInputListTile.svelte";

export type FormData = {
  formName: string;
  formComponents: FormComponent[];
  logo: File | null;
};

export enum FormComponentTypesEnum {
  SIMPLE_INPUT = "Plain Text Input",
  EMAIL_INPUT = "Email Input",
}

export type FormComponent = {
  type: FormComponentTypesEnum;
  component: ConstructorOfATypedSvelteComponent;
  props: object;
};

export const ComponentSelectionList: ConstructorOfATypedSvelteComponent[] = [
  PlainTextInputListTile,
  EmailInputListTile,
];
