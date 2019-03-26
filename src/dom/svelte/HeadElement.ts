import { ElementNode, ViewNode } from "../basicdom";
import StyleElement from "./StyleElement";
import { addCss } from "tns-core-modules/application"

export default class HeadElement extends ElementNode {

    constructor() {
        super('head')
    }

    onInsertedChild(childNode: ViewNode, atIndex: number) {
        if (childNode instanceof StyleElement) {
            let css: string = (childNode as any).textContent;
            if (css) {
                addCss(css);
            }
        }
    }

}