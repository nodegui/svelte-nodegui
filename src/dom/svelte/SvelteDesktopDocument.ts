
// import { DocumentNode, ElementNode, createElement, TextNode, logger as log } from '../basicdom';
import { NSVComment, NSVElement, NSVNodeTypes, NSVText } from "../nativescript-vue-next/runtime/nodes";
import { warn, error, log } from '../shared/Logger';
import { createElement } from "../nativescript-vue-next/runtime/registry";
import HeadElement from "./HeadElement";

export default class SvelteDesktopDocument extends NSVElement {
    head: HeadElement;
    constructor() {
        console.log(`!! Constructing SvelteDesktopDocument.super('document')`);
        super(NSVNodeTypes.DOCUMENT);

        // this.head = createElement('head')
        this.head = new HeadElement();
        
        this.appendChild(this.head);

        // log(`created ${this}`)
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


    get text(): string | undefined {
        error(`text() getter called on element that does not implement it.`, this);
        return void 0;
    }

    set text(t: string | undefined) {
        error(`text() setter called on element that does not implement it.`, this);
    }

    createComment(text: string): NSVComment {
        return new NSVComment(text)
    }

    // createPropertyNode(tagName: string, propertyName: string): PropertyNode {
    //     return new PropertyNode(tagName, propertyName)
    // }

    createElement(tagName: string): NSVElement {
        // if (tagName.indexOf(".") >= 0) {
        //     let bits = tagName.split(".", 2);
        //     return this.createPropertyNode(bits[0], bits[1]);
        // }
        return createElement(tagName);
    }

    createElementNS(namespace: string, tagName: string): NSVElement {
        return this.createElement(tagName)
    }

    createTextNode(text: string): NSVText {
        return new NSVText(text)
    }

    // getElementById(id: string) {
    //     for (let el of elementIterator(this)) {
    //         if (el.nodeType === 1 && (el as ElementNode).id === id)
    //             return el;
    //     }
    // }

    dispatchEvent(event: any) {
        //Svelte dev fires these for tool support
    }
}
