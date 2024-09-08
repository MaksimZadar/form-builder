<script lang="ts">
  import { Theme } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import "../app.css";
  import { themePersistKey, themeStore } from "../lib/stores/themeStore";
</script>

<Theme bind:theme={$themeStore} persist persistKey={themePersistKey} />

<slot />
