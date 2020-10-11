// import { registerElement, ElementNode } from "./basicdom";
import { NSVElement } from "./nativescript-vue-next/runtime/nodes";
import { registerElement } from "./nativescript-vue-next/runtime/registry";
import HeadElement from "./svelte/HeadElement";
import StyleElement from "./svelte/StyleElement";
import TemplateElement from "./svelte/TemplateElement";

// Dom elements that svelte expects to be able to create or use.
// or custom additions to make life easier

export function registerSvelteElements() {
    registerElement('head', () => new HeadElement());
    registerElement('style', () => new StyleElement());
    registerElement('fragment', () => new NSVElement('fragment'));
    registerElement('template', () => new TemplateElement());
}