// import { registerElement, ElementNode } from "./basicdom";
// import { QWidget } from "@nodegui/nodegui";
import { registerElement } from "./nativescript-vue-next/runtime/registry";
import { RNObject, ObjectProps } from "./svelte/RNObject";
import StyleElement from "./svelte/StyleElement";
import HeadElement from "./svelte/HeadElement";
import type SvelteDesktopDocument from "./svelte/SvelteDesktopDocument";
import type { NSVElement } from "./nativescript-vue-next/runtime/nodes";
import { RNWindow } from "./react-nodegui/src/components/Window/RNWindow";

// Dom elements that svelte expects to be able to create or use.
// or custom additions to make life easier

export function registerSvelteElements(): void {
    registerElement<RNObject, ObjectProps>(
        'document',
        () => new RNObject(), {
            nodeOps: {
                insert(child, parent: SvelteDesktopDocument, atIndex?: number) {
                    if(child instanceof HeadElement){
                        if(parent.head){
                            if(parent.head !== child){
                                console.warn(`document can only have one head!`);
                            }
                            return "defer";
                        } else {
                            parent.head = child;
                            child.updateStyles();
                        }
                        return "defer";
                    }

                    return "defer";
                },
                remove(child, parent: SvelteDesktopDocument) {
                    if(child instanceof HeadElement){
                        parent.setStyleSheets("");
                        parent.head = null;
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
                insert(child, parent: HeadElement, atIndex?: number): void {
                    if(child instanceof StyleElement){
                        console.log(`[HeadElement] ${parent} > ${child} @${atIndex}`);
                        let css: string = child.textContent;
                        let id = child.id;
                        console.log(`[HeadElement] ${child} #${id} had text: ${css}`);
                        console.log(`[HeadElement] ${child} #${id} nativeView had textContent property: ${child.nativeView.property("textContent")}`);
                        console.log(`[HeadElement] ${child} #${id} nativeView had textContent instance: ${child.nativeView.textContent}`);
                        let style_hash = id.replace('-style', '');
                        //style rules are one per line as long as each selector in the rule has the style hash we are all scoped styles and can pass true to addCss
                        let all_scoped = css.split("\n").every(r => r.split(",").every(i => i.indexOf(style_hash) >= 0))

                        parent.addStyleElement(child);
                        // const styleSheet: string = parent.getStyleSheet();

                        if (css) {
                            // FIXME: Need to do something more elaborate than this. Otherwise only the StyleElement that was most
                            //        recently added to the Head, or most recently had a CSS update, will have its CSS represented.
                            // allWindows.forEach(window => {
                            //     window.nativeView.setStyleSheet(styleSheet);
                            // });

                            // addCss(css, all_scoped);
                            // TODO: Somehow give StyleElement a reference to the Window that its in, so that it can apply
                            //       the stylesheet to the scope.
                            //       The <style> element may well be added to the page before the window, is one problem.
                            //       It's not yet clear how multiple windows will work out, either.
                            //       The UI hierarchy goes:
                            //         fragment > document > head > style
                            //         fragment > window

                        }
                    }
                },
                remove(child, parent: HeadElement): void {
                    console.log(`[HeadElement] remove(${child}) removing child...`);

                    if(child instanceof StyleElement){
                        parent.removeStyleElement(child);
                    }
                },
            }
        }
    );
    registerElement<RNObject, ObjectProps>(
        'style',
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