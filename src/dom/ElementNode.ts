import { getViewClass } from './element-registry'
import ViewNode from './ViewNode'
import TextNode from './TextNode';
import PropertyNode from './PropertyNode';
import { KeyframeAnimationInfo, KeyframeAnimation } from 'tns-core-modules/ui/animation/keyframe-animation';

interface IStyleProxy {
  setProperty(propertyName: string, value: string, priority?: string): void;
  removeProperty(property: string): void;
  animation: string;
  cssText: string;
}

function camelize(kebab: string): string {
  return kebab.replace(/[\-]+(\w)/g, (m, l) => l.toUpperCase());
}

export const SvelteNativeElement = '__SvelteNativeElement__';

export default class ElementNode extends ViewNode {
  id: string;
  style: IStyleProxy;

  constructor(tagName: string) {
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


    let setStyleAttribute = (value: string): void => {
      this.setAttribute('style', value);
    }

    let getStyleAttribute = (): string => {
      return this.getAttribute('style');
    }


    let animations: Map<string, KeyframeAnimation> = new Map();

    const addAnimation = (animation: String) => {
      //TODO: find animation by name from "public getKeyframeAnimationWithName(animationName: string): KeyframeAnimationInfo;" on page
      //then play it on this element's native view using
      // let animation = KeyframeAnimation.keyframeAnimationFromInfo(animationInfo);
      //   animation.play(view)
      // see https://github.com/NativeScript/NativeScript/blob/master/e2e/animation/app/css-animations/from-code/page.ts
    }

    const removeAnimation = (animation: String) => {
        //find the animation matching the style and call .cancel()
    }


    this.style = {
      setProperty: (propertyName: string, value: string, priority?: string) => {
        this.setStyle(camelize(propertyName), value);
      },

      removeProperty: (propertyName: string) => {
        this.setStyle(camelize(propertyName), null);
      },

      get animation(): string {
        return [...animations.keys()].join(", ")
      },

      set animation(value: string) {
        let new_animations = value.split(',').map(a => a.trim());
        //add new ones
        for (let anim of new_animations) {
          if (!animations.has(anim)) {
            addAnimation(anim);
          }
        }
        //remove old ones
        for (let anim of animations.keys()) {
          if (new_animations.indexOf(anim) < 0) {
            removeAnimation(anim);
          }
        }
      },


      get cssText(): string {
        console.log("got css text");
        return getStyleAttribute();
      },

      set cssText(value: string) {
        console.log("set css text");
        setStyleAttribute(value);
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


}
