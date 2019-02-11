import ViewNode from './ViewNode'

export default class PropertyNode extends ViewNode {
    propertyName: string;
    propertyTagName: string
  
    constructor(tagName: string) {
        super()
        this.tagName = tagName;

        let bits = tagName.split(".", 2);
        this.propertyName = bits[1];
        this.propertyTagName = bits[0];

        //TODO some properties can't be null (eg page.actionbar), we could lookup a meta property on this.propertyTagName to determine this.

        this.nodeType = 7 //processing instruction
        console.log(`created ${this}`)

        this._meta = { 
            insertChild: () => {
                this.setOnNode(this.parentNode);
            },

            removeChild: () => {
                this.setOnNode(this.parentNode);
            }
        }
    }

    /* istanbul ignore next */
    toString() {
        return `${this.constructor.name}(${this.tagName}, ${this.propertyName})`
    } 

    setOnNode(parent: ViewNode) {
        if (parent) {
            const el = this.firstElement();
            parent.setAttribute(this.propertyName, el ? el.nativeView : null);
        }
    }

    clearOnNode(parent: ViewNode) {
        if (parent) {
            parent.setAttribute(this.propertyName, null);
        }
    }
}
