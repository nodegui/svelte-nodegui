import { current_component, flush } from "svelte/internal"

export function getEventHandlers(): {[index: string]: ((event: any) => void)[]} {
    return current_component.$$.callbacks;
}

export function forceRender(): void {
    flush();
}