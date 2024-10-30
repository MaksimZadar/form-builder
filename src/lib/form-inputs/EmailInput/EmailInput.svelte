<script lang="ts">
  import { TextInput } from "carbon-components-svelte";

  export let label;
  export let placeholder: string = "";
  export let isOptional: boolean = false;
  export let disabled = false;
</script>

<div class="w-full">
  <TextInput
    type="email"
    labelText={`${label}${isOptional ? " (optional)" : ""}`}
    {placeholder}
    required={!isOptional}
    {disabled}
  />
</div>
