<script lang="ts">
  import FormInputsList from "./components/FormInputsList.svelte";
  import FormSettings from "./components/FormSettings.svelte";
</script>

<div class="w-screen h-screen flex">
  <div class="flex-shrink">
    <FormSettings />
  </div>
  <div class="flex py-4 justify-center flex-grow w-full">
    <div class="w-1/2 h-full">
      <FormInputsList />
    </div>
  </div>
</div>
