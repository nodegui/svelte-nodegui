import {
    getViewClass,
    getViewMeta,
    normalizeElementName,
    NSVViewMeta,
} from './registry'
import { ELEMENT_REF } from './runtimeHelpers';
// import { debug } from '../shared';
import { Component, NodeObject, NodeWidget, QObjectSignals, QWidgetSignals } from '@nodegui/nodegui'
import type { RNComponent } from "../../react-nodegui/src/components/config";
import { warn, error, log } from '../../shared/Logger';
import { EventWidget } from '@nodegui/nodegui/dist/lib/core/EventWidget';
import { QVariantType } from '@nodegui/nodegui/dist/lib/QtCore/QVariant';
import { RNWindow } from '../../react-nodegui/src/components/Window/RNWindow';
import SvelteNodeGUIDocument from '../../svelte/SvelteNodeGUIDocument';
// import { default as set } from "set-value";

// import unset from 'unset-value'

// import {isContentView, isLayout} from "./index";

declare var __DEV__: boolean
declare var __TEST__: boolean

export const enum NSVNodeTypes {
    TEXT = 'text',
    ELEMENT = 'element',
    COMMENT = 'comment',
    ROOT = 'root',
}

// View Flags indicate the kind of view the element is
// this avoids extra checks during runtime to determine
// the method to use for adding/removing child nodes
//
export const enum NSVViewFlags {
    NONE = 0,
    SKIP_ADD_TO_DOM = 1 << 0,
    /* NativeScript-specific. TODO: determine NodeGUI-specific ones. */
    // CONTENT_VIEW = 1 << 1,
    // LAYOUT_VIEW = 1 << 2,
    NO_CHILDREN = 1 << 3,
}

export interface INSVNode {
    /**
     * Used to give a hint to nodeOps about how this node should be appended into its parent.
     * Relevant for cases such as RadSideDrawer, which have 'mainContent' and 'drawerContent'.
     */
    nodeRole?: string
    nodeId: number
    nodeType: NSVNodeTypes
    text: string | undefined

    parentNode: INSVElement | null

    childNodes: INSVNode[]
    firstChild: INSVNode | null
    lastChild: INSVNode | null
    prevSibling: INSVNode | null
    nextSibling: INSVNode | null
}

type EventListener = (args: unknown) => void;

export function componentIsEventWidget<Signals extends {} = {}>(component: Component): component is EventWidget<Signals> {
    if(!component){
        return false;
    }
    if(typeof (component as EventWidget<Signals>).addEventListener === "function"){
        return true;
    }
    return false;
}

export function componentIsStyleable<Signals extends QWidgetSignals = QWidgetSignals>(component: Component): component is NodeWidget<Signals> {
    if(!component){
        return false;
    }
    if(typeof (component as NodeWidget<Signals>)._rawInlineStyle === "string"){
        return true;
    }
    return false;
}

export function componentHasPropertyAccessor<Signals extends QObjectSignals = QObjectSignals>(component: Component): component is NodeObject<Signals> {
    if(!component){
        return false;
    }
    if(typeof (component as NodeObject<Signals>).property === "function"){
        return true;
    }
    return false;
}

export function componentSupportsId<Signals extends QWidgetSignals = QWidgetSignals>(component: Component): component is NodeWidget<Signals> {
    if(typeof (component as NodeWidget<Signals>).setObjectName === "function"){
        return true;
    }
    return false;
}

export function* elementIterator(el: INSVNode): Iterable<INSVNode> {
    yield el;
    for (let child of el.childNodes) {
        yield* elementIterator(child)
    }
}

export type NativeView<T extends Component = Component> = T & RNComponent;

interface IStyleProxy {
    setProperty(propertyName: string, value: string, priority?: string): void;
    removeProperty(property: string): void;
    // animation: string;
    cssText: string;
}

