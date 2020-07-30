
import { logger as log, ViewNode, registerElement } from '../basicdom'
import { isAndroid, isIOS } from '@nativescript/core';
import ElementNode from '../basicdom/ElementNode';
import { ObservableArray } from '@nativescript/core/data/observable-array';

export enum NativeElementPropType {
    Value,
    Array,
    ObservableArray
}

export interface NativeElementPropConfig {
    [key: string]: NativeElementPropType
}

function setOnArrayProp(parent: any, value: any, propName: string, build: (value: any) => any = null) {
    let current = parent[propName];
    if (!current || !current.push) {
        parent[propName] = build ? build(value) : [value];
    } else {
        if (current instanceof ObservableArray) {
            current.push(value)
        } else {
            parent[propName] = [...current, value];
        }
    }
}

function removeFromArrayProp(parent: any, value: any, propName: string) {
    let current = parent[propName];
    if (!current || !current.splice) {
        let idx = current.indexOf(value);
        if (idx >= 0) current.splice(idx, 1);
    }
}

const _normalizedKeys: Map<any, Map<string, string>> = new Map();

function getNormalizedKeysForObject(obj: any, knownPropNames: string[]): Map<string, string> {
    let proto = Object.getPrototypeOf(obj);
    let m = _normalizedKeys.get(proto);
    if (m) return m;

    //calculate our prop names
    let props = new Map<string, string>();
    _normalizedKeys.set(proto, props);

    //include known props
    knownPropNames.forEach(p => props.set(p.toLowerCase(), p));

    //infer the rest from the passed object (including updating any incorrect known prop names if found)
    for (let p in obj) {
        if (!p.startsWith('_') && !p.startsWith('css:') && p.indexOf('-') === -1) {
            props.set(p.toLowerCase(), p)
        }
    }
    // in esm we need to also check styles properties (to get recursive props)
    for (let p in (obj.style)) {
        if (!p.startsWith('_') && !p.startsWith('css:') && p.indexOf('-') === -1) {
            props.set(p.toLowerCase(), p)
        }
    }

    return props;
}

function normalizeKeyFromObject(obj: any, key: string) {
    let lowerkey = key.toLowerCase();
    for (let p in obj) {
        if (p.toLowerCase() == lowerkey) {
            return p;
        }
    }
    return key;
}


// Implements an ElementNode that wraps a NativeScript object. It uses the object as the source of truth for its attributes
export default class NativeElementNode<T> extends ElementNode {
    _nativeElement: T;
    propAttribute: string = null;
    propConfig: NativeElementPropConfig;
    _normalizedKeys: Map<string, string>;

    constructor(tagName: string, elementClass: new () => T, setsParentProp: string = null, propConfig: NativeElementPropConfig = {}) {
        super(tagName);
        this.propConfig = propConfig
        this.propAttribute = setsParentProp
        this._nativeElement = new elementClass();
        this._normalizedKeys = getNormalizedKeysForObject(this._nativeElement, Object.keys(this.propConfig));

        (this._nativeElement as any).__SvelteNativeElement__ = this;
        log.debug(() => `created ${this} ${this._nativeElement}`)
    }

    get nativeElement() {
        return this._nativeElement
    }

    set nativeElement(el) {
        if (this._nativeElement) {
            throw new Error(`Can't overwrite native element.`)
        }

        this._nativeElement = el
    }

    getAttribute(fullkey: string) {
        let getTarget = this.nativeElement as any;

        let keypath = fullkey.split(".");
        let resolvedKeys: string[] = [];

        while (keypath.length > 0) {
            if (!getTarget) return null;

            let key = keypath.shift();

            if (resolvedKeys.length == 0) {
                key = this._normalizedKeys.get(key) || key
            } else {
                key = normalizeKeyFromObject(getTarget, key)
            }

            resolvedKeys.push(key)

            if (keypath.length > 0) {
                getTarget = getTarget[key];
            } else {
                return getTarget[key];
            }
        }

        return null;
    }

    onInsertedChild(childNode: ViewNode, index: number) {
        super.onInsertedChild(childNode, index);
        // support for the prop: shorthand for setting parent property to native element
        if (!(childNode instanceof NativeElementNode)) return;
        let propName = childNode.propAttribute;
        if (!propName) return;

        //Special case Array and Observable Array keys
        propName = this._normalizedKeys.get(propName) || propName
        switch (this.propConfig[propName]) {
            case NativeElementPropType.Array:
                setOnArrayProp(this.nativeElement, childNode.nativeElement, propName)
                return;
            case NativeElementPropType.ObservableArray:
                setOnArrayProp(this.nativeElement, childNode.nativeElement, propName, (v) => new ObservableArray(v))
                return;
            default:
                this.setAttribute(propName, childNode);
        }
    }

    onRemovedChild(childNode: ViewNode) {
        if (!(childNode instanceof NativeElementNode)) return;
        let propName = childNode.propAttribute;
        if (!propName) return;
        //Special case Array and Observable Array keys
        propName = this._normalizedKeys.get(propName) || propName

        switch (this.propConfig[propName]) {
            case NativeElementPropType.Array:
            case NativeElementPropType.ObservableArray:
                removeFromArrayProp(this.nativeElement, childNode, propName)
                return;
            default:
                this.setAttribute(propName, null);
        }

        super.onRemovedChild(childNode)
    }

    setAttribute(fullkey: string, value: any) {
        const nv = this.nativeElement as any
        let setTarget = nv;

        // normalize key
        if (isAndroid && fullkey.startsWith('android:')) {
            fullkey = fullkey.substr(8);
        }
        if (isIOS && fullkey.startsWith('ios:')) {
            fullkey = fullkey.substr(4);
        }

        if (fullkey.startsWith("prop:")) {
            this.propAttribute = fullkey.substr(5);
            return;
        }

        //we might be getting an element from a propertyNode eg page.actionBar, unwrap
        if (value instanceof NativeElementNode) {
            value = value.nativeElement
        }

        let keypath = fullkey.split(".");
        let resolvedKeys: string[] = [];

        while (keypath.length > 0) {
            if (!setTarget) return;
            let key = keypath.shift();

            // normalize to correct case
            if (resolvedKeys.length == 0) {
                key = this._normalizedKeys.get(key) || key
            } else {
                key = normalizeKeyFromObject(setTarget, key)
            }

            resolvedKeys.push(key)

            if (keypath.length > 0) {
                setTarget = setTarget[key];
            } else {
                try {
                    log.debug(() => `setAttr value ${this} ${resolvedKeys.join(".")} ${value}`)
                    setTarget[key] = value
                } catch (e) {
                    // ignore but log
                    log.error(() => `set attribute threw an error, attr:${key} on ${this._tagName}: ${e.message}`)
                }
            }
        }
    }
}


export function registerNativeConfigElement<T>(elementName: string, resolver: () => new () => T, parentProp: string = null, propConfig: NativeElementPropConfig = {}) {
    registerElement(elementName, () => new NativeElementNode(elementName, resolver(), parentProp, propConfig));
}
