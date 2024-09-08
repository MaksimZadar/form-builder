<script lang="ts">
  import { TextInput } from "carbon-components-svelte";

  export let label;
  export let placeholder: string = "";
  export let isRequired: boolean = false;
</script>

<div class="w-full">
  <TextInput
    type="email"
    labelText={label}
    {placeholder}
    required={isRequired}
  />
</div>
