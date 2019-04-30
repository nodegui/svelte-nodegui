
import { DocumentNode, ElementNode, createElement, TextNode, logger as log } from '../basicdom';

export default class SvelteNativeDocument extends DocumentNode {
    head: ElementNode;
    constructor() {
        super()

        this.head = createElement('head')
        this.appendChild(this.head);

        log.debug(`created ${this}`)
    }

    createTextNode(text: string) {
        const el = new TextNode(text)
        log.debug(`created ${el}`)
        return el;
    }

    createElementNS(namespace: string, tagName: string): ElementNode {
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
