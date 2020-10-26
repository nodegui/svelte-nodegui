
// import { DocumentNode, ElementNode, createElement, TextNode, logger as log } from '../basicdom';
import { nodeOps } from "../nativescript-vue-next/runtime/nodeOps";
import { elementIterator, NSVComment, NSVElement, NSVNodeTypes, NSVText } from "../nativescript-vue-next/runtime/nodes";
import { warn, error, log } from '../shared/Logger';
import HeadElement from "./HeadElement";

export default class SvelteDesktopDocument extends NSVElement {
    head: HeadElement;
    constructor() {
        super("document");

        this.head = nodeOps.createElement('head') as HeadElement;
        
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
        return nodeOps.createElement(tagName) as NSVElement;
    }

    createElementNS(namespace: string, tagName: string): NSVElement {
        return this.createElement(tagName)
    }

    createTextNode(text: string): NSVText {
        return new NSVText(text)
    }

    getElementById(id: string): NSVElement|null {
        for(let el of elementIterator(this)){
            if(el.nodeType === NSVNodeTypes.ELEMENT && (el as NSVElement).id === id){
                return el as NSVElement;
            }
        }
        return null;
    }

    dispatchEvent(event: any) {
        //Svelte dev fires these for tool support
    }
}
