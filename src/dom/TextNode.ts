import ViewNode from './ViewNode'

export default class TextNode extends ViewNode {
  text: string;
  constructor(text:string) {
    super()

    this.nodeType = 3
    this.text = text

    this._meta = {
      skipAddToDom: true
    }
    console.log(`created ${this}`)
  }

  setText(text:string) {
    this.text = text
    this.parentNode.setText(text)
  }
}
