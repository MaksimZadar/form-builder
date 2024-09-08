import PlainTextInputListTile from "$lib/form-inputs/PlainTextInput/PlainTextInputListTile.svelte";
import EmailInputListTile from "../form-inputs/EmailInput/EmailInputListTile.svelte";
import BasicSectionSelectionTile from "./BasicSection/BasicSectionSelectionTile.svelte";

export type FormData = {
  formName: string;
  formComponents: FormComponent[];
  logo: File | null;
};

export enum FormComponentType {
  SIMPLE_INPUT,
  EMAIL_INPUT,
  BASIC_SECTION,
}

export interface FormComponent {
  id: string;
  index: number;
  type: FormComponentType;
  settings: object;
  sectionId?: string;
  inputs?: FormComponent[];
}

export const InputSelectionList: ConstructorOfATypedSvelteComponent[] = [
  PlainTextInputListTile,
  EmailInputListTile,
];

export const SectionSelectionList: ConstructorOfATypedSvelteComponent[] = [
  BasicSectionSelectionTile,
];
