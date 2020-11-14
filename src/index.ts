import { initializeDom, NSVElement, SvelteDesktopDocument } from './dom';


declare global {
    export class SvelteComponent {
        $destroy(): void;
        constructor(options: { target?: NSVElement | Element, props?: any, anchor?: NSVElement | Element, intro?: boolean });
        $set(props: any): void;
    }
}

interface RootComponent {
    instance: SvelteComponent,
    "class": typeof SvelteComponent,
}
let root: RootComponent|null = null;


export function svelteDesktop(rootComponentClass: typeof SvelteComponent, data: any): SvelteComponent {
    /**
     * Avoids reinitialising upon hot update.
     */
    const doc: SvelteDesktopDocument = root ? (global as any).document : initializeDom();

    function initialiseRoot(): RootComponent {
        return {
            "class": rootComponentClass,
            instance: new rootComponentClass({
                target: doc.body,
                props: data || {}
            }),
        }
    }

    if(root){
        // It's a hot update.
        if(root["class"] === rootComponentClass){
            console.log(`[svelteDesktop] root.instance.$set(data || {}) with data`, data);
            root.instance.$set(data || {});
        } else {
            console.log(`[svelteDesktop] root.instance.$destroy()`);
            root.instance.$destroy();
            root = initialiseRoot();
        }
    } else {
        root = initialiseRoot();
    }

    return root.instance;
}

// Svelte looks to see if window is undefined in order to determine if it is running on the client or in SSR.
// window is undefined until initializeDom is called. We will set it to a temporary value here and overwrite it in intializedom.
(global as any).window = { env: "Svelte Desktop" }


export { initializeDom, DomTraceCategory } from "./dom"