import { current_component, flush } from "svelte/internal"

export function getEventHandlers(): {[index: string]: ((event: any) => void)[]} {
    return current_component.$$.callbacks;
}

export function forceRender(): void {
    flush();
}

export function cleanProps(props: {[index: string]: any}) {
    let newProps:{[index: string]: any} = {}
    for(let key of Object.keys(props)) {
        if (!key.startsWith('$')) {
            newProps[key] = props[key];
        }
    }
    return newProps;
}