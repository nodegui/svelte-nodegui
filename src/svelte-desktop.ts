declare namespace svelteDesktop.JSX {

    /* svelte specific */
    interface ElementClass {
        $$prop_def: any;
    }

    interface ElementAttributesProperty {
        $$prop_def: any; // specify the property name to use
    }

    // Add empty IntrinsicAttributes to prevent fallback to the one in the JSX namespace
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicAttributes {
    }

    interface IntrinsicElements {
        [name: string]: { [name: string]: any };
    }
}
