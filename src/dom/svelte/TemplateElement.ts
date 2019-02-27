import { ElementNode } from '../basicdom';

export default class TemplateElement extends ElementNode {
    constructor() {
        super('template');
    }

    set component(value: typeof SvelteComponent) {
        this.setAttribute('component', value)
    }

    get component(): typeof SvelteComponent {
        return this.getAttribute('component')
    }
}