export interface INSVElement<T extends NativeView = NativeView> extends INSVNode {
    /**
     * @default ""
     */
    id: string;
    tagName: string
    meta: NSVViewMeta<T>
    style: IStyleProxy

    eventListeners: Map<string, (args: unknown) => void>;

    addEventListener<Signals extends {}, SignalType extends keyof Signals>(
        event: SignalType,
        handler: Signals[SignalType],
        options?: AddEventListenerOptions
    ): void

    removeEventListener<Signals extends {}, SignalType extends keyof Signals>(event: SignalType, handler?: Signals[SignalType]): void

    dispatchEvent(event: string): void

    nativeView: T;

    getAttribute(name: string): unknown

    setAttribute(name: string, value: unknown): void

    removeAttribute(name: string): void

    insertBefore(el: INSVNode, anchor?: INSVNode | null): void

    appendChild(el: INSVNode): void

    removeChild(el: INSVNode): void
}

let nodeId = 0

export abstract class NSVNode implements INSVNode {
    protected constructor(nodeType: NSVNodeTypes) {
        this.nodeType = nodeType
        this.nodeId = nodeId++
    }

    nodeRole?: string
    nodeId: number
    nodeType: NSVNodeTypes
    get textContent(): string {
        return this.text;
    }
    set textContent(value: string) {
        this.text = value;
    }
    abstract text: string | undefined

    parentNode: INSVElement<any> | null = null
    childNodes: INSVNode[] = []

    nextSibling: INSVNode | null = null
    prevSibling: INSVNode | null = null

    get firstChild() {
        return this.childNodes.length ? this.childNodes[0] : null
    }

    get lastChild() {
        return this.childNodes.length
            ? this.childNodes[this.childNodes.length - 1]
            : null
    }

    toString(): string {
        return this.toString();
    }
}

export class NSVElement<T extends NativeView = NativeView> extends NSVNode implements INSVElement<T> {
    private readonly _tagName: string
    private readonly _nativeView: T;
    private _meta: NSVViewMeta<T> | undefined
    private readonly recycledNewProps: Record<string, any> = {};
    private readonly recycledOldProps: Record<string, any> = {};
    private readonly propsSetter: Record<string, (value: any) => void> = {};
    public ownerDocument: SvelteNodeGUIDocument|null = null;

    constructor(tagName: string){
        super(NSVNodeTypes.ELEMENT);

        this._tagName = normalizeElementName(tagName);

        const viewClass = getViewClass(tagName);
        if(viewClass){
            // this._nativeView = new viewClass();
            this._nativeView = viewClass; // We're now calling new in the resolver itself

            // console.log(`!! [${tagName}] nativeView was instantiated!`, this._nativeView);
            (this._nativeView as any)[ELEMENT_REF] = this;
        }
    }

    get tagName(): string {
        return this._tagName
    }

    get nativeView() {
        return this._nativeView
    }

    private readonly stylesMap = new Map<string, string|number>();

    get id(): string {
        if(componentSupportsId(this.nativeView)){
            return this.nativeView.objectName();
        } else {
            console.warn(`<${this._tagName}> is a virtual element (i.e. has no corresponding Qt Widget) and so the attribute "id" cannot be accessed.`);
            return "";
        }
    }

    set id(value: string){
        if(componentSupportsId(this.nativeView)){
            this.nativeView.setObjectName(value);
        } else {
            console.warn(`<${this._tagName}> is a virtual element (i.e. has no corresponding Qt Widget) and so the attribute "id" cannot be set on it.`);
        }
    }

