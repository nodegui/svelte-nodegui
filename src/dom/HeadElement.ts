import { ElementNode, ViewNode, normalizeElementName } from "./basicdom";
import NativeElementNode from "./NativeElementNode";
import StyleElement from "./StyleElement";

export default class HeadElement extends ElementNode {

    constructor() {
        super('head')
    }

    onInsertedChild(childNode: ViewNode, atIndex: number) {
        if (childNode instanceof StyleElement) {
            //find the top frame el
            let frame: NativeElementNode = null;
            for (let el of this.ownerDocument.childNodes) {
                if (normalizeElementName(el.tagName) == 'frame') {
                    frame = el as NativeElementNode;
                }
            }

            if (frame) {
                let css: string = (childNode as any).textContent;
                if (css) {
                    console.log("adding frame css", css);
                    frame.nativeView.addCss(css);
                    console.log("frame css is now", frame.nativeView.css);
                }
            } else {
                console.log("there was no top frame when style was declared");
            }
        }
    }

}