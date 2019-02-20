import { Frame } from 'tns-core-modules/ui/frame'
import { run, on, launchEvent } from 'tns-core-modules/application'
import { ViewNode, NativeElementNode, createElement, initializeDom } from './dom';

declare global {
    export class SvelteComponent {
        constructor(options: { target?: ViewNode, props?: any });
        $set(props: any): void;
    }
}

export function svelteNative(startPage: typeof SvelteComponent, data: any) {
    const document = initializeDom();

    //our application main navigation frame
    let frame = createElement('frame') as NativeElementNode;
    document.appendChild(frame);

    //wait for launch
    on(launchEvent, () => {
        let page = new startPage({
            target: frame,
            props: data || {}
        });
        //dirty way to find page's native view
        (frame.nativeView as Frame).navigate({ create: () => (frame.firstElement() as NativeElementNode).nativeView });
    })

    run({ create: () => frame.nativeView });
}

