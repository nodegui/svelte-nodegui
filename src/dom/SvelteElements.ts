import { registerCustomElementNode, ElementNode } from "./basicdom";
import HeadElement from "./HeadElement";
import StyleElement from "./StyleElement";

// Dom elements that svelte expects to be able to create or use.

export function registerSvelteElements() {
    registerCustomElementNode('head', () => new HeadElement());
    registerCustomElementNode('style', () => new StyleElement())
    registerCustomElementNode('fragment', () => new ElementNode('fragment'))
}