
// import { DocumentNode, ElementNode, createElement, TextNode, logger as log } from '../basicdom';
import { NSVDocument, NSVElement, NSVNodeTypes, NSVText } from "../nativescript-vue-next/runtime/nodes";
import { log } from "../shared/Logger";
import { createElement } from "../nativescript-vue-next/runtime/registry";

export default class SvelteDesktopDocument extends NSVDocument {
    head: NSVElement;
    constructor() {
        super(NSVNodeTypes.DOCUMENT)

        this.head = createElement('head')
        
        this.appendChild(this.head);

        // log(`created ${this}`)
    }

    createTextNode(text: string) {
        const el = new NSVText(text)
        // log(`created ${el}`)
        return el;
    }

    createElementNS(namespace: string, tagName: string): NSVElement {
        return this.createElement(tagName);
    }

    createEvent(type: string) {
        let e: any = {};
        e.initCustomEvent = (type: string, ignored1: boolean, ignored2: boolean, detail: any) => {
            e.type = type;
            e.detail = detail;
            e.eventName = type;
        }
        return e;
    }
}
