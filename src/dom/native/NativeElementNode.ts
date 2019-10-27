
import { logger as log, ViewNode } from '../basicdom'
import { isAndroid, isIOS } from 'tns-core-modules/ui/page';
import ElementNode from '../basicdom/ElementNode';

export enum NativeElementPropType {
    Value,
    Array,
    ObservableArray
}

export interface NativeElementPropConfig {
    [key: string]: NativeElementPropType
}


// Implements an ElementNode that wraps a NativeScript object. It uses the object as the source of truth for its attributes
export default class NativeElementNode<T> extends ElementNode {
    _nativeElement: T;
    propAttribute: string = null;
    propConfig: NativeElementPropConfig;

    constructor(tagName: string, elementClass: new () => T, propConfig: NativeElementPropConfig = {}) {
        super(tagName);
        this.propConfig = propConfig
        this._nativeElement = new elementClass();
        (this._nativeElement as any).__SvelteNativeElement__ = this;
        log.debug(`created ${this} ${this._nativeElement}`)
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

            // try to fix case
            let lowerkey = key.toLowerCase();
            if (resolvedKeys.length == 0) {
                for (let realKey in this.propConfig) {
                    if (lowerkey == realKey.toLowerCase()) {
                        key = realKey;
                        break;
                    }
                }
            }
            for (let realKey in getTarget) {
                if (lowerkey == realKey.toLowerCase()) {
                    key = realKey;
                    break;
                }
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
        this.setAttribute(propName, childNode);
    }

    onRemovedChild(childNode: ViewNode) {
        if (!(childNode instanceof NativeElementNode)) return;
        let propName = childNode.propAttribute;
        if (!propName) return;
        this.setAttribute(propName, null);
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

        if (fullkey.toLocaleLowerCase().startsWith("prop:")) {
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

            // try to fix case
            let lowerkey = key.toLowerCase();
            for (let realKey in setTarget) {
                if (lowerkey == realKey.toLowerCase()) {
                    key = realKey;
                    break;
                }
            }
            resolvedKeys.push(key)

            if (keypath.length > 0) {
                setTarget = setTarget[key];
            } else {
                try {
                    log.debug(`setAttr ${this} ${resolvedKeys.join(".")} ${value}`)
                    setTarget[key] = value
                } catch (e) {
                    // ignore but log
                    log.error(`set attribute threw an error, attr:${key} on ${this._tagName}: ${e.message}`)
                }
            }
        }
    }
}


