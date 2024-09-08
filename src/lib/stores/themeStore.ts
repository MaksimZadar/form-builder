import { browser } from "$app/environment";
import type { CarbonTheme } from "carbon-components-svelte/src/Theme/Theme.svelte";
import { writable } from "svelte/store";

export const themePersistKey: string = "__carbon-theme";

function createTheme() {
  // get theme from local storage or default to white
  let storedTheme: string | null = null;

  if (browser) {
    storedTheme = localStorage.getItem(themePersistKey) ?? "white";
  }

  const { subscribe, set, update } = writable<CarbonTheme>(
    storedTheme as CarbonTheme
  );

  return {
    subscribe,
    set,
    toggle: () => update((theme) => (theme === "white" ? "g90" : "white")),
  };
}

export const themeStore = createTheme();
