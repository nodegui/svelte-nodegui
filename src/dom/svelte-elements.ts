// import { registerElement, ElementNode } from "./basicdom";
import { registerElement } from "./nativescript-vue-next/runtime/registry";

// Dom elements that svelte expects to be able to create or use.
// or custom additions to make life easier

export function registerSvelteElements(): void {
    // These are all "virtual elements", i.e. they lack a native view.
    // Hence, we return void 0 in the resolver.
    registerElement('head', () => void 0);
    registerElement('style', () => void 0);
    registerElement('document', () => void 0);
    registerElement('fragment', () => void 0);
    registerElement('template', () => void 0);
}