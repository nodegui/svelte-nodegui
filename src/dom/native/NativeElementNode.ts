
import { logger as log } from '../basicdom'
import { isAndroid, isIOS } from 'tns-core-modules/ui/page';
import ElementNode from '../basicdom/ElementNode';

// Implements an ElementNode that wraps a NativeScript object. It uses the object as the source of truth for its attributes
export default class NativeElementNode<T> extends ElementNode {
    _nativeElement: T;

    constructor(tagName: string, elementClass: new () => T) {
        super(tagName);
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


