import CommentNode from './CommentNode'
import ElementNode from './ElementNode'
import ViewNode from './ViewNode'
import TextNode from './TextNode'
import PropertyNode from './PropertyNode';

export default class DocumentNode extends ViewNode {
  documentElement: ElementNode;
  constructor() {
    super()
    this.tagName = "docNode"
    this.nodeType = 9
    this.documentElement = new ElementNode('document')

    /*// make static methods accessible via this
    this.createComment = DocumentNode.createComment
    this.createElement = DocumentNode.createElement
    this.createElementNS = DocumentNode.createElementNS
    this.createTextNode = DocumentNode.createTextNode*/
    console.log(`created ${this}`)
  }

  createComment(text:string) {
    return new CommentNode(text)
  }

  createElement(tagName:string) {
    return tagName.includes(".") ? new PropertyNode(tagName)  : new ElementNode(tagName)
  }

  createElementNS(namespace:string, tagName:string) {
    return this.createElement(tagName)
  }

  createTextNode(text: string) {
    return new TextNode(text)
  }
}
