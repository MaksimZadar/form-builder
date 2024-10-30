import type { FormComponent } from "$lib/form-components/FormComponentType";
import { writable } from "svelte/store";

type DragData = {
  draggedComponent: FormComponent | undefined;
  fromIndex: number | null;
}

function createDragStore() {
  const { subscribe, set, update } = writable<DragData>({
    draggedComponent: undefined,
    fromIndex: null,
  });

  return {
    subscribe,
    set,
    update,
    setDraggingComponents: (index: number | null, formComponent: FormComponent | undefined) => {
      update(() => ({
        draggedComponent: formComponent,
        fromIndex: index,
      }));
    }
  };
}

export const componentDragStore = createDragStore()