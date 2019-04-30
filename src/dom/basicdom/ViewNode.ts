
import DocumentNode from './DocumentNode';
import { logger as log } from './Logger';

const dashRegExp = /-/g
export function normalizeElementName(elementName: string) {
    return `${elementName
        .replace(dashRegExp, '')
        .toLowerCase()}`
}

export function* elementIterator(el: ViewNode): Iterable<ViewNode> {
    yield el;
    for (let child of el.childNodes) {
        yield* elementIterator(child)
    }
}

export default class ViewNode {
    nodeType: number;
    _tagName: string;
    parentNode: ViewNode;
    childNodes: ViewNode[];
    prevSibling: ViewNode;
    nextSibling: ViewNode;
    _ownerDocument: DocumentNode;
    _attributes: { [index: string]: any };

    constructor() {
        this.nodeType = null
        this._tagName = null
        this.parentNode = null
        this.childNodes = []
        this.prevSibling = null
        this.nextSibling = null

        this._ownerDocument = null
        this._attributes = {};
    }

    hasAttribute(name: string) {
        return Object.keys(this._attributes).indexOf(name) > -1;
    }

    removeAttribute(name: string) {
        delete this._attributes[name];
    }

    /* istanbul ignore next */
    toString() {
        return `${this.constructor.name}(${this.tagName})`
    }

    set tagName(name) {
        this._tagName = normalizeElementName(name)
    }

    get tagName() {
        return this._tagName
    }

    get firstChild() {
        return this.childNodes.length ? this.childNodes[0] : null
    }

    get lastChild() {
        return this.childNodes.length
            ? this.childNodes[this.childNodes.length - 1]
            : null
    }

    /* istanbul ignore next */
    get ownerDocument(): DocumentNode {
        if (this._ownerDocument) {
            return this._ownerDocument
        }

        let el: ViewNode = this
        while (el != null && el.nodeType !== 9) {
            el = el.parentNode
        }

        return (this._ownerDocument = el as DocumentNode)
    }

    getAttribute(key: string): any {
        return this._attributes[key]
    }

    /* istanbul ignore next */
    setAttribute(key: string, value: any) {
        this._attributes[key] = value;
    }

    /* istanbul ignore next */
    setText(text: string) {
        log.debug(`setText ${this} ${text}`)
        if (this.nodeType === 3) {
            this.parentNode.setText(text)
        } else {
            this.setAttribute('text', text)
        }
    }

    onInsertedChild(childNode: ViewNode, index: number) { }

    onRemovedChild(childNode: ViewNode) { }

    insertBefore(childNode: ViewNode, referenceNode: ViewNode) {
        log.debug(`insert before ${this} ${childNode} ${referenceNode}`)
        if (!childNode) {
            throw new Error(`Can't insert child.`)
        }

        // in some rare cases insertBefore is called with a null referenceNode
        // this makes sure that it get's appended as the last child
        if (!referenceNode) {
            return this.appendChild(childNode)
        }

        if (referenceNode.parentNode !== this) {
            throw new Error(
                `Can't insert child, because the reference node has a different parent.`
            )
        }

        if (childNode.parentNode && childNode.parentNode !== this) {
            throw new Error(
                `Can't insert child, because it already has a different parent.`
            )
        }

        if (childNode.parentNode === this) {
            // we don't need to throw an error here, because it is a valid case
            // for example when switching the order of elements in the tree
            // fixes #127 - see for more details
            // fixes #240
            // throw new Error(`Can't insert child, because it is already a child.`)
        }

        let index = this.childNodes.indexOf(referenceNode)

        childNode.parentNode = this
        childNode.nextSibling = referenceNode
        childNode.prevSibling = this.childNodes[index - 1]

        referenceNode.prevSibling = childNode
        this.childNodes.splice(index, 0, childNode)

        this.onInsertedChild(childNode, index);
    }

    appendChild(childNode: ViewNode) {
        log.debug(`append child ${this} ${childNode}`)
        if (!childNode) {
            throw new Error(`Can't append child.`)
        }

        if (childNode.parentNode && childNode.parentNode !== this) {
            throw new Error(
                `Can't append child, because it already has a different parent.`
            )
        }

        if (childNode.parentNode === this) {
            // we don't need to throw an error here, because it is a valid case
            // for example when switching the order of elements in the tree
            // fixes #127 - see for more details
            // fixes #240
            // throw new Error(`Can't append child, because it is already a child.`)
        }

        childNode.parentNode = this

        if (this.lastChild) {
            childNode.prevSibling = this.lastChild
            this.lastChild.nextSibling = childNode
        }

        this.childNodes.push(childNode)
        this.onInsertedChild(childNode, this.childNodes.length - 1)
    }

    removeChild(childNode: ViewNode) {
        log.debug(`remove child ${this} ${childNode}`)
        if (!childNode) {
            throw new Error(`Can't remove child.`)
        }

        if (!childNode.parentNode) {
            throw new Error(`Can't remove child, because it has no parent.`)
        }

        if (childNode.parentNode !== this) {
            throw new Error(`Can't remove child, because it has a different parent.`)
        }

        childNode.parentNode = null

        if (childNode.prevSibling) {
            childNode.prevSibling.nextSibling = childNode.nextSibling
        }

        if (childNode.nextSibling) {
            childNode.nextSibling.prevSibling = childNode.prevSibling
        }

        // reset the prevSibling and nextSibling. If not, a keep-alived component will
        // still have a filled nextSibling attribute so vue will not
        // insert the node again to the parent. See #220
        childNode.prevSibling = null
        childNode.nextSibling = null

        this.childNodes = this.childNodes.filter(node => node !== childNode)
        this.onRemovedChild(childNode);
    }

    firstElement() {
        for (var child of this.childNodes) {
            if (child.nodeType == 1) {
                return child;
            }
        }
        return null;
    }
}
