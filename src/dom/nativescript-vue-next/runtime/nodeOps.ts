import {
    INSVElement,
    INSVNode,
    NSVComment,
    NSVElement,
    NSVNodeTypes,
    NSVRoot,
    NSVText
} from './nodes';
import HeadElement from "../../svelte/HeadElement";
import StyleElement from "../../svelte/StyleElement";
import SvelteDesktopDocument from "../../svelte/SvelteDesktopDocument";
import TemplateElement from "../../svelte/TemplateElement";

/**
 * An implementation of RendererOptions from '@vue/runtime-core'.
 * @see https://github.com/vuejs/vue-next/blob/e56d33edb1d42b4957a28538cd8d6302685072ac/packages/runtime-core/src/renderer.ts#L83
 */
export const nodeOps = {
    createRoot(): NSVRoot {
        return new NSVRoot();
    },
    createComment(text: string): INSVNode {
        return new NSVComment(text);
    },
    createElement(tagName: string, isSVG: boolean = false): INSVElement {
        console.log(`nodeOps.createElement("${tagName}") -> new NSVElement("${tagName}")`);

        switch (tagName) {
            case "template":
                return new TemplateElement();
            case "style":
                return new StyleElement();
            case "head":
                return new HeadElement();
            case "document":
                return new SvelteDesktopDocument();
            case "fragment":
            default: {
                return new NSVElement(tagName);
            }
        }
    },
    createText(text: string): INSVNode {
        return new NSVText(text);
    },
    nextSibling(node: INSVNode): INSVNode|null {
        return node.nextSibling;
    },
    parentNode(node: INSVNode): INSVElement|null {
        return node.parentNode;
    },
    insert(child: INSVNode, parent: INSVElement, anchor: INSVNode|null = null): void {
        if (anchor !== null) {
            parent.insertBefore(child, anchor);
        } else {
            parent.appendChild(child);
        }
    },
    remove(el: INSVElement): void {
        if (el.parentNode != null) {
            el.parentNode.removeChild(el);
        }
    },
    setElementText(node: INSVElement, text: string): void {
        node.text = text;
    },
    setText(node: INSVNode, text: string): void {
        node.text = text;
    },
    setScopeId(el: INSVElement, id: string): void {
        el.setAttribute(id, '');
    }
} as const;

export type NSVNodeOps = typeof nodeOps;

// TODO: patchProp() as separate function