    /* istanbul ignore next */
    setStyle(property: string, value: string | number | null, priority: "important"|""): void {
        // console.log(`[NSVElement] this.setStyle("${property}", "${value}")`);
        // log.debug(() => `setStyle ${this} ${property} ${value}`)

        if(!(value = value.toString().trim()).length){
            return;
        }

        if(!componentIsStyleable(this.nativeView)){
            return;
        }

        const currentValue = this.stylesMap.get(property);
        if(currentValue === value || typeof value === "undefined"){
            return;
        }

        if(value === null){
            this.stylesMap.delete(property);
        }

        this.stylesMap.set(property, `${value}${priority ? " !important" : ""}`);

        /* NodeGUI doesn't seem to give property-by-property access into the styles, so for now, we'll just inefficiently rewrite the whole inline style upon any update. */
        let updatedRawInlineStyle: string = "";
        let i = 0;
        for (const [property, value] of this.stylesMap) {
            updatedRawInlineStyle += `${i > 0 ? "\n" : ""}${property}:${value};`;
            i++;
        }
        // console.log(`[NSVElement.setStyle] this.nativeView.setInlineStyle("${updatedRawInlineStyle}");`);
        this.nativeView.setInlineStyle(updatedRawInlineStyle);

        // const rawInlineStyle: string = this.nativeView._rawInlineStyle;
        // const styleDeclarations: string[] = rawInlineStyle.trim().split(";").map(styleDeclaration => styleDeclaration.trim());
        // const styleMaps: [property: string, value: string][] = styleDeclarations.map((styleDeclaration) => styleDeclaration.split(":", 2) as [string, string]);
        // const stylesMap: Map<string, string> = new Map();
        // styleMaps.forEach(([property, value]) => {
        //     stylesMap.set(property, value);
        // });
        // stylesMap.set(property, value);
        // const updatedRawInlineStyle: string = styleMaps.reduce((acc: string, [property, value]) => `${acc}\n${property}:${value};`, "").slice("\n".length);
        // this.nativeView.setInlineStyle(updatedRawInlineStyle);
    }
    
    /**
     * Accessed by Svelte's set_style() function.
     * Expected to return an object that provides setters for each style.
     * @example node.style.setProperty(key, value, important ? 'important' : '');
     */
    public readonly style = {
        setProperty: (propertyName: string, value: string, priority: "important"|"") => {
            // console.log(`[NSVElement] style.setProperty("${propertyName}", "${value}${priority ? " important" : ""}")`);
            this.setStyle(propertyName, value, priority);
        },

        removeProperty: (propertyName: string) => {
            // console.log(`[NSVElement] style.removeProperty("${propertyName}")`);
            this.setStyle(propertyName, null, "");
        },

        get animation(): string {
            console.warn(`[NSVElement] Animation support not yet implemented.`);
            // return [...animations.keys()].join(", ")
            return "";
        },

        set animation(value: string) {
            console.warn(`[NSVElement] Animation support not yet implemented.`);
            // log.debug(() => `setting animation ${value}`)
            // let new_animations = value.trim() == "" ? [] : value.split(',').map(a => a.trim());
            // //add new ones
            // for (let anim of new_animations) {
            //     if (!animations.has(anim)) {
            //         addAnimation(anim);
            //     }
            // }
            // //remove old ones
            // for (let anim of animations.keys()) {
            //     if (new_animations.indexOf(anim) < 0) {
            //         removeAnimation(anim);
            //     }
            // }
        },

        get cssText(): string {
            console.warn(`[NSVElement.getCssText] (not yet implemented)`);
            return "";
            // log.debug(() => "got css text");
            // return getStyleAttribute();
        },

        set cssText(value: string) {
            console.warn(`[NSVElement.setCssText] (not yet implemented)`);
            // log.debug(() => "set css text");
            // setStyleAttribute(value);
        }
    }

    get text(): string | undefined {
        if(componentHasPropertyAccessor(this.nativeView)){
            return this.nativeView.property("text").toString();
        }
        error(`text() getter called on element that does not implement it.`, this);
    }

    /**
     * I'm not sure we actually need this setter; keeping its implementation and renaming it to textContent is probably in order.
     */
    set text(t: string | undefined) {
        if(componentHasPropertyAccessor(this.nativeView)){
            this.nativeView.setProperty("text", t);
            return;
        }
        error(`text() setter called on element that does not implement it.`, this);
    }

