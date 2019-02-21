
import ViewNode from './ViewNode'
import TextNode from './TextNode';
import PropertyNode from './PropertyNode';

export default class ElementNode extends ViewNode {

    constructor(tagName: string) {
        super()
        this.nodeType = 1
        this.tagName = tagName
    }

    get id() {
        return this.getAttribute('id')
    }

    set id(value: string) {
        this.setAttribute('id', value)
    }

    appendChild(childNode: ViewNode) {
        super.appendChild(childNode)

        if (childNode.nodeType === 3) {
            this.setText((childNode as TextNode).text)
        }

        if (childNode.nodeType === 7) {
            (childNode as PropertyNode).setOnNode(this);
        }
    }

    insertBefore(childNode: ViewNode, referenceNode: ViewNode) {
        super.insertBefore(childNode, referenceNode)

        if (childNode.nodeType === 3) {
            this.setText((childNode as TextNode).text)
        }

        if (childNode.nodeType === 7) {
            (childNode as PropertyNode).setOnNode(this);
        }
    }

    removeChild(childNode: ViewNode) {
        super.removeChild(childNode)

        if (childNode.nodeType === 3) {
            this.setText('')
        }

        if (childNode.nodeType === 7) {
            (childNode as PropertyNode).clearOnNode(this);
        }
    }
}
