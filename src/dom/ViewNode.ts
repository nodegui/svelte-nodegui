
import { getViewMeta, normalizeElementName, ComponentMeta } from './element-registry'
import * as viewUtil from './utils'
import * as types from 'tns-core-modules/utils/types'
import { isAndroid, isIOS } from 'tns-core-modules/platform'
import { View } from 'tns-core-modules/ui/core/view/view';
import DocumentNode from './DocumentNode';

declare module "tns-core-modules/ui/core/view/view" {
  interface View {
      __SvelteNativeElement__: ViewNode;
  }
}

export type EventListener = (args: any) => void;

export function* elementIterator(el:ViewNode):Iterable<ViewNode> {
  yield el;
  for (let child of el.childNodes) {
     yield* elementIterator(child)
  }
}


const XML_ATTRIBUTES = Object.freeze([
  'style',
  'rows',
  'columns',
  'fontAttributes'
])

export default class ViewNode {
  nodeType: number;
  _tagName: any;
  parentNode: ViewNode;
  childNodes: ViewNode[];
  prevSibling: ViewNode;
  nextSibling: any;
  _ownerDocument: DocumentNode;
  _nativeView: View;
  _meta: ComponentMeta;

  constructor() {
    this.nodeType = null
    this._tagName = null
    this.parentNode = null
    this.childNodes = []
    this.prevSibling = null
    this.nextSibling = null

    this._ownerDocument = null
    this._nativeView = null
    this._meta = null
  }

  hasAttribute() {
    return false
  }

  removeAttribute() {
    return false;
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

  get nativeView() {
    return this._nativeView
  }

  set nativeView(view) {
    if (this._nativeView) {
      throw new Error(`Can't override native view.`)
    }

    this._nativeView = view
  }

  get meta() {
    if (this._meta) {
      return this._meta
    }

    return (this._meta = getViewMeta(this.tagName))
  }

  /* istanbul ignore next */
  get ownerDocument():DocumentNode {
    if (this._ownerDocument) {
      return this._ownerDocument
    }

    let el:ViewNode = this
    while (el != null && el.nodeType !== 9) {
      el = el.parentNode
    }

    return (this._ownerDocument = el as DocumentNode)
  }

  getAttribute(key:string) {
    return (this.nativeView as any)[key]
  }

  /* istanbul ignore next */
  setAttribute(key:string, value:any) {
    const nv = this.nativeView as any

    if (!nv) return;

    // normalize key
    if (isAndroid && key.startsWith('android:')) {
       key = key.substr(8);
    }
    if (isIOS && key.startsWith('ios:')) {
       key = key.substr(4);
    }
    // try to fix case
    let lowerkey = key.toLowerCase();
    for (let realKey in nv) {
       if (lowerkey == realKey.toLowerCase()) {
         key = realKey;
         break;
       }
    }
    console.log(`setAttr ${this} ${key} ${value}`)
    try {
      if (XML_ATTRIBUTES.indexOf(key) !== -1) {
        nv[key] = value
      } else {
        // detect expandable attrs for boolean values
        // See https://vuejs.org/v2/guide/components-props.html#Passing-a-Boolean
        if (types.isBoolean(nv[key]) && value === '') {
          value = true
        }
        else {
          nv[key] = value
        }
      }
    } catch (e) {
      // ignore but log
      console.warn(`set attribute threw an error, attr:${key} on ${this._tagName}: ${e.message}`)
    }
  }

  /* istanbul ignore next */
  setStyle(property:string, value:string) {
    console.log(`setStyle ${this} ${property} ${value}`)
    if (!(value = value.trim()).length) {
      return
    }

    if (property.endsWith('Align')) {
      // NativeScript uses Alignment instead of Align, this ensures that text-align works
      property += 'ment'
    }
    (this.nativeView.style as any)[property] = value
  }

  /* istanbul ignore next */
  setText(text:string) {
    console.log(`setText ${this} ${text}`)
    if (this.nodeType === 3) {
      this.parentNode.setText(text)
    } else {
      this.setAttribute('text', text)
    }
  }

  /* istanbul ignore next */
  addEventListener(event:string, handler: EventListener) {
    console.log(`add event listener ${this} ${event}`)
    this.nativeView.on(event, handler)
  }

  /* istanbul ignore next */
  removeEventListener(event:string, handler?: EventListener) {
    console.log(`remove event listener ${this} ${event}`)
    this.nativeView.off(event, handler)
  }

  insertBefore(childNode:ViewNode, referenceNode:ViewNode) {
    console.log(`insert before ${this} ${childNode} ${referenceNode}`)
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

    viewUtil.insertChild(this, childNode, index)
  }

  appendChild(childNode:ViewNode) {
    console.log(`append child ${this} ${childNode}`)
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

    viewUtil.insertChild(this, childNode, this.childNodes.length - 1)
  }

  removeChild(childNode:ViewNode) {
    console.log(`remove child ${this} ${childNode}`)
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

    viewUtil.removeChild(this, childNode)
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
