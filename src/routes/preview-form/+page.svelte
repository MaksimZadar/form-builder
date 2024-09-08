<script>
  import { Button, Form } from "carbon-components-svelte";
  import FormPreview from "./components/FormPreview.svelte";
</script>

<div class="w-screen h-screen flex justify-center items-center p-4">
  <Form class="w-2/5 h-full flex flex-col gap-2" on:submit>
    <FormPreview />
    <Button type="submit">Submit</Button>
  </Form>
</div>
