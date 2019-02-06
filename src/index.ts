import  DocumentNode  from './dom/DocumentNode'
import ElementNode from './dom/ElementNode'
import { Frame } from 'tns-core-modules/ui/frame'
import { run, on, launchEvent } from 'tns-core-modules/application'
import ViewNode from "./dom/ViewNode";

declare global {
    export class SvelteComponent {
        constructor(options: { target?: ViewNode, props?: any });
    }
}

export function svelteNative(startPage: typeof SvelteComponent, data: any) {
    let document = new DocumentNode();
    //expose globally for svelte components
    (global as any).document = document;

    let frame = new ElementNode('frame');

    document.appendChild(frame);

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

export { default as AsComponent } from "./components/AsComponent"
export { default as ElementNode } from "./dom/ElementNode"  