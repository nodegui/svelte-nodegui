import { normalizeElementName } from './ViewNode'
import ElementNode from './ElementNode';

interface ElementEntry {
    resolver: () => ElementNode,
}

export interface RegisterElementOptions {
    override?: boolean;
}

const elementMap: { [index: string]: ElementEntry } = {}

function registerElementResolver(elementName: string, entry: ElementEntry, options?: RegisterElementOptions) {
    const normalizedName = normalizeElementName(elementName)
    if (elementMap[normalizedName] && (!options || options.override !== true)) {
        console.error(`Element for ${normalizedName} already registered.`);
        return;
    }
    elementMap[normalizedName] = entry
}

export function registerElement(elementName: string, resolver: () => ElementNode, options?: RegisterElementOptions) {
    registerElementResolver(elementName, { resolver: resolver }, options)
}

export function createElement(elementName: string): ElementNode {
    const normalizedName = normalizeElementName(elementName);
    const elementDefinition = elementMap[normalizedName];
    if (!elementDefinition) {
        throw new TypeError(`No known component for element ${elementName}.`)
    }
    return elementDefinition.resolver();
}

