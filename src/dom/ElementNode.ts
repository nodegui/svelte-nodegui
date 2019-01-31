import { getViewClass } from './element-registry'
import ViewNode from './ViewNode'
import TextNode from './TextNode';

export default class ElementNode extends ViewNode {
  constructor(tagName:string) {
    super()

    this.nodeType = 1
    this.tagName = tagName

    const viewClass = getViewClass(tagName) as any
    this._nativeView = new viewClass()
    console.log(`created ${this} ${this._nativeView}`)
  }

  appendChild(childNode: ViewNode) {
    super.appendChild(childNode)

    if (childNode.nodeType === 3) {
      this.setText((childNode as TextNode).text)
    }
  }

  insertBefore(childNode: ViewNode, referenceNode: ViewNode) {
    super.insertBefore(childNode, referenceNode)

    if (childNode.nodeType === 3) {
      this.setText((childNode as TextNode).text)
    }
  }

  removeChild(childNode: ViewNode) {
    super.removeChild(childNode)

    if (childNode.nodeType === 3) {
      this.setText('')
    }
  }
}
