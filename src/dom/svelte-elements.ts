// import { registerElement, ElementNode } from "./basicdom";
// import { QWidget } from "@nodegui/nodegui";
import { registerElement } from "./nativescript-vue-next/runtime/registry";
import { RNObject, ObjectProps } from "./svelte/RNObject";
import StyleElement from "./svelte/StyleElement";

// Dom elements that svelte expects to be able to create or use.
// or custom additions to make life easier

export function registerSvelteElements(): void {
    // These are all "virtual elements", i.e. they lack a native view.
    // Hence, we return void 0 in the resolver.
    registerElement<RNObject, ObjectProps>(
        'head',
        () => new RNObject(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {
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
                        if (css) {
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
                remove(child, parent): void {
                    console.log(`[HeadElement] remove(${child}) removing child...`);
                },
            }
        }
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