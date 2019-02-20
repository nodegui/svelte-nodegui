import ElementNode from './ElementNode'

export default class CommentNode extends ElementNode {
    text: string;
    constructor(text: string) {
        super('comment')

        this.nodeType = 8
        this.text = text
    }
}