    get meta(): NSVViewMeta<T> {
        if (this._meta) {
            return this._meta
        }

        return (this._meta = getViewMeta(this.tagName))
    }

    /**
     * We keep references to the event listeners so that the Svelte NodeGUI HostConfig can remove any attached event listener if it needs to replace it.
     */
    private _eventListeners?: Map<string, any>;

    get eventListeners() {
        if(!this._eventListeners){
            this._eventListeners = new Map();
        }
        return this._eventListeners!;
    }

    addEventListener<Signals extends {}, SignalType extends keyof Signals>(
        event: SignalType,
        handler: Signals[SignalType],
        options: AddEventListenerOptions = {}
    ) {
        if(!componentIsEventWidget<Signals>(this.nativeView)){
            return;
        }

        // log(`add event listener ${this} ${event}`);

        const { capture, once } = options
        if (capture) {
            warn('Bubble propagation is not supported')
            return
        }
        if (once) {
            const oldHandler = handler
            const self = this
            handler = ((...args: any) => {
                const res = (oldHandler as unknown as EventListener).call(null, ...args)
                if (res !== null) {
                    self.removeEventListener(event, handler)
                }
            }) as unknown as Signals[SignalType]
        }

        //svelte compatibility wrapper
        (handler as any).__wrapper = (handler as any).__wrapper || ((args: unknown) => {
            /* I don't see any evidence that Qt events include the event name, so not sure what to do here. */
            (args as any).type = event;
            (handler as unknown as EventListener)(args)
        });

        this.nativeView.addEventListener<SignalType>(event, handler)
        this.eventListeners.set(event as string, handler);
    }

    removeEventListener<Signals extends {}, SignalType extends keyof Signals>(event: SignalType, handler?: Signals[SignalType]) {
        if(!componentIsEventWidget<Signals>(this.nativeView)){
            return;
        }

        this.eventListeners.delete(event as string);
        this.nativeView.removeEventListener(event, handler)
    }

    dispatchEvent(event: string) {
        if (this.nativeView) {
            /**
             * I don't see that NodeGUI has implemented QCoreApplication::sendEvent, so I think we can only no-op here.
             * @see https://doc.qt.io/qt-5/eventsandfilters.html#sending-events
             * @see https://doc.qt.io/qt-5/qcoreapplication.html#sendEvent
             * 
             * I don't see any evidence that Qt events include the event name, so not sure whether to pass
             * on an event name (which was for NativeScript purposes anyway) at all here.
             */
            // this.nativeView.notify({ eventName: event, object: this.nativeView })
        }
    }

    getAttribute(name: string): unknown {
        if(!this.nativeView){
            return void 0;
        }

        if(componentHasPropertyAccessor(this.nativeView)){
            /**
             * @see https://doc.qt.io/archives/qt-5.8/qobject.html#property
             */
            return this.nativeView.property(name);
        }

        return (this.nativeView as any)[name];
    }

    private static readonly recycledOldProps: Record<string, any> = Object.freeze({});

