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

export function* elementIterator(el: NSVNode): Iterable<NSVNode> {
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

let nodeId: number = 0

export abstract class NSVNode {
    protected constructor(nodeType: NSVNodeTypes) {
        this.nodeType = nodeType
        this.nodeId = nodeId++
    }

    nodeRole?: string
    nodeId: number
    nodeType: NSVNodeTypes
	get textContent(): string|null {
		if(this.nodeType === NSVNodeTypes.TEXT){
			return (this as NSVNode as NSVText).data;
		}
		if(this.nodeType === NSVNodeTypes.ELEMENT){
			return this.childNodes.map(childNode => childNode.textContent).join("");
		}
		return null;
	}
	set textContent(value: string){
		if(this.nodeType === NSVNodeTypes.TEXT){
			(this as NSVNode as NSVText).data = (value ?? "");
			return;
		}
		if(this.nodeType === NSVNodeTypes.ELEMENT){
			this.childNodes.forEach(c => (this as NSVNode as NSVElement).removeChild(c as NSVNode));
			(this as NSVNode as NSVElement).appendChild(new NSVText(value));
			return;
		}
	}

    parentNode: NSVNode | null = null
    parentElement: NSVElement | null = null
    childNodes: NSVNode[] = []

    nextSibling: NSVNode | null = null
    previousSibling: NSVNode | null = null

    get firstChild() {
        return this.childNodes.length ? this.childNodes[0] : null
    }

    get lastChild() {
        return this.childNodes.length
            ? this.childNodes[this.childNodes.length - 1]
            : null
    }

	appendChild(child: NSVNode): NSVNode {
        if(child === this || ![NSVNodeTypes.ELEMENT, NSVNodeTypes.ROOT].includes(this.nodeType)){
            throw new Error("HierarchyRequestError: The operation would yield an incorrect node tree.");
        }
        if(child instanceof NSVNode === false){
            throw new Error("TypeError: Argument 1 ('child') to Node.appendChild must be an instance of NSVNode");
        }
        if(child.parentNode === this){
            return child;
        }

		child.previousSibling = this.childNodes[this.childNodes.length - 1] ?? null;
		child.nextSibling = null;

        // If the child is already a child of this, remove it from our childNodes array before adding it to the end.
        if(child.parentNode === this){
            const childIndex = this.childNodes.findIndex(c => c === child);
            if(childIndex === -1){
                throw new Error("NotFoundError: the object can not be found here.");
            }
            this.childNodes.splice(childIndex, 0);
        }

        this.childNodes.push(child);
		child.parentNode = this as NSVNode;
		if(this.nodeType === NSVNodeTypes.ELEMENT){
			child.parentElement = this as NSVNode as NSVElement;

            if(child.nodeType === NSVNodeTypes.TEXT){
                (this as NSVNode as NSVElement).updateNativeText();
            }
		}
		return child;
	}
	insertBefore(newNode: NSVNode, referenceNode: NSVNode): NSVNode {
        if(newNode === this || ![NSVNodeTypes.ELEMENT, NSVNodeTypes.ROOT].includes(this.nodeType)){
            throw new Error("HierarchyRequestError: The operation would yield an incorrect node tree.");
        }
        if(newNode instanceof NSVNode === false){
            throw new Error("TypeError: Argument 1 ('newNode') to Node.insertBefore must be an instance of NSVNode");
        }

		// console.log(`[Node.insertBefore] ${newNode}, ${referenceNode}`);
		const referenceIndex = referenceNode == null ?
			-1 : 
			this.childNodes.findIndex(node => node === referenceNode);
		if(referenceIndex === -1){
			this.appendChild(newNode);
		} else {
			newNode.previousSibling = this.childNodes[referenceIndex - 1] ?? null;
			newNode.nextSibling = this.childNodes[referenceIndex];

            // If the child is already a child of this, remove it from our childNodes array before adding it to the end.
            if(newNode.parentNode === this){
                const newNodeIndex = this.childNodes.findIndex(c => c === newNode);
                if(newNodeIndex === -1){
                    throw new Error("NotFoundError: the object can not be found here.");
                }
                this.childNodes.splice(newNodeIndex, 0);
            }

			this.childNodes.splice(referenceIndex, 0, newNode);
			newNode.parentNode = this as NSVNode;
			if(this.nodeType === NSVNodeTypes.ELEMENT){
				newNode.parentElement = this as NSVNode as NSVElement;

                if(newNode.nodeType === NSVNodeTypes.TEXT){
                    (this as NSVNode as NSVElement).updateNativeText();
                }
			}
		}

		return newNode;
	}
	removeChild(child: NSVNode): NSVNode {
        if(child === this){
            throw new Error("HierarchyRequestError: The operation would yield an incorrect node tree.");
        }
        if(child instanceof NSVNode === false){
            throw new Error("TypeError: Argument 1 ('child') to Node.removeChild must be an instance of NSVNode");
        }

		const childIndex = this.childNodes.findIndex(c => c === child);
        if(childIndex === -1){
            throw new Error("NotFoundError: the object can not be found here.");
        }
		if(childIndex !== -1){
			child.previousSibling = null;
			child.nextSibling = null;
			this.childNodes.splice(childIndex, 1);
			child.parentNode = null;
			if(this.nodeType === NSVNodeTypes.ELEMENT){
				child.parentElement = null;

                if(child.nodeType === NSVNodeTypes.TEXT){
                    (this as NSVNode as NSVElement).updateNativeText();
                }
			}
		}

		return child;
	}
}

export class NSVElement<T extends NativeView = NativeView> extends NSVNode {
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

    updateNativeText(): void {
        if(componentHasPropertyAccessor(this.nativeView)){
            this.nativeView.setProperty("text", this.textContent);
            return;
        }
        error(`updateNativeText() called on element that does not implement it.`, this);
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

    removeChild(child: NSVNode): NSVNode {
        const node = super.removeChild(child);

        if (this.meta.viewFlags & NSVViewFlags.NO_CHILDREN) {
            // debug('NO_CHILDREN')
            return
        }

        if (this.meta?.viewFlags & NSVViewFlags.NO_CHILDREN) {
            // debug('NO_CHILDREN')
            return
        }

        if(child.nodeType === NSVNodeTypes.ELEMENT){
            const childElement = child as NSVElement;

            if(this.nativeView){
                if(childElement.nativeView){
                    // console.log(`Successful native remove: ${this.toString()} X ${childElement.toString()}`);
                    this.nativeView.removeChild(childElement.nativeView);
                } else {
                    // console.warn(`No native child to remove: ${this.toString()} X ${childElement.toString()}`);
                }
            } else {
                // console.warn(`Skipping native remove: ${this.toString()} X ${childElement.toString()}`);
                // It's probably a virtual element like Head, Style, etc; there is no native view to remove from.
            }
        }

        return node;
    }

    appendChild(child: NSVNode): NSVNode {
        const node = super.appendChild(child);

        if(child.nodeType === NSVNodeTypes.ELEMENT){
            const childElement = child as NSVElement;

            if(this.meta?.nodeOps?.insert){
                const defer: boolean = this.meta.nodeOps.insert(childElement, this, -1) === "defer";
                if(!defer){
                    return node;
                }
            }

            if(this.nativeView){
                if(childElement.nativeView){
                    // console.log(`Successful native append: ${this.toString()} ＞ ${childElement.toString()}`);
                    this.nativeView.appendChild(childElement.nativeView);
                } else {
                    // console.warn(`No native child to append: ${this.toString()} ＞ ${childElement.toString()}`);
                }
            } else {
                // console.warn(`Skipping native append: ${this.toString()} ＞ ${childElement.toString()}`);
                // It's probably a virtual element like Head, Style, etc; there is no native view to append into.
            }
        }

        return node;
    }

    insertBefore(newNode: NSVNode, referenceNode?: NSVNode | null): NSVNode {
        const node = super.insertBefore(newNode, referenceNode);

        if(newNode.nodeType === NSVNodeTypes.ELEMENT){
            const newElement = newNode as NSVElement;

            const referenceIndex = referenceNode == null ?
                -1 : 
                this.childNodes.findIndex(node => node === referenceNode);

            if(this.meta?.nodeOps?.insert){
                const defer: boolean = this.meta.nodeOps.insert(newElement, this, referenceIndex) === "defer";
                if(!defer){
                    return node;
                }
            }

            if(this.nativeView){
                if(newElement.nativeView){
                    if(referenceNode){
                        if((referenceNode as NSVElement).nativeView){
                            // console.log(`Successful native insertBefore: ＞ ${newElement.toString()}, ${referenceNode.toString()}`);
                            this.nativeView.insertBefore(newElement.nativeView, (referenceNode as NSVElement).nativeView);
                        } else {
                            // We're at the mercy of the underlying React NodeGUI and NodeGUI implementations.

                            function findClosestNonVirtualPreviousElementSibling(node: NSVNode): NSVElement|null {
                                let haul: NSVElement|null = null;
                                while(node = node.previousSibling){
                                    if(node.nodeType === NSVNodeTypes.ELEMENT && (node as NSVElement).nativeView){
                                        haul = node as NSVElement;
                                        break;
                                    }
                                }

                                return haul;
                            }

                            const closest: NSVElement|null = findClosestNonVirtualPreviousElementSibling(referenceNode);
                            if(closest){
                                // console.warn(`No native referenceNode to insertBefore (was given ${referenceNode.toString()}), so will try inserting before the closest eligible previousSibling instead: ${this.toString()} ＞ ${newElement.toString()}, ${closest.toString()}`);
                                this.nativeView.insertBefore(newElement.nativeView, closest.nativeView);
                            } else {
                                // console.warn(`No native referenceNode to insertBefore (was given ${referenceNode.toString()}), and no eligible previousSiblings, so will try appendChild instead: ${this.toString()} ＞ ${newElement.toString()}`);
                                this.nativeView.appendChild(newElement.nativeView);
                            }
                        }
                    } else {
                        // console.warn(`No referenceNode to insertBefore, so will try appendChild instead: ${this.toString()} ＞ ${newElement.toString()}, ${referenceNode?.toString() ?? "NONE"}`);
                        this.nativeView.appendChild(newElement.nativeView);
                    }
                } else {
                    console.warn(`No native newNode to insertBefore: ${this.toString()} ＞ ${newElement.toString()}, ${referenceNode?.toString() ?? "NONE"}`);
                }
            } else {
                // It's probably a virtual element like Head, Style, etc; there is no native view to insert into.
            }
        }

        return node;
    }

    toString(): string {
        if(this.tagName === NSVNodeTypes.TEXT){
            const textContent = this.textContent;
            return `<${this.tagName}(${this.nodeId}) id="${this.id}">${textContent.slice(0, 15)}${textContent.length > 15 ? "..." : ""}</text>`;
        }
        return `<${this.tagName}(${this.nodeId}) id="${this.id}">`;
    }
}

export class NSVComment extends NSVNode {
    constructor(public data: string = "") {
        super(NSVNodeTypes.COMMENT);
    }

    toString(): string {
        return "NSVComment:" + `"` + this.data + `"`;
    }
}

/**
 * This is a text node. It's a virtual element (is non-visual), and serves only as a data structure.
 * Whenever its data changes, we tell its parentNode to update its "text" property.
 */
export class NSVText extends NSVNode {
    private _data: string;

    constructor(data: string = ""){
        super(NSVNodeTypes.TEXT);
        // console.log(`[NSVText] constructor "${this._text}"`);
        this.data = data;
    }

    get data(): string | undefined {
        return this._data;
    }

    set data(t: string | undefined) {
        // console.log(`NSVText text setter was called!`);
        this._data = t;
        // Tell any parent node to update its "text" property because this text node has just updated its contents.
        if(this.parentNode?.nodeType === NSVNodeTypes.ELEMENT){
            (this.parentNode as NSVElement).updateNativeText();
        }
    }

    /**
     * The Svelte runtime calls this upon the text node.
     * @see set_data()
     */
	get wholeText(): string|undefined {
        // console.log(`NSVText get wholeText was called!`);
		let _wholeText = "";
		if(this.previousSibling?.nodeType === NSVNodeTypes.TEXT){
			_wholeText += (this.previousSibling as NSVText).data;
		}
		if(this.nextSibling?.nodeType === NSVNodeTypes.TEXT){
			_wholeText += (this.nextSibling as NSVText).wholeText; // recurses
		} else {
			_wholeText += this.data;
		}
		// console.log(`get wholeText: ${_wholeText}`);
		return _wholeText;
	}
	replaceWholeText(wholeText: string): null | NSVText {
        console.log(`NSVText replaceWholeText was called!`);
		let recipient: NSVText = this;
		if(this.previousSibling?.nodeType === NSVNodeTypes.TEXT){
			recipient = this.previousSibling as NSVText;
		}
		
		let nextSibling: NSVNode = recipient;
		while(nextSibling = recipient.nextSibling){
			if(nextSibling.nodeType !== NSVNodeTypes.TEXT){
                break;
            }
			nextSibling.parentNode.removeChild(nextSibling);
		}
		recipient.data = wholeText;
		return wholeText === "" ? null : recipient;
	}

    toString(): string {
        const textContent = this.textContent;
        return `<#text(${this.nodeId})>${this.data.slice(0, 15)}${this.data.length > 15 ? "..." : ""}</#text>`;
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

    setBaseRef(el: NSVNode|null): void {
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
