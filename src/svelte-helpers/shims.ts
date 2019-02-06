import { current_component } from "svelte/internal"

export function getEventHandlers(): {[index: string]: ((event: any) => void)[]} {
    return current_component.$$.callbacks;
}