
import ViewNode, { ComponentMeta } from './ViewNode'
import TextNode from './TextNode';
import PropertyNode from './PropertyNode';
import { KeyframeAnimationInfo, KeyframeAnimation } from 'tns-core-modules/ui/animation/keyframe-animation';
import { CssAnimationParser } from 'tns-core-modules/ui/styling/css-animation-parser';
import { Page, View } from 'tns-core-modules/ui/page/page';

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
declare module "tns-core-modules/ui/core/view/view" {
  interface View {
      __SvelteNativeElement__: ElementNode;
  }
}

const defaultViewMeta = {
  skipAddToDom: false
}


export default class ElementNode extends ViewNode {
  id: string;
  style: IStyleProxy;
  
  constructor(tagName: string, viewClass: typeof View = null, meta: ComponentMeta = null) {
    super()
    
    this.nodeType = 1
    this.tagName = tagName

    this._meta = Object.assign({}, defaultViewMeta, meta || {});
    
    if (viewClass) {
      this._nativeView = new (viewClass as any)()
      this._nativeView.__SvelteNativeElement__ = this;
    }

    console.log(`created ${this} ${this._nativeView}`)

    let setStyleAttribute = (value: string): void => {
      this.setAttribute('style', value);
    }

    let getStyleAttribute = (): string => {
      return this.getAttribute('style');
    }

    let getParentPage = (): ElementNode => {
      if (this.nativeView && this.nativeView.page) {
        return this.nativeView.page.__SvelteNativeElement__;
      }
      return null;
    }

    let animations: Map<string, KeyframeAnimation> = new Map();
    let oldAnimations: KeyframeAnimation[] = [];

    const addAnimation = (animation: string) => {
      console.log("Adding animation", animation)
      if (!this.nativeView) {
        throw Error("Attempt to apply animation to tag without a native view" + this.tagName);
      }

      let page = getParentPage();
      if (page == null) {
        animations.set(animation, null);
        return;
      }

      //quickly cancel any old ones
      while (oldAnimations.length) {
        let oldAnimation = oldAnimations.shift();
        if (oldAnimation.isPlaying) {
          oldAnimation.cancel();
        }
      }

      //Parse our "animation" style property into an animation info instance (this won't include the keyframes from the css)
      let animationInfos = CssAnimationParser.keyframeAnimationsFromCSSDeclarations([{ property: "animation", value: animation }]);
      if (!animationInfos) {
        animations.set(animation, null);
        return;
      }
      let animationInfo = animationInfos[0];

      //Fetch an animationInfo instance that includes the keyframes from the css (this won't include the animation properties parsed above)
      let animationWithKeyframes = (page.nativeView as Page).getKeyframeAnimationWithName(animationInfo.name);
      if (!animationWithKeyframes) {
        animations.set(animation, null);
        return;
      }

      animationInfo.keyframes = animationWithKeyframes.keyframes;
      //combine the keyframes from the css with the animation from the parsed attribute to get a complete animationInfo object
      let animationInstance = KeyframeAnimation.keyframeAnimationFromInfo(animationInfo);
      
      // save and launch the animation
      animations.set(animation, animationInstance);
      animationInstance.play(this.nativeView);
    }

    const removeAnimation = (animation: string) => {
      console.log("Removing animation", animation)
      if (animations.has(animation)) {
        let animationInstance = animations.get(animation);
        animations.delete(animation);
        
        if (animationInstance) {
          if (animationInstance.isPlaying) {
            //we don't want to stop right away since svelte removes the animation before it is finished due to our lag time starting the animation.
            oldAnimations.push(animationInstance);
          }
        }
      }
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
        console.log("setting animation", value)
        let new_animations = value.trim() == "" ? [] : value.split(',').map(a => a.trim());
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
