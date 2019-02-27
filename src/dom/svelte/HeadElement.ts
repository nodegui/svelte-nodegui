import { ElementNode, ViewNode } from "../basicdom";
import StyleElement from "./StyleElement";
import { topmost } from "tns-core-modules/ui/frame"

export default class HeadElement extends ElementNode {

    constructor() {
        super('head')
    }

    onInsertedChild(childNode: ViewNode, atIndex: number) {
        if (childNode instanceof StyleElement) {

            let frame = topmost();

            const applyStyleSheet = () => {
                if (frame) {
                    let css: string = (childNode as any).textContent;
                    if (css) {
                        console.log("adding frame css", css);
                        frame.addCss(css);
                        console.log("frame css is now", frame.css);
                    }
                }
            }

            if (!frame) {
                console.log("no topframe, waiting for a tick")
                //the rare occasion we have no top frame, usually a race at app start, we just wait for a tick
                setTimeout(() => { frame = topmost(); applyStyleSheet() }, 0)
            } else {
                applyStyleSheet();
            }
        }
    }

}