    setAttribute(name: string, value: unknown) {
        /*
         * A note to myself after following this rabbit hole several times before:
         * Users may intuitively try to set the "text" property on an element such as <text>, simply because
         * it's a likely property name to expect, and because it appears to be corroborated by Intellisense,
         * due to our default of typing any unrecognised JSX key as a string value.
         * 
         * In fact, RNText doesn't implement a text property in its setProps() method, so it (correctly) no-ops.
         * To set text, we expect users to write it as:
         * 
         * <text>hello</text>
         * 
         * ... This creates an NSVText node with the text "hello", which Svelte reads using the .data accessor.
         */

        ["style",
        "styleSheet", // TODO: implement
        "class",
        "className"].forEach(n => {
            if(name.startsWith(n)){
                // console.log(`[NSVElement.setAttribute("${name}", "${value}")]`);
            }
        })

        if(name === "style"){
            /*
             * e.g. <view style={`align-items: center; justify-content: center; height: 100%;`}>
             * c.f. <view style="align-items: center; justify-content: center; height: 100%;">
             * 
             * We have three options here. We can either:
             * 1) Parse the AST and set the styles one-by-one (neat, but inefficient), or;
             * 2) Serialise this.stylesMap and merge it with this incoming value.
             * 3) Clear this.stylesMap and replace _rawInlineStyle with this incoming value.
             * 
             * The easiest to do is number 3..!
             */
            this.stylesMap.clear();
            if(componentIsStyleable(this._nativeView)){
                // console.log(`[NSVElement.setAttribute("${name}", value)] – Setting _rawInlineStyle!`);
                this._nativeView.setInlineStyle(value as string);
            }
              
            return;            
        }

        if(name === "stylesheet"){
            console.warn(`[NSVElement.setAttribute("${name}", value)] – TODO: implement stylesheet.`);
            return;
        }

        if(name === "nodeRole" && typeof value === "string"){
            this.nodeRole = value;
            return;
        }

        if(name === "id"){
            // console.log(`[NSVElement.setAttribute("${name}", "${value}")]`);
            /**
             * setProps would also do the trick, but we want our wrapping element to set the very
             * same id on itself, too.
             */
            this.id = value as string;
            return;
        }

        if(name === "class"){
            // console.log(`[NSVElement.setAttribute("${name}", "${value}")] on <${this.tagName}>`);
            /**
             * The "class" property isn't handled by setProps for some reason.
             * It's probably special-cased by the React Host Config.
             */
            if(componentHasPropertyAccessor(this.nativeView)){
                /**
                 * @see https://doc.qt.io/archives/qt-5.8/qobject.html#property
                 */
                this.nativeView.setProperty(name, value as string);
                return;
            }
        }

        // /**
        //  * The 'ios' and 'android' properties (e.g. on ActionItem)
        //  * are readonly, so we need to assign one level lower.
        //  */
        // if(name === "ios" && value){
        //     Object.keys(value).forEach((key: string) => {
        //         set(this.nativeView.ios, key, value);
        //     });
        //     return;
        // }

        // if(name === "android" && value){
        //     Object.keys(value).forEach((key: string) => {
        //         set(this.nativeView.android, key, value);
        //     });
        //     return;
        // }

        // set(this.nativeView, name, value)

        if(!this.nativeView){
            return;
        }

        /**
         * React NodeGUI's API for setting props expects an object of props.
         * We only set props one-at-a-time, so we'll avoid reallocations by re-using and cleaning up the same static object.
         */
        this.recycledNewProps[name] = value;
        this.nativeView.setProps(this.recycledNewProps, this.recycledOldProps);
        delete this.recycledNewProps[name];
        /**
         * No way to tell whether a setter existed for the given attribute name, unfortunately.
         * So we can't fall back to this.nativeView.setProperty() (though arguably that would be dangerous anyway).
         */
    }

    removeAttribute(name: string) {
        if(name === "nodeRole"){
            this.nodeRole = void 0;
            return;
        }

        // potential issue: unsetValue is an empty object
        // not all properties/attributes may know/check for this
        // set(this.nativeView, name, unsetValue)

        // originally we deleted the property, but in case of built-in properties
        // this would break them. For example, deleting the padding property
        // will prevent us from changing the padding once we deleted it
        // that's not the expected behaviour.
        // unset(this.nativeView, name)

        console.warn(
            `[NSVElement.removeAttribute] React NodeGUI hasn't implemented removeAttribute, so it's unclear how to implement ` +
            `removeAttribute() in Svelte NodeGUI. You may want to try passing null or undefined instead of removing the attribute.`
        );
    }

