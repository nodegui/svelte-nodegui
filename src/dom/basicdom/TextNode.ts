import ViewNode from './ViewNode'

export default class TextNode extends ViewNode {
    text: string;
    constructor(text: string) {
        super()

        this.nodeType = 3
        this.text = text
    }

    setText(text: string) {
        this.text = text
        this.parentNode.setText(text)
    }

    set data(text: string) {
        this.setText(text);
    }

    get data() {
        return this.text;
    }
}
