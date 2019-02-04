import { getViewClass } from './element-registry'
import ViewNode from './ViewNode'
import TextNode from './TextNode';
import PropertyNode from './PropertyNode';

interface IStyleProxy {
  setProperty(propertyName: string, value: string, priority?: string ): void;
  removeProperty(property: string): void;
}

function camelize(kebab:string) : string {
  return kebab.replace(/[\-]+(\w)/g, (m, l) => l.toUpperCase());
}

export const SvelteNativeElement = '__SvelteNativeElement__';

export default class ElementNode extends ViewNode {
  style: IStyleProxy;
  id: string;

  constructor(tagName:string) {
    super()

    this.nodeType = 1
    this.tagName = tagName

    //there are some special elements that don't exist natively
    
    const viewClass = getViewClass(tagName) as any
    if (viewClass) {
      this._nativeView = new viewClass()
      this._nativeView.__SvelteNativeElement__ = this;
    }
    

    console.log(`created ${this} ${this._nativeView}`)

    this.style = {
      setProperty: (propertyName: string, value: string, priority?: string ) => {
         this.setStyle(camelize(propertyName), value);
      },
      removeProperty:  (propertyName: string ) => {
         this.setStyle(camelize(propertyName), null);
      }
    }

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

  firstElement() {
     for(var child of this.childNodes) {
       if (child.nodeType == 1) {
         return child;
       }
     }
     return null;
  }
}
