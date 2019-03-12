import { registerSvelteElements } from './svelte-elements'
import { registerNativeElements } from './nativescript-elements'
import SvelteNativeDocument from './svelte/SvelteNativeDocument'
import NativeElementNode from './native/NativeElementNode'

export { default as FrameElement } from "./native/FrameElement"
export { default as SvelteNativeDocument } from './svelte/SvelteNativeDocument'
export { default as NativeElementNode } from './native/NativeElementNode'
export { registerElement, createElement, ViewNode } from './basicdom'
export { navigate, goBack, showModal, closeModal, ShowModalOptions, NavigationOptions, BackNavigationOptions } from './navigation'


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