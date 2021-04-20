
// import { DocumentNode, ElementNode, createElement, TextNode, logger as log } from '../basicdom';
import { elementIterator, NSVComment, NSVElement, NSVNodeTypes, NSVText } from "../nativescript-vue-next/runtime/nodes";
import { RNWindow } from "../react-nodegui/src/components/Window/RNWindow";
import { warn, error, log } from '../shared/Logger';
import HeadElement from "./HeadElement";
import { RNObject } from "./RNObject";
import StyleElement from "./StyleElement";
import TemplateElement from "./TemplateElement";

export default class SvelteNodeGUIDocument extends NSVElement<RNObject> {
    public head: HeadElement = this.createElement('head') as HeadElement;
    public body: NSVElement<RNObject> = this.createElement('body') as NSVElement<RNObject>;
    private _windows: Set<NSVElement<RNWindow>> = new Set();

    constructor() {
        super("document");

        this.appendChild(this.head);
        this.appendChild(this.body);

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

    createComment(data: string): NSVComment {
        console.log(`Creating comment with data: "${data}"`);
        return new NSVComment(data)
    }

    // createPropertyNode(tagName: string, propertyName: string): PropertyNode {
    //     console.log(`[SvelteNodeGUIDocument] createPropertyNode("${tagName}", "${propertyName}")`);
    //     return new PropertyNode(tagName, propertyName)
    // }

    createElement(tagName: string): NSVElement {
        // if (tagName.indexOf(".") >= 0) {
        //     let bits = tagName.split(".", 2);
        //     return this.createPropertyNode(bits[0], bits[1]);
        // }
        // return nodeOps.createElement(tagName) as NSVElement;

        let ele: NSVElement;
        switch (tagName) {
            case "template":
                ele = new TemplateElement();
                break;
            case "style":
                ele = new StyleElement();
                break;
            case "head":
                ele = new HeadElement();
                break;
            case "document":
                ele = new SvelteNodeGUIDocument();
                break;
            case "window":
                ele = new NSVElement(tagName);
                this._windows.add(ele as NSVElement<RNWindow>);
                // console.log(`[SvelteNodeGUIDocument] added window ${(ele)}. Will set stylesheet on it: \`${this.head.getStyleSheet()}\``);
                (ele.nativeView as RNWindow).setStyleSheet(this.head.getStyleSheet());
                break;
            case "fragment":
            default: {
                ele = new NSVElement(tagName);
            }
        }
        if(tagName !== "document"){
            ele.ownerDocument = this;
        }
        return ele;
    }

    createElementNS(namespace: string, tagName: string): NSVElement {
        return this.createElement(tagName)
    }

    createTextNode(data: string): NSVText {
        // console.log(`[SvelteNodeGUIDocument] createTextNode("${data}")`);
        return new NSVText(data);
    }

    getElementById(id: string): NSVElement|null {
        for(let el of elementIterator(this)){
            // console.log(`getElementById iterating over element <${(el as NSVElement).tagName ?? "node"}> ${(el as NSVElement).id}`);
            if(el.nodeType === NSVNodeTypes.ELEMENT && (el as NSVElement).id === id){
                return el as NSVElement;
            }
        }
        return null;
    }

    dispatchEvent(event: any) {
        //Svelte dev fires these for tool support
    }

    addWindow(win: NSVElement<RNWindow>): void {
        this._windows.add(win);
    }
    /**
     * I'm not clear where would be a good place to call this.
     */
    deleteWindow(win: NSVElement<RNWindow>): void {
        this._windows.delete(win);
    }

    setStyleSheets(styleSheet: string): void {
        // console.log(`[SvelteNodeGUIDocument] setStyleSheets(\`${styleSheet}\`)`);

        this._windows.forEach(win => {
            // console.log(`[SvelteNodeGUIDocument] setStyleSheets on window ${win}`);
            win.nativeView.setStyleSheet(styleSheet);
        });
    }
}