    insertBefore(el: INSVNode, anchor?: INSVNode | null) {
        if (!anchor) {
            return this.appendChild(el)
        }

        const refIndex = this.childNodes.findIndex(
            (node) => node.nodeId === anchor.nodeId
        )

        if (refIndex === -1) {
            return this.appendChild(el)
        }

        if (el.parentNode) {
            el.parentNode.removeChild(el)
        }

        this.childNodes.splice(refIndex, 0, el)
        el.parentNode = this as INSVElement<any>

        // find index to use for the native view, since non-visual nodes
        // (comment/text don't exist in the native view hierarchy)
        // todo: potentially refactor based on my benchmark:
        // https://www.measurethat.net/Benchmarks/Show/7450/0/filter-findindex
        const trueIndex = this.childNodes
            .filter((node) => node.nodeType === NSVNodeTypes.ELEMENT)
            .findIndex((node) => node.nodeId === el.nodeId)

        this.addChild(el, anchor, trueIndex);
    }

    appendChild(el: INSVNode) {
        this.childNodes.push(el)
        el.parentNode = this as INSVElement<any>

        this.addChild(el)
    }

    removeChild(el: INSVNode) {
        const index = this.childNodes.findIndex((node) => node.nodeId === el.nodeId)

        if (index > -1) {
            this.childNodes.splice(index, 1)
            el.parentNode = null
            if (el.nodeType === NSVNodeTypes.ELEMENT) {
                removeChild(el as NSVElement, this) // Removing a child span takes us down here
            } else if (el.nodeType === NSVNodeTypes.TEXT) {
                this.text = this.getTextFromChildTextNodes();
            }
        }
    }

    // abstracted from appendChild, and insertBefore to avoid code duplication
    private addChild(el: INSVNode, anchor?: INSVNode | null, atIndex?: number): void {
        // console.log(`[addChild] ${this._tagName} > ${(el as any)._tagName}`);
        if (el.nodeType === NSVNodeTypes.ELEMENT) {
            addChild(el as NSVElement, this, anchor, atIndex)
        } else if (el.nodeType === NSVNodeTypes.TEXT) {
            this.text = this.getTextFromChildTextNodes();
        }
    }

    public getTextFromChildTextNodes(): string {
        return this.childNodes
            .filter((node) => node.nodeType === NSVNodeTypes.TEXT)
            .reduce((text: string, currentNode) => {
                return text + currentNode.text
            }, '');
    }

    toString(): string {
        return "NSVElement:" + this.nativeView.toString();
    }
}

export class NSVComment extends NSVNode {
    constructor(private _text: string) {
        super(NSVNodeTypes.COMMENT);
    }

    get text(): string | undefined {
        return this._text;
    }

    set text(t: string | undefined) {
        this._text = t;
    }

    toString(): string {
        return "NSVComment:" + `"` + this.text + `"`;
    }
}

/**
 * This is a text node. It's a virtual element (is non-visual), and serves only as a data structure.
 * Whenever its data changes, we tell its parentNode to update its "text" property.
 */
export class NSVText extends NSVNode {
    constructor(private _text: string){
        super(NSVNodeTypes.TEXT);
        // console.log(`[NSVText] constructor "${this._text}"`);
    }

    /**
     * The Svelte runtime calls this upon the text node.
     * @see set_data()
     */
    get wholeText(): string|undefined {
        return this.text;
    }

    set wholeText(val) {
        this.text = val;
    }

    /**
     * The Svelte runtime calls this upon the text node.
     * @see set_data()
     */
    get data(): string|undefined {
        return this.text;
    }
    set data(val) {
        // console.log(`[NSVText] Was asked to set "data" to`, val);
        this.text = val;
    }

    get text(): string | undefined {
        return this._text;
    }

