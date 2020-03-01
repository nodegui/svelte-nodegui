import { ElementNode, ViewNode } from "../basicdom";
import StyleElement from "./StyleElement";
import { addCss } from "@nativescript/core/application"

export default class HeadElement extends ElementNode {

    constructor() {
        super('head')
    }

    onInsertedChild(childNode: ViewNode, atIndex: number) {
        if (childNode instanceof StyleElement) {
            let css: string = (childNode as any).textContent;
            let id = (childNode as any).id;
            let style_hash = id.replace('-style', '');
            //style rules are one per line as long as each selector in the rule has the style hash we are all scoped styles and can pass true to addCss
            let all_scoped = css.split("\n").every(r => r.split(",").every(i => i.indexOf(style_hash) >= 0))
            if (css) {
                addCss(css, all_scoped);
            }
        }
    }

}