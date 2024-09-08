import EmailInputListTile from "./EmailInput/EmailInputListTile.svelte";
import SimpleInputListTile from "./SimpleInput/SimpleInputListTile.svelte";

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
  SimpleInputListTile,
  EmailInputListTile,
];
