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
// import { default as set } from "set-value";

// import unset from 'unset-value'

// import {isContentView, isLayout} from "./index";

declare var __DEV__: boolean
declare var __TEST__: boolean

export const enum NSVNodeTypes {
    HEAD = 'head',
    STYLE = 'style',
    FRAGMENT = 'fragment',
    TEMPLATE = 'template',
    DOCUMENT = 'document',
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

// export function componentIsNodeWidget<Signals extends QWidgetSignals = QWidgetSignals>(component: Component): component is NodeWidget<Signals> {
//     if(typeof (component as NodeWidget<Signals>).actions === "object"){
//         return true;
//     }
// }

export type NativeView<T extends Component = Component> = T & RNComponent;

export interface INSVElement<T extends NativeView = NativeView> extends INSVNode {
    tagName: string
    meta: NSVViewMeta<T>
    style: string

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
    private readonly recycledOldProps: Record<string, any> = {};
    private readonly propsSetter: Record<string, (value: any) => void> = {};

    constructor(tagName: string){
        super(NSVNodeTypes.ELEMENT);

        this._tagName = normalizeElementName(tagName);

        console.log(`Constructing tagName ${tagName}`);
        const viewClass = getViewClass(tagName);
        if(viewClass){
            console.log(`Got viewClass`, viewClass);
            // this._nativeView = new viewClass();
            this._nativeView = viewClass; // We're now calling new in the resolver itself

            console.log(`Got this._nativeView`, this._nativeView);

            // console.log(`!! [${tagName}] nativeView was instantiated!`, this._nativeView);
            (this._nativeView as any)[ELEMENT_REF] = this;

            // This is a hack to extract the props setter from React NodeGUI (as it's not an exposed API).
            this._nativeView.setProps(this.propsSetter, this.recycledOldProps);
        }
    }

    get tagName(): string {
        return this._tagName
    }

    get nativeView() {
        return this._nativeView
    }

    get style(): string {
        if(componentIsStyleable(this.nativeView)){
            return this.nativeView._rawInlineStyle;
        }
        return "";
    }

    set style(inlineStyle: string) {
        if (componentIsStyleable(this.nativeView)){
            this.nativeView._rawInlineStyle = inlineStyle;
        }
    }

    get text(): string | undefined {
        if (typeof (this.nativeView as any).text === "function"){
            return (this.nativeView as any).text() as string;
        }
        error(`text() getter called on element that does not implement it.`, this);
    }

    set text(t: string | undefined) {
        console.log(`!! TEXT BEING SET: ${t}`);
        if (typeof (this.nativeView as any).text === "function") {
            (this.nativeView as any).text(t);
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
     * We keep references to the event listeners so that the Svelte Desktop HostConfig can remove any attached event listener if it needs to replace it.
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
        if(name === "nodeRole" && typeof value === "string"){
            this.nodeRole = value;
            return;
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
        const descriptor = Object.getOwnPropertyDescriptor(this.propsSetter, name);
        if(descriptor && typeof descriptor.set === "function"){
            // This prop is supported by setProps.
            this.recycledOldProps[name] = value;
            this.nativeView.setProps(this.propsSetter, this.recycledOldProps);
            delete this.recycledOldProps[name];
            return;
        }

        if(componentHasPropertyAccessor(this.nativeView)){
            /**
             * @see https://doc.qt.io/archives/qt-5.8/qobject.html#property
             */
            this.nativeView.setProperty(name, value as QVariantType);
            return;
        }

        (this.nativeView as any)[name] = value;
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
            `removeAttribute(). You may want to try passing null or undefined instead of removing the attribute.`
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
                this.updateText()
            }
        }
    }

    // abstracted from appendChild, and insertBefore to avoid code duplication
    private addChild(el: INSVNode, anchor?: INSVNode | null, atIndex?: number): void {
        console.log(`[addChild] ${this._tagName} > ${(el as any)._tagName}`);
        if (el.nodeType === NSVNodeTypes.ELEMENT) {
            addChild(el as NSVElement, this, anchor, atIndex)
        } else if (el.nodeType === NSVNodeTypes.TEXT) {
            this.updateText()
        }
    }

    updateText() {
        this.setAttribute(
            'text',
            this.childNodes
                .filter((node) => node.nodeType === NSVNodeTypes.TEXT)
                .reduce((text: string, currentNode) => {
                    return text + currentNode.text
                }, '')
        )
    }

    toString(): string {
        return "NSVElement:" + this.nativeView.toString();
    }
}

export class NSVComment extends NSVNode {
    constructor(text: string) {
        super(NSVNodeTypes.COMMENT)

        this.text = text
    }

    get text(): string | undefined {
        return this.text;
    }

    set text(t: string | undefined) {
        this.text = t;
    }

    toString(): string {
        return "NSVComment:" + `"` + this.text + `"`;
    }
}

export class NSVText extends NSVNode {
    constructor(text: string) {
        console.log(`[NSVText] constructor "${text}"`);
        super(NSVNodeTypes.TEXT)

        this.text = text
    }

    get text(): string | undefined {
        return this.text;
    }

    set text(t: string | undefined) {
        this.text = t;
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
    console.log(
        `...addChild(    ${parent.tagName}(${parent.nodeId
        }) > ${child.tagName}(${child.nodeId}), ${atIndex}    )`
    )
    
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

    // if (parent.meta.nodeOps?.insert) {
    //     return parent.meta.nodeOps.insert(child, parent, atIndex)
    // }

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
    
    // if (parent.meta.nodeOps) {
    //     return parent.meta.nodeOps.remove(child, parent)
    // }

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