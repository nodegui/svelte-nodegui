import { current_component, flush } from "svelte/internal"

export function getEventHandlers(): { [index: string]: ((event: any) => void)[] } {
    console.warn("getEventHandlers is deprecated");
    return current_component.$$.callbacks;
}

export function forceRender(): void {
    console.warn("force render is deprecated");
    flush();
}
