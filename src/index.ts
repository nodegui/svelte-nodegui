import { run, on, launchEvent } from '@nativescript/core/application'
import { initializeDom } from './dom';
// import { View } from '@nativescript/core';


declare global {
    export class SvelteComponent {
        $destroy(): void;
        constructor(options: { target?: ViewNode | Element , props?: any, anchor?: ViewNode | Element, intro?: boolean });
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

    let rootFrame: FrameElement; 
    let pageInstance: SvelteComponent;

    return new Promise((resolve, reject) => {
        //wait for launch
        on(launchEvent, () => {
            console.log("Application Launched");
            resolve(pageInstance);
        })

        try {
            run({ create: () => {
                rootFrame = createElement('frame') as FrameElement;
                rootFrame.setAttribute("id", "app-root-frame");

                pageInstance = navigate({
                    page: startPage,
                    props: data || {},
                    frame: rootFrame
                })

                return rootFrame.nativeView;
            }});
        } catch (e) {
            reject(e);
        }
    });
}

// Svelte looks to see if window is undefined in order to determine if it is running on the client or in SSR.
// window is undefined until initializeDom is called. We will set it to a temporary value here and overwrite it in intializedom.
(global as any).window = { env: "Svelte Native" }


export { initializeDom, DomTraceCategory } from "./dom"