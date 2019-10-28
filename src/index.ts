import { run, on, launchEvent } from 'tns-core-modules/application'
import { navigate, ViewNode, createElement, initializeDom, FrameElement, NativeElementNode } from './dom';
import { View } from 'tns-core-modules/ui/core/view';


declare global {
    export class SvelteComponent {
        $destroy(): void;
        constructor(options: { target?: ViewNode, props?: any, anchor?: ViewNode, intro?: boolean });
        $set(props: any): void;
    }
}

export function svelteNativeNoFrame(rootElement: typeof SvelteComponent, data: any): Promise<SvelteComponent> {
    initializeDom();
    return new Promise((resolve, reject) => {

        let elementInstance: SvelteComponent;

        const buildElement = () => {
            let frag = createElement('fragment');
            elementInstance = new rootElement({
                target: frag,
                props: data || {}
            })
            return (frag.firstChild as NativeElementNode<View>).nativeElement;
        }

        //wait for launch before returning
        on(launchEvent, () => {
            console.log("Application Launched");
            resolve(elementInstance);
        })

        try {
            run({ create: buildElement });
        } catch (e) {
            reject(e);
        }
    });
}

export function svelteNative(startPage: typeof SvelteComponent, data: any): Promise<SvelteComponent> {
    initializeDom();

    //setup a frame so we always have somewhere to hang our css
    let rootFrame = createElement('frame') as FrameElement;
    rootFrame.setAttribute("id", "app-root-frame");

    let pageInstance = navigate({
        page: startPage,
        props: data || {},
        frame: rootFrame
    })

    return new Promise((resolve, reject) => {
        //wait for launch
        on(launchEvent, () => {
            console.log("Application Launched");
            resolve(pageInstance);
        })

        try {
            run({ create: () => rootFrame.nativeView });
        } catch (e) {
            reject(e);
        }
    });
}

// Svelte looks to see if window is undefined in order to determine if it is running on the client or in SSR.
// window is undefined until initializeDom is called. We will set it to a temporary value here and overwrite it in intializedom.
(global as any).window = { env: "Svelte Native" }


export { navigate, goBack, showModal, closeModal, initializeDom, DomTraceCategory } from "./dom"