    set text(t: string | undefined) {
        console.log(`NSVText text setter was called!`);
        this._text = t;
        // Tell any parent node to update its "text" property because this text node has just updated
        // its contents.
        if(this.parentNode && (this.parentNode as NSVElement).getTextFromChildTextNodes){
            this.parentNode.text = (this.parentNode as NSVElement).getTextFromChildTextNodes();
        }
    }

    toString(): string {
        return "NSVText:" + `"` + this.text + `"`;
    }
}

export class NSVRoot<T extends NativeView = NativeView> extends NSVNode {
    baseRef?: NSVElement<T>

    constructor() {
        super(NSVNodeTypes.ROOT)
    }

    get text(): string | undefined {
        error(`text() getter called on element that does not implement it.`, this);
        return void 0;
    }

    set text(t: string | undefined) {
        error(`text() setter called on element that does not implement it.`, this);
    }

    setBaseRef(el: INSVNode|null): void {
        // console.log(`NSVRoot->appendChild(${el.nodeType})`)
        if (el instanceof NSVElement) {
            this.baseRef = el
        }
        // no-op
    }

    toString(): string {
        if(this.baseRef){
            return "NSVRoot:" + this.baseRef.toString();
        } else {
            return "NSVRoot:" + "null";
        }
    }
}

function addChild(child: NSVElement, parent: NSVElement, anchor?: INSVNode | null, atIndex?: number) {
    if (__TEST__) return
    // console.log(
    //     `...addChild(    ${parent.tagName}(${parent.nodeId
    //     }) > ${child.tagName}(${child.nodeId}), ${atIndex}    )`
    // )
    
    if (child.meta.viewFlags & NSVViewFlags.SKIP_ADD_TO_DOM) {
        // debug('SKIP_ADD_TO_DOM')
        return
    }

    const parentView = parent.nativeView
    const childView = child.nativeView

    if (parent.meta.viewFlags & NSVViewFlags.NO_CHILDREN) {
        // debug('NO_CHILDREN')
        return
    }

    if(parent.meta.nodeOps?.insert){
        const defer: boolean = parent.meta.nodeOps.insert(child, parent, atIndex) === "defer";
        if(!defer){
            return;
        }
    }

    // const nodeRole: string|undefined = child.nodeRole;
    // if(nodeRole){
    //     return addChildByNodeRole(nodeRole, childView, parentView, atIndex);
    // }

    if(!parentView || !childView){
        // Virtual element, like head.
        return;
    }

    if(!anchor){
        parentView.appendChild(childView);
        return;
    }

    if((anchor as NSVElement<NativeView>).nativeView){
        parentView.insertBefore(childView, (anchor as NSVElement<NativeView>).nativeView);
        return;
    }

    // if (parent.meta.viewFlags & NSVViewFlags.LAYOUT_VIEW) {
    //     if (atIndex) {
    //         (parentView as LayoutBase).insertChild(childView as View, atIndex)
    //     } else {
    //         (parentView as LayoutBase).addChild(childView as View)
    //     }
    // } else if (parent.meta.viewFlags & NSVViewFlags.CONTENT_VIEW) {
    //     (parentView as ContentView).content = childView as View;
    // } else {
    //     (parentView as unknown as AddChildFromBuilder)._addChildFromBuilder(childView.constructor.name, childView)
    // }

    error(`addChild() called on an element that doesn't implement nodeOps.insert()`, (parent as any)._tagName);
}

