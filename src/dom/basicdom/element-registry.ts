import { normalizeElementName } from './ViewNode'
import ElementNode from './ElementNode';

export type NodeResolver = () => ElementNode;

interface ElementEntry {
    resolver: NodeResolver,
}

const elementMap: { [index: string]: ElementEntry } = {}

function registerElementResolver(elementName: string, entry: ElementEntry) {
    const normalizedName = normalizeElementName(elementName)
    if (elementMap[normalizedName]) {
        throw new Error(`Element for ${normalizedName} already registered.`)
    }
    elementMap[normalizedName] = entry
}

export function registerCustomElementNode(elementName: string, resolver: NodeResolver) {
    registerElementResolver(elementName, { resolver: resolver })
}

export function createElement(elementName: string): ElementNode {
    const normalizedName = normalizeElementName(elementName);
    const elementDefinition = elementMap[normalizedName];
    if (!elementDefinition) {
        throw new TypeError(`No known component for element ${elementName}.`)
    }
    return elementDefinition.resolver();
}

