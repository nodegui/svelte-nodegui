import { NSVElement, NSVNodeTypes } from '../nativescript-vue-next/runtime/nodes';
import { RNObject } from './RNObject';

export default class TemplateElement extends NSVElement<RNObject> {
    constructor() {
        super("template");
    }

    set component(value: typeof SvelteComponent) {
        this.setAttribute('component', value)
    }

    get component(): typeof SvelteComponent {
        return this.getAttribute('component') as typeof SvelteComponent
    }
}