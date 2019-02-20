import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base'
import { ContentView } from 'tns-core-modules/ui/content-view'
import { View }  from 'tns-core-modules/ui/core/view'
import ViewNode from './ViewNode';
import NativeElementNode from './NativeElementNode';


export function isView(view: any) {
  return view instanceof View
}

export function isLayout(view: any) {
  return view instanceof LayoutBase
}

export function isContentView(view: any) {
  return view instanceof ContentView
}

export function insertChild(parentNode: ViewNode, childNode:ViewNode, atIndex = -1) {
  if (!parentNode) {
    return
  }

  if (!(parentNode instanceof NativeElementNode) || !(childNode instanceof NativeElementNode)) {
     return
  } 

  if (parentNode.meta && typeof parentNode.meta.insertChild === 'function') {
    return parentNode.meta.insertChild(parentNode, childNode, atIndex)
  }

  const parentView = parentNode.nativeView
  const childView = childNode.nativeView

  if (parentView && (parentView as any)._addChildFromBuilder) {
    (parentView as any)._addChildFromBuilder(
      childNode._nativeView.constructor.name,
      childView
    )
  } else {
     throw new Error("Parent can't contain children: " + parentNode + ", " + childNode);
  }
}

export function removeChild(parentNode: ViewNode, childNode: ViewNode) {
  if (!parentNode) {
    return
  }
  
  if (!(parentNode instanceof NativeElementNode) || !(childNode instanceof NativeElementNode)) {
    return
 } 

  if (parentNode.meta && typeof parentNode.meta.removeChild === 'function') {
    return parentNode.meta.removeChild(parentNode, childNode)
  }

  if (!childNode.nativeView || !childNode.nativeView) {
    return
  } 

  const parentView = parentNode.nativeView
  const childView = childNode.nativeView

  if (parentView instanceof LayoutBase) {
    parentView.removeChild(childView)
  } else if (parentView instanceof ContentView) {
    if (parentView.content === childView) {
      parentView.content = null
    }
    if (childNode.nodeType === 8) {
      parentView._removeView(childView)
    }
  } else if (isView(parentView)) {
    parentView._removeView(childView)
  } else {
    // throw new Error("Unknown parent type: " + parent);
  }
}
