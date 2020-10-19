import { registerSvelteElements } from './svelte-elements'
import { registerNativeElements } from './nativescript-vue-next/runtime';
import { NodeWidget, QWidgetSignals } from '@nodegui/nodegui'
// import { logger, LogLevel } from './basicdom'
export { log, warn, error } from "./shared";

export { default as HeadElement } from './svelte/HeadElement'
export { default as TemplateElement } from './svelte/TemplateElement'
import { default as SvelteDesktopDocument } from './svelte/SvelteDesktopDocument';
export { SvelteDesktopDocument };
export { default as StyleElement } from './svelte/StyleElement'

// export { registerElement, createElement, ViewNode, ElementNode, logger, LogLevel } from './basicdom'
import {
    NSVRoot,
    NSVElement,
    NSVNode,
    NSVComment,
    NSVText,
    NSVNodeTypes,
    NSVViewFlags,
} from "./nativescript-vue-next/runtime/nodes";


export { nodeOps, NSVNodeOps } from "./nativescript-vue-next/runtime";
export { NSVNodeTypes, NSVViewFlags, INSVNode, INSVElement, NSVNode, NSVElement, NSVComment, NSVText, NSVRoot } from "./nativescript-vue-next/runtime";
export {
    NSVElementResolver,
    NSVModelDescriptor,
    NSVViewMeta,
    NSVElementDescriptor,
    defaultViewMeta,
    getViewMeta,
    getViewClass,
    normalizeElementName,
    registerElement,
    isKnownView,
    registerNativeElements
} from "./nativescript-vue-next/runtime";

export {
    ELEMENT_REF,
    isBoolean,
} from "./nativescript-vue-next/runtime";


// export { navigate, goBack, showModal, closeModal, ShowModalOptions, NavigationOptions, BackNavigationOptions } from './navigation'


function installGlobalShims(): SvelteDesktopDocument {

    //expose our fake dom as global document for svelte components
    let window = global as any;

    window.window = global;
    window.document = new SvelteDesktopDocument();

    // As of NS 6.3, the NS provided requestAnimationFrame breaks svelte by invoking the callback immediately 
    // instead of next event loop, We force ours instead.
    Object.defineProperty(global, 'requestAnimationFrame', {
        value: (action: (now: DOMHighResTimeStamp) => {}) => {
            setTimeout(() => action(window.performance.now()), 33); //about 30 fps
        },
        configurable: true,
        writable: true,
    })
    
    window.getComputedStyle = <Signals extends QWidgetSignals = QWidgetSignals>(element: NSVElement<NodeWidget<Signals>, Signals>) => {
        return element.nativeView._rawInlineStyle;
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
            // this.eventName = name; //event name for nativescript
            this.type = name; // type for svelte
            this.detail = detail;
        }
    }

    return window.document;
}

export const DomTraceCategory = 'SvelteNativeDom'

// function initializeLogger() {
//     logger.setHandler((message, level) => {
//         switch (level) {
//             case LogLevel.Debug:
//             case LogLevel.Info:
//                 console.log(message());
//                 break;
//             case LogLevel.Warn:
//                 console.warn(message());
//                 break;
//             case LogLevel.Error:
//                 console.error(message());
//                 break;
//         }
//     })
// }


export function initializeDom() {
    // initializeLogger();
    registerSvelteElements();
    registerNativeElements();
    return installGlobalShims();
}
