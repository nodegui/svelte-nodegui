import { registerSvelteElements } from './SvelteElements'
import { registerNativeElements } from './NativescriptElements'
import SvelteNativeDocument from './SvelteNativeDocument'
import NativeElementNode from './NativeElementNode'
export { default as FrameElement } from "./FrameElement"
export { default as SvelteNativeDocument } from './SvelteNativeDocument'
export { default as NativeElementNode } from './NativeElementNode'
export { registerCustomElementNode, createElement, ViewNode } from './basicdom'
export { navigate, goBack, NavigationOptions, BackNavigationOptions } from './navigation'


function installGlobalShims(): SvelteNativeDocument {

    //expose our fake dom as global document for svelte components
    let window = global as any;

    window.window = global;
    window.document = new SvelteNativeDocument();

    window.requestAnimationFrame = (action: () => {}) => {
        setTimeout(action, 33); //about 30 fps
    }

    window.getComputedStyle = (node: NativeElementNode) => {
        return node.nativeView.style;
    }

    window.performance = {
        now() {
            return Date.now();
        }
    };

    window.CustomEvent = class {
        detail: any;
        eventName: string;
        type: string;
        constructor(name: string, detail: any = null) {
            this.eventName = name; //event name for nativescript
            this.type = name; // type for svelte
            this.detail = detail;
        }
    }

    return window.document;
}

export function initializeDom() {
    registerSvelteElements();
    registerNativeElements();
    return installGlobalShims();
}