function removeChild(child: NSVElement, parent: NSVElement) {
    if (__TEST__) return
    // debug(
    //     `...removeChild(    ${child.tagName}(${child.nodeId}), ${parent.tagName}(${
    //         parent.nodeId
    //     })    )`
    // )

    if (child.meta.viewFlags & NSVViewFlags.SKIP_ADD_TO_DOM) {
        // debug('SKIP_ADD_TO_DOM')
        return
    }
    if (parent.meta.viewFlags & NSVViewFlags.NO_CHILDREN) {
        // debug('NO_CHILDREN')
        return
    }
    
    if(parent.meta.nodeOps?.remove){
        const defer: boolean = parent.meta.nodeOps.remove(child, parent) === "defer";
        if(!defer){
            return;
        }
    }

    const parentView = parent.nativeView
    const childView = child.nativeView

    // const nodeRole: string|undefined = child.nodeRole;
    // if(nodeRole){
    //     return removeChildByNodeRole(nodeRole, childView, parentView);
    // }

    if(!parentView || !childView){
        // Virtual element, like head.
        return;
    }

    parentView.removeChild(childView);

    // if (parent.meta.viewFlags & NSVViewFlags.LAYOUT_VIEW) {
    //     (parentView as LayoutBase).removeChild(childView as View)
    // } else if (parent.meta.viewFlags & NSVViewFlags.CONTENT_VIEW) {
    //     (parentView as ContentView).content = null
    // } else {
    //     // Removing a child span takes us down here
    //     parentView._removeView(childView)
    // }

    error(`addChild() called on an element that doesn't implement nodeOps.remove()`, this);
}


function addChildByNodeRole(nodeRole: string, childView: any, parentView: any, atIndex?: number): void {
    const childrenSetter: any|undefined = parentView[nodeRole];
    if(typeof childrenSetter !== "undefined" && typeof childrenSetter.length !== "undefined"){
        // Treat as if it's an array.
        const childrenSetterLength: number = parentView[nodeRole].length;
        const atSafeIndex: number = typeof atIndex === "undefined" ? childrenSetterLength : atIndex;

        if(Array.isArray(childrenSetter)){
            parentView[nodeRole] = [...parentView[nodeRole]].splice(atSafeIndex, 0, childView);
        } else {
            if (__DEV__) {
                warn(
                    `parentView "${parentView.constructor.name}" had a value for nodeRole "${nodeRole}" ` +
                    `that had a "length" property yet did not conform to Array or ObservableArray. Cannot add child. ` +
                    `Please explicitly implement nodeOps.insert() for the parentView.`
                );
            }
        }
    } else {
        /*
         * Treat it as if it's simply a setter.
         * This assumes (quite fairly) that the plugin author is not delegating to us the responsibility
         * of initialising an array for childrenSetter.
        */
        parentView[nodeRole] = childView;
    }
}

function removeChildByNodeRole(nodeRole: string, childView: any, parentView: any): void {
    const childrenSetter = parentView[nodeRole];
    if(typeof childrenSetter !== "undefined" && typeof childrenSetter.indexOf === "function"){
        // Treat as if it's an array.
        const childIndex: number = parentView[nodeRole].indexOf(childView);

        if(Array.isArray(childrenSetter)){
            parentView[nodeRole] = [...parentView[nodeRole]].splice(childIndex, 1);
        } else {
            if (__DEV__) {
                warn(
                    `parentView "${parentView.constructor.name}" had a value for nodeRole "${nodeRole}" ` +
                    `that had an "indexOf" property yet did not conform to Array or ObservableArray. Cannot add childView "${childView.constructor.name}". ` +
                    `Please explicitly implement nodeOps.remove() for the parentView.`
                );
            }
        }
    } else {
        /*
        * Treat it as if it's simply a setter.
        * We can't use unsetValue here, because the childrenSetter is not necessarily a Property (which indeed is the case for FormattedString.spans).
        * TODO: If there's a way to determine whether the childrenSetter is a Property, I'd be very happy to run that first check and use unsetValue.
         */
        const defaultValueForChildrenSetter: unknown = parentView.__proto__[nodeRole];
        try {
            parentView[nodeRole] = defaultValueForChildrenSetter;
        } catch(e){
            if (__DEV__) {
                warn(
                    `parentView "${parentView.constructor.name}" failed to remove childView "${childView.constructor.name}", given nodeRole "${nodeRole}" ` +
                    `Please explicitly implement nodeOps.remove() for the parentView.`
                );
            }
        }
    }
}