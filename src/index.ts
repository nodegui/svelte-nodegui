import { Frame } from 'tns-core-modules/ui/frame'
import { run, on, launchEvent } from 'tns-core-modules/application'
import { DocumentNode, ViewNode, createElement } from './dom'
import { registerNativeElements } from './nativescript-elements'

declare global {
    export class SvelteComponent {
        constructor(options: { target?: ViewNode, props?: any });
        $set(props: any): void;
    }
}

function installGlobalShims() {
   
   //expose our fake dom as global document for svelte components
   let window = global as any;

   window.window = global;
   window.document = new DocumentNode();

   window.requestAnimationFrame = (action: ()=>{}) => {
       setTimeout(action, 33); //about 30 fps
   }

   window.getComputedStyle = (node: ViewNode) => {
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

   

}


export function svelteNative(startPage: typeof SvelteComponent, data: any) {
    registerNativeElements();
    installGlobalShims();

    const document = (global as any).document as DocumentNode;

    //our application main navigation frame
    let frame = createElement('frame');
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

