// import { registerElement, ElementNode } from "./basicdom";
// import { QWidget } from "@nodegui/nodegui";
import { registerElement } from "./nativescript-vue-next/runtime/registry";
import { RNObject, ObjectProps } from "./svelte/RNObject";
import StyleElement from "./svelte/StyleElement";
import HeadElement from "./svelte/HeadElement";
import type SvelteNodeGUIDocument from "./svelte/SvelteNodeGUIDocument";
import type { NSVElement } from "./nativescript-vue-next/runtime/nodes";
import { RNWindow } from "./react-nodegui/src/components/Window/RNWindow";

// Dom elements that svelte expects to be able to create or use.
// or custom additions to make life easier

export function registerSvelteElements(): void {
    registerElement<RNObject, ObjectProps>(
        'document',
        () => new RNObject(),
        {
            nodeOps: {
                insert(child, parent: SvelteNodeGUIDocument, atIndex?: number) {
                    if(child instanceof HeadElement){
                        if(parent.head){
                            if(parent.head !== child){
                                console.warn(`document can only have one head!`);
                            }
                        } else {
                            parent.head = child;
                            child.updateStyles();
                        }
                        return "defer";
                    }

                    if(child.tagName === "body"){
                        if(parent.body){
                            if(parent.body !== child){
                                console.warn(`document can only have one head!`);
                            }
                        } else {
                            parent.body = child as NSVElement<RNObject>;
                        }
                        return "defer";
                    }

                    return "defer";
                },
                remove(child, parent: SvelteNodeGUIDocument) {
                    if(child instanceof HeadElement){
                        parent.setStyleSheets("");
                        parent.head = null;
                        return "defer";
                    }

                    if(child.tagName === "body"){
                        parent.body = null;
                        return "defer";
                    }

                    // child.ownerDocument = null;

                    return "defer";
                }
            }
        }
    );
    registerElement<RNObject, ObjectProps>(
        'head',
        () => new RNObject(),
        {
            nodeOps: {
                insert(child, parent: HeadElement, atIndex?: number) {
                    if(child instanceof StyleElement){
                        let css: string = child.textContent;
                        let id = child.id;
                        const style_hash = id.replace('-style', '');
                        //style rules are one per line as long as each selector in the rule has the style hash we are all scoped styles and can pass true to addCss
                        const all_scoped: boolean = css.split("\n").every(r => r.split(",").every(i => i.indexOf(style_hash) >= 0));

                        // console.log(`[HeadElement] ${child} #${id}; style hash: ${style_hash}; all_scoped: ${all_scoped}; had text: ${css}`);

                        parent.addStyleElement(child);
                    }
                    return "defer";
                },
                remove(child, parent: HeadElement) {
                    // console.log(`[HeadElement] remove(${child}) removing child...`);

                    if(child instanceof StyleElement){
                        parent.removeStyleElement(child);
                    }
                    return "defer";
                },
            }
        }
    );
    registerElement<RNObject, ObjectProps>(
        'style',
        () => new RNObject()
    );
    registerElement<RNObject, ObjectProps>(
        'body',
        () => new RNObject(),
    );
    registerElement<RNObject, ObjectProps>(
        'fragment',
        () => new RNObject(),
    );
    registerElement<RNObject, ObjectProps>(
        'template',
        () => new RNObject()
    );
}