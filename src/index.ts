import { run, on, launchEvent } from 'tns-core-modules/application'
import { navigate, ViewNode, createElement, initializeDom, FrameElement } from './dom';


declare global {
    export class SvelteComponent {
        constructor(options: { target?: ViewNode, props?: any });
        $set(props: any): void;
    }
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

export { navigate, goBack } from "./dom"