import { initializeDom, NSVElement, SvelteDesktopDocument } from './dom';


declare global {
    export class SvelteComponent {
        $destroy(): void;
        constructor(options: { target?: NSVElement | Element, props?: any, anchor?: NSVElement | Element, intro?: boolean });
        $set(props: any): void;
    }
}

let initialised: boolean = false;

export function svelteDesktop(rootElement: typeof SvelteComponent, data: any): SvelteComponent {
    /**
     * Avoids reinitialising upon hot update.
     */
    const doc: SvelteDesktopDocument = initialised ? (global as any).document : initializeDom();
    initialised = true;

    const elementInstance: SvelteComponent = new rootElement({
        target: doc.body,
        props: data || {}
    });

    return elementInstance;
}

// Svelte looks to see if window is undefined in order to determine if it is running on the client or in SSR.
// window is undefined until initializeDom is called. We will set it to a temporary value here and overwrite it in intializedom.
(global as any).window = { env: "Svelte Desktop" }


export { initializeDom, DomTraceCategory } from "./dom"