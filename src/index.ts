import { Frame } from 'tns-core-modules/ui/frame'
import { run, on, launchEvent } from 'tns-core-modules/application'
import { DocumentNode, ElementNode, ViewNode } from './dom'
import { registerNativeElements } from './nativescript-elements'

declare global {
    export class SvelteComponent {
        constructor(options: { target?: ViewNode, props?: any });
    }
}

export function svelteNative(startPage: typeof SvelteComponent, data: any) {
    registerNativeElements();

    //expose our fake dom as global document for svelte components
    let document = new DocumentNode();
    (global as any).document = document;

    //our application main navigation frame
    let frame = new ElementNode('frame');
    document.appendChild(frame);

    //wait for launch
    on(launchEvent, ()=>{
        let page = new startPage({
            target: frame,
            props: data || {}
        });
        //dirty way to find page's native view
        (frame.nativeView as Frame).navigate({ create: () => frame.firstElement().nativeView});
    })

    run({create: () => frame.nativeView});
}

