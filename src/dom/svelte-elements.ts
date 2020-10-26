// import { registerElement, ElementNode } from "./basicdom";
// import { QWidget } from "@nodegui/nodegui";
import { registerElement } from "./nativescript-vue-next/runtime/registry";
import { RNObject, ObjectProps } from "./svelte/Object";

// Dom elements that svelte expects to be able to create or use.
// or custom additions to make life easier

export function registerSvelteElements(): void {
    // These are all "virtual elements", i.e. they lack a native view.
    // Hence, we return void 0 in the resolver.
    registerElement<RNObject, ObjectProps>(
        'head',
        () => new RNObject()
    );
    registerElement<RNObject, ObjectProps>(
        'style',
        () => new RNObject()
    );
    registerElement<RNObject, ObjectProps>(
        'document',
        () => new RNObject()
    );
    registerElement<RNObject, ObjectProps>(
        'fragment',
        () => new RNObject()
    );
    registerElement<RNObject, ObjectProps>(
        'template',
        () => new RNObject()
    );
}