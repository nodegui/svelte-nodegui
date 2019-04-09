import { topmost, Frame, getFrameById } from 'tns-core-modules/ui/frame';
import { addCss } from 'tns-core-modules/application';
import { KeyframeAnimation } from 'tns-core-modules/ui/animation/keyframe-animation';
import { CssAnimationParser } from 'tns-core-modules/ui/styling/css-animation-parser';
import { isAndroid, isIOS, ContentView, View, Page } from 'tns-core-modules/ui/page';
import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base';
import { ListView } from 'tns-core-modules/ui/list-view';

const dashRegExp = /-/g;
function normalizeElementName(elementName) {
    return `${elementName
        .replace(dashRegExp, '')
        .toLowerCase()}`;
}
function* elementIterator(el) {
    yield el;
    for (let child of el.childNodes) {
        yield* elementIterator(child);
    }
}
class ViewNode {
    constructor() {
        this.nodeType = null;
        this._tagName = null;
        this.parentNode = null;
        this.childNodes = [];
        this.prevSibling = null;
        this.nextSibling = null;
        this._ownerDocument = null;
        this._attributes = {};
    }
    hasAttribute(name) {
        return Object.keys(this._attributes).indexOf(name) > -1;
    }
    removeAttribute(name) {
        delete this._attributes[name];
    }
    /* istanbul ignore next */
    toString() {
        return `${this.constructor.name}(${this.tagName})`;
    }
    set tagName(name) {
        this._tagName = normalizeElementName(name);
    }
    get tagName() {
        return this._tagName;
    }
    get firstChild() {
        return this.childNodes.length ? this.childNodes[0] : null;
    }
    get lastChild() {
        return this.childNodes.length
            ? this.childNodes[this.childNodes.length - 1]
            : null;
    }
    /* istanbul ignore next */
    get ownerDocument() {
        if (this._ownerDocument) {
            return this._ownerDocument;
        }
        let el = this;
        while (el != null && el.nodeType !== 9) {
            el = el.parentNode;
        }
        return (this._ownerDocument = el);
    }
    getAttribute(key) {
        return this._attributes[key];
    }
    /* istanbul ignore next */
    setAttribute(key, value) {
        this._attributes[key] = value;
    }
    /* istanbul ignore next */
    setText(text) {
        console.log(`setText ${this} ${text}`);
        if (this.nodeType === 3) {
            this.parentNode.setText(text);
        }
        else {
            this.setAttribute('text', text);
        }
    }
    onInsertedChild(childNode, index) { }
    onRemovedChild(childNode) { }
    insertBefore(childNode, referenceNode) {
        console.log(`insert before ${this} ${childNode} ${referenceNode}`);
        if (!childNode) {
            throw new Error(`Can't insert child.`);
        }
        // in some rare cases insertBefore is called with a null referenceNode
        // this makes sure that it get's appended as the last child
        if (!referenceNode) {
            return this.appendChild(childNode);
        }
        if (referenceNode.parentNode !== this) {
            throw new Error(`Can't insert child, because the reference node has a different parent.`);
        }
        if (childNode.parentNode && childNode.parentNode !== this) {
            throw new Error(`Can't insert child, because it already has a different parent.`);
        }
        if (childNode.parentNode === this) ;
        let index = this.childNodes.indexOf(referenceNode);
        childNode.parentNode = this;
        childNode.nextSibling = referenceNode;
        childNode.prevSibling = this.childNodes[index - 1];
        referenceNode.prevSibling = childNode;
        this.childNodes.splice(index, 0, childNode);
        this.onInsertedChild(childNode, index);
    }
    appendChild(childNode) {
        console.log(`append child ${this} ${childNode}`);
        if (!childNode) {
            throw new Error(`Can't append child.`);
        }
        if (childNode.parentNode && childNode.parentNode !== this) {
            throw new Error(`Can't append child, because it already has a different parent.`);
        }
        if (childNode.parentNode === this) ;
        childNode.parentNode = this;
        if (this.lastChild) {
            childNode.prevSibling = this.lastChild;
            this.lastChild.nextSibling = childNode;
        }
        this.childNodes.push(childNode);
        this.onInsertedChild(childNode, this.childNodes.length - 1);
    }
    removeChild(childNode) {
        console.log(`remove child ${this} ${childNode}`);
        if (!childNode) {
            throw new Error(`Can't remove child.`);
        }
        if (!childNode.parentNode) {
            throw new Error(`Can't remove child, because it has no parent.`);
        }
        if (childNode.parentNode !== this) {
            throw new Error(`Can't remove child, because it has a different parent.`);
        }
        childNode.parentNode = null;
        if (childNode.prevSibling) {
            childNode.prevSibling.nextSibling = childNode.nextSibling;
        }
        if (childNode.nextSibling) {
            childNode.nextSibling.prevSibling = childNode.prevSibling;
        }
        // reset the prevSibling and nextSibling. If not, a keep-alived component will
        // still have a filled nextSibling attribute so vue will not
        // insert the node again to the parent. See #220
        childNode.prevSibling = null;
        childNode.nextSibling = null;
        this.childNodes = this.childNodes.filter(node => node !== childNode);
        this.onRemovedChild(childNode);
    }
    firstElement() {
        for (var child of this.childNodes) {
            if (child.nodeType == 1) {
                return child;
            }
        }
        return null;
    }
}

class ElementNode extends ViewNode {
    constructor(tagName) {
        super();
        this.nodeType = 1;
        this.tagName = tagName;
    }
    get id() {
        return this.getAttribute('id');
    }
    set id(value) {
        this.setAttribute('id', value);
    }
    get classList() {
        if (!this._classList) {
            const getClasses = () => (this.getAttribute('class') || "").split(/\s+/).filter((k) => k != "");
            this._classList = {
                add: (...classNames) => {
                    this.setAttribute('class', [...new Set(getClasses().concat(classNames))].join(" "));
                },
                remove: (...classNames) => {
                    this.setAttribute('class', getClasses().filter((i) => classNames.indexOf(i) == -1));
                },
                get length() {
                    return getClasses().length;
                }
            };
        }
        return this._classList;
    }
    appendChild(childNode) {
        super.appendChild(childNode);
        if (childNode.nodeType === 3) {
            this.setText(childNode.text);
        }
        if (childNode.nodeType === 7) {
            childNode.setOnNode(this);
        }
    }
    insertBefore(childNode, referenceNode) {
        super.insertBefore(childNode, referenceNode);
        if (childNode.nodeType === 3) {
            this.setText(childNode.text);
        }
        if (childNode.nodeType === 7) {
            childNode.setOnNode(this);
        }
    }
    removeChild(childNode) {
        super.removeChild(childNode);
        if (childNode.nodeType === 3) {
            this.setText('');
        }
        if (childNode.nodeType === 7) {
            childNode.clearOnNode(this);
        }
    }
}

class CommentNode extends ElementNode {
    constructor(text) {
        super('comment');
        this.nodeType = 8;
        this.text = text;
    }
}

class TextNode extends ViewNode {
    constructor(text) {
        super();
        this.nodeType = 3;
        this.text = text;
    }
    setText(text) {
        this.text = text;
        this.parentNode.setText(text);
    }
    set data(text) {
        this.setText(text);
    }
    get data() {
        return this.text;
    }
}

class PropertyNode extends ElementNode {
    constructor(tagName, propertyName) {
        super(`${tagName}.${propertyName}`);
        this.propertyName = propertyName;
        this.propertyTagName = normalizeElementName(tagName);
        this.nodeType = 7; //processing instruction
    }
    onInsertedChild() {
        this.setOnNode(this.parentNode);
    }
    onRemovedChild() {
        this.setOnNode(this.parentNode);
    }
    /* istanbul ignore next */
    toString() {
        return `${this.constructor.name}(${this.tagName}, ${this.propertyName})`;
    }
    setOnNode(parent) {
        if (parent && (parent.tagName === this.propertyTagName)) {
            const el = this.firstElement();
            parent.setAttribute(this.propertyName, el);
        }
    }
    clearOnNode(parent) {
        if (parent && (parent.tagName === this.propertyTagName)) {
            parent.setAttribute(this.propertyName, null);
        }
    }
}

const elementMap = {};
function registerElementResolver(elementName, entry) {
    const normalizedName = normalizeElementName(elementName);
    if (elementMap[normalizedName]) {
        throw new Error(`Element for ${normalizedName} already registered.`);
    }
    elementMap[normalizedName] = entry;
}
function registerElement(elementName, resolver) {
    registerElementResolver(elementName, { resolver: resolver });
}
function createElement(elementName) {
    const normalizedName = normalizeElementName(elementName);
    const elementDefinition = elementMap[normalizedName];
    if (!elementDefinition) {
        throw new TypeError(`No known component for element ${elementName}.`);
    }
    return elementDefinition.resolver();
}

class DocumentNode extends ViewNode {
    constructor() {
        super();
        this.tagName = "docNode";
        this.nodeType = 9;
    }
    createComment(text) {
        return new CommentNode(text);
    }
    createPropertyNode(tagName, propertyName) {
        return new PropertyNode(tagName, propertyName);
    }
    createElement(tagName) {
        if (tagName.indexOf(".") >= 0) {
            let bits = tagName.split(".", 2);
            return this.createPropertyNode(bits[0], bits[1]);
        }
        return createElement(tagName);
    }
    createElementNS(namespace, tagName) {
        return this.createElement(tagName);
    }
    createTextNode(text) {
        return new TextNode(text);
    }
    getElementById(id) {
        for (let el of elementIterator(this)) {
            if (el.nodeType === 1 && el.id === id)
                return el;
        }
    }
}

class StyleSheet {
    constructor() {
        this._rules = [];
    }
    // The css rules generated by svelte have a keyframe every 16 milliseconds and are quite slow to create and run
    // this is here to support the simple and short ones, but ideally we would promote our own transitions in svelte-native/transitions
    // which would delegate to the more direct nativescript way of working.
    deleteRule(index) {
        let removed = this._rules.splice(index, 1);
        for (let r in removed) {
            console.log("removing transition rule", r);
            // Turns out nativescript doesn't support "removing" css.
            // this is pretty horrible but better than a memory leak. 
            // since this code is called mainly for keyframes, and keyframes don't add new selectors (they just end up in _keyframes)
            // we can almost remove the rules ourselves.
            if (r.startsWith('@keyframes')) {
                const name = r.split(" ")[1];
                let frame = topmost();
                if (frame && frame._styleScope) {
                    let scope = frame._styleScope;
                    delete scope._keyframes[name];
                    scope._css = scope._css.replace(r, "");
                }
            }
        }
    }
    insertRule(rule, index = 0) {
        console.log("Adding transition rule", rule);
        let frame = topmost();
        frame.addCss(rule);
        this._rules.splice(index, 0, rule);
    }
    get cssRules() {
        return this._rules;
    }
}
class StyleElement extends ElementNode {
    constructor() {
        super('style');
        this._sheet = new StyleSheet();
    }
    get sheet() {
        return this._sheet;
    }
}

class HeadElement extends ElementNode {
    constructor() {
        super('head');
    }
    onInsertedChild(childNode, atIndex) {
        if (childNode instanceof StyleElement) {
            let css = childNode.textContent;
            if (css) {
                addCss(css);
            }
        }
    }
}

class TemplateElement extends ElementNode {
    constructor() {
        super('template');
    }
    set component(value) {
        this.setAttribute('component', value);
    }
    get component() {
        return this.getAttribute('component');
    }
}

// Dom elements that svelte expects to be able to create or use.
// or custom additions to make life easier
function registerSvelteElements() {
    registerElement('head', () => new HeadElement());
    registerElement('style', () => new StyleElement());
    registerElement('fragment', () => new ElementNode('fragment'));
    registerElement('template', () => new TemplateElement());
}

function camelize(kebab) {
    return kebab.replace(/[\-]+(\w)/g, (m, l) => l.toUpperCase());
}
const defaultViewMeta = {
    skipAddToDom: false
};
class NativeElementNode extends ElementNode {
    constructor(tagName, viewClass, meta = null) {
        super(tagName);
        this.nodeType = 1;
        this.tagName = tagName;
        this._meta = Object.assign({}, defaultViewMeta, meta || {});
        this._nativeView = new viewClass();
        this._nativeView.__SvelteNativeElement__ = this;
        console.log(`created ${this} ${this._nativeView}`);
        //TODO these style shims mess up the code, extract to external modules
        let setStyleAttribute = (value) => {
            this.setAttribute('style', value);
        };
        let getStyleAttribute = () => {
            return this.getAttribute('style');
        };
        let getParentPage = () => {
            if (this.nativeView && this.nativeView.page) {
                return this.nativeView.page.__SvelteNativeElement__;
            }
            return null;
        };
        let animations = new Map();
        let oldAnimations = [];
        const addAnimation = (animation) => {
            console.log("Adding animation", animation);
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
            let animationWithKeyframes = page.nativeView.getKeyframeAnimationWithName(animationInfo.name);
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
        };
        const removeAnimation = (animation) => {
            console.log("Removing animation", animation);
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
        };
        this.style = {
            setProperty: (propertyName, value, priority) => {
                this.setStyle(camelize(propertyName), value);
            },
            removeProperty: (propertyName) => {
                this.setStyle(camelize(propertyName), null);
            },
            get animation() {
                return [...animations.keys()].join(", ");
            },
            set animation(value) {
                console.log("setting animation", value);
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
            get cssText() {
                console.log("got css text");
                return getStyleAttribute();
            },
            set cssText(value) {
                console.log("set css text");
                setStyleAttribute(value);
            }
        };
    }
    /* istanbul ignore next */
    setStyle(property, value) {
        console.log(`setStyle ${this} ${property} ${value}`);
        if (!(value = value.toString().trim()).length) {
            return;
        }
        if (property.endsWith('Align')) {
            // NativeScript uses Alignment instead of Align, this ensures that text-align works
            property += 'ment';
        }
        this.nativeView.style[property] = value;
    }
    get nativeView() {
        return this._nativeView;
    }
    set nativeView(view) {
        if (this._nativeView) {
            throw new Error(`Can't override native view.`);
        }
        this._nativeView = view;
    }
    get meta() {
        return this._meta;
    }
    /* istanbul ignore next */
    addEventListener(event, handler) {
        console.log(`add event listener ${this} ${event}`);
        this.nativeView.on(event, handler);
    }
    /* istanbul ignore next */
    removeEventListener(event, handler) {
        console.log(`remove event listener ${this} ${event}`);
        this.nativeView.off(event, handler);
    }
    getAttribute(fullkey) {
        let getTarget = this.nativeView;
        let keypath = fullkey.split(".");
        while (keypath.length > 0) {
            if (!getTarget)
                return null;
            let key = keypath.shift();
            // try to fix case
            let lowerkey = key.toLowerCase();
            for (let realKey in getTarget) {
                if (lowerkey == realKey.toLowerCase()) {
                    key = realKey;
                    break;
                }
            }
            if (keypath.length > 0) {
                getTarget = getTarget[key];
            }
            else {
                return getTarget[key];
            }
        }
        return null;
    }
    onInsertedChild(childNode, index) {
        insertChild(this, childNode, index);
    }
    onRemovedChild(childNode) {
        removeChild(this, childNode);
    }
    /* istanbul ignore next */
    setAttribute(fullkey, value) {
        const nv = this.nativeView;
        let setTarget = nv;
        // normalize key
        if (isAndroid && fullkey.startsWith('android:')) {
            fullkey = fullkey.substr(8);
        }
        if (isIOS && fullkey.startsWith('ios:')) {
            fullkey = fullkey.substr(4);
        }
        //we might be getting an element from a propertyNode eg page.actionBar, unwrap
        if (value instanceof NativeElementNode) {
            value = value.nativeView;
        }
        let keypath = fullkey.split(".");
        let resolvedKeys = [];
        while (keypath.length > 0) {
            if (!setTarget)
                return;
            let key = keypath.shift();
            // try to fix case
            let lowerkey = key.toLowerCase();
            for (let realKey in setTarget) {
                if (lowerkey == realKey.toLowerCase()) {
                    key = realKey;
                    break;
                }
            }
            resolvedKeys.push(key);
            if (keypath.length > 0) {
                setTarget = setTarget[key];
            }
            else {
                try {
                    console.log(`setAttr ${this} ${resolvedKeys.join(".")} ${value}`);
                    setTarget[key] = value;
                }
                catch (e) {
                    // ignore but log
                    console.warn(`set attribute threw an error, attr:${key} on ${this._tagName}: ${e.message}`);
                }
            }
        }
    }
    dispatchEvent(event) {
        if (this.nativeView) {
            //nativescript uses the EventName while dom uses Type
            event.eventName = event.type;
            this.nativeView.notify(event);
        }
    }
}
//TODO merge these into the class above
function insertChild(parentNode, childNode, atIndex = -1) {
    if (!parentNode) {
        return;
    }
    if (!(parentNode instanceof NativeElementNode) || !(childNode instanceof NativeElementNode)) {
        return;
    }
    if (parentNode.meta && typeof parentNode.meta.insertChild === 'function') {
        return parentNode.meta.insertChild(parentNode, childNode, atIndex);
    }
    const parentView = parentNode.nativeView;
    const childView = childNode.nativeView;
    //use the builder logic if we aren't being dynamic, to catch config items like <actionbar> that are not likely to be toggled
    if (atIndex < 0 && parentView._addChildFromBuilder) {
        parentView._addChildFromBuilder(childNode._nativeView.constructor.name, childView);
        return;
    }
    if (parentView instanceof LayoutBase) {
        return (atIndex < 0) ? parentView.addChild(childView) : parentView.insertChild(childView, atIndex);
    }
    if (parentView._addChildFromBuilder) {
        return parentView._addChildFromBuilder(childNode._nativeView.constructor.name, childView);
    }
    if (parentView instanceof ContentView) {
        parentView.content = childView;
        return;
    }
    throw new Error("Parent can't contain children: " + parentNode + ", " + childNode);
}
function removeChild(parentNode, childNode) {
    if (!parentNode) {
        return;
    }
    if (!(parentNode instanceof NativeElementNode) || !(childNode instanceof NativeElementNode)) {
        return;
    }
    if (parentNode.meta && typeof parentNode.meta.removeChild === 'function') {
        return parentNode.meta.removeChild(parentNode, childNode);
    }
    if (!childNode.nativeView || !childNode.nativeView) {
        return;
    }
    const parentView = parentNode.nativeView;
    const childView = childNode.nativeView;
    if (parentView instanceof LayoutBase) {
        parentView.removeChild(childView);
    }
    else if (parentView instanceof ContentView) {
        if (parentView.content === childView) {
            parentView.content = null;
        }
        if (childNode.nodeType === 8) {
            parentView._removeView(childView);
        }
    }
    else if (parentView instanceof View) {
        parentView._removeView(childView);
    }
}

class PageElement extends NativeElementNode {
    constructor() {
        super('page', Page, null);
    }
    get nativeView() {
        return super.nativeView;
    }
    set nativeView(view) {
        super.nativeView = view;
    }
}

class FrameElement extends NativeElementNode {
    constructor() {
        super('frame', Frame, null);
    }
    setAttribute(key, value) {
        if (key.toLowerCase() == "defaultpage") {
            console.log("loading page", value);
            let dummy = createElement('fragment');
            let page = new value({ target: dummy, props: {} });
            this.nativeView.navigate({ create: () => dummy.firstElement().nativeView });
        }
    }
    get nativeView() {
        return super.nativeView;
    }
    set nativeView(view) {
        super.nativeView = view;
    }
    //In regular native script, Frame elements aren't meant to have children, we instead allow it to have one.. a page.. as a convenience
    // and set the instance as the default page by navigating to it.
    onInsertedChild(childNode, index) {
        //only handle page nodes
        if (!(childNode instanceof PageElement))
            return;
        this.nativeView.navigate({ create: () => childNode.nativeView });
    }
}

class ListViewElement extends NativeElementNode {
    constructor() {
        super('listview', ListView, null);
        this.nativeView.on(ListView.itemLoadingEvent, (args) => { this.updateListItem(args); });
    }
    updateListItem(args) {
        let item;
        let listView = this.nativeView;
        let items = listView.items;
        if (args.index >= items.length) {
            console.log("Got request for item at index that didn't exists", items, args.index);
            return;
        }
        if (items.getItem) {
            item = items.getItem(args.index);
        }
        else {
            item = items[args.index];
        }
        if (!args.view || !args.view.__SvelteComponent__) {
            console.log("creating view for ", args.index, item.name);
            let wrapper = createElement('StackLayout');
            let componentInstance = new (this.itemTemplateComponent)({
                target: wrapper,
                props: {
                    item
                }
            });
            let nativeEl = wrapper.nativeView;
            nativeEl.__SvelteComponent__ = componentInstance;
            args.view = nativeEl;
        }
        else {
            let componentInstance = args.view.__SvelteComponent__;
            console.log("updating view for ", args.index, item.name, args.view);
            componentInstance.$set({ item });
        }
    }
    get itemTemplateComponent() {
        const templateNode = this.childNodes.find(x => x instanceof TemplateElement);
        return templateNode ? templateNode.component : null;
    }
    get nativeView() {
        return super.nativeView;
    }
    set nativeView(view) {
        super.nativeView = view;
    }
}

function registerNativeElement(elementName, resolver, meta = null) {
    registerElement(elementName, () => new NativeElementNode(elementName, resolver(), meta));
}
function registerNativeElements() {
    registerNativeElement('ActionBar', () => require('tns-core-modules/ui/action-bar').ActionBar);
    registerNativeElement('ActionItem', () => require('tns-core-modules/ui/action-bar').ActionItem);
    registerNativeElement('NavigationButton', () => require('tns-core-modules/ui/action-bar').NavigationButton);
    registerNativeElement('TabView', () => require('tns-core-modules/ui/tab-view').TabView);
    registerNativeElement('TabViewItem', () => require('tns-core-modules/ui/tab-view').TabViewItem);
    // NS components which uses the automatic registerElement Vue wrapper
    // as they do not need any special logic
    registerNativeElement('Label', () => require('tns-core-modules/ui/label').Label);
    registerNativeElement('DatePicker', () => require('tns-core-modules/ui/date-picker').DatePicker);
    registerNativeElement('AbsoluteLayout', () => require('tns-core-modules/ui/layouts/absolute-layout').AbsoluteLayout);
    registerNativeElement('ActivityIndicator', () => require('tns-core-modules/ui/activity-indicator').ActivityIndicator);
    registerNativeElement('Border', () => require('tns-core-modules/ui/border').Border);
    registerNativeElement('Button', () => require('tns-core-modules/ui/button').Button);
    registerNativeElement('ContentView', () => require('tns-core-modules/ui/content-view').ContentView);
    registerNativeElement('DockLayout', () => require('tns-core-modules/ui/layouts/dock-layout').DockLayout);
    registerNativeElement('GridLayout', () => require('tns-core-modules/ui/layouts/grid-layout').GridLayout);
    registerNativeElement('HtmlView', () => require('tns-core-modules/ui/html-view').HtmlView);
    registerNativeElement('Image', () => require('tns-core-modules/ui/image').Image);
    registerNativeElement('ListPicker', () => require('tns-core-modules/ui/list-picker').ListPicker);
    registerNativeElement('Placeholder', () => require('tns-core-modules/ui/placeholder').Placeholder);
    registerNativeElement('Progress', () => require('tns-core-modules/ui/progress').Progress);
    registerNativeElement('ProxyViewContainer', () => require('tns-core-modules/ui/proxy-view-container').ProxyViewContainer);
    // registerElement(
    //   'Repeater',
    //   () => require('tns-core-modules/ui/repeater').Repeater
    // )
    registerNativeElement('ScrollView', () => require('tns-core-modules/ui/scroll-view').ScrollView);
    registerNativeElement('SearchBar', () => require('tns-core-modules/ui/search-bar').SearchBar);
    registerNativeElement('SegmentedBar', () => require('tns-core-modules/ui/segmented-bar').SegmentedBar);
    registerNativeElement('SegmentedBarItem', () => require('tns-core-modules/ui/segmented-bar').SegmentedBarItem);
    registerNativeElement('Slider', () => require('tns-core-modules/ui/slider').Slider);
    registerNativeElement('StackLayout', () => require('tns-core-modules/ui/layouts/stack-layout').StackLayout);
    registerNativeElement('FlexboxLayout', () => require('tns-core-modules/ui/layouts/flexbox-layout').FlexboxLayout);
    registerNativeElement('Switch', () => require('tns-core-modules/ui/switch').Switch);
    registerNativeElement('TextField', () => require('tns-core-modules/ui/text-field').TextField);
    registerNativeElement('TextView', () => require('tns-core-modules/ui/text-view').TextView);
    registerNativeElement('TimePicker', () => require('tns-core-modules/ui/time-picker').TimePicker);
    registerNativeElement('WebView', () => require('tns-core-modules/ui/web-view').WebView);
    registerNativeElement('WrapLayout', () => require('tns-core-modules/ui/layouts/wrap-layout').WrapLayout);
    registerNativeElement('FormattedString', () => require('tns-core-modules/text/formatted-string').FormattedString);
    registerNativeElement('Span', () => require('tns-core-modules/text/span').Span);
    registerElement('Frame', () => new FrameElement());
    registerElement('Page', () => new PageElement());
    registerElement('ListView', () => new ListViewElement());
}

class SvelteNativeDocument extends DocumentNode {
    constructor() {
        super();
        this.head = createElement('head');
        this.appendChild(this.head);
        console.log(`created ${this}`);
    }
    createTextNode(text) {
        const el = new TextNode(text);
        console.log(`created ${el}`);
        return el;
    }
    createElementNS(namespace, tagName) {
        return this.createElement(tagName);
    }
    createEvent(type) {
        let e = {};
        e.initCustomEvent = (type, ignored1, ignored2, detail) => {
            e.type = type;
            e.detail = detail;
            e.eventName = type;
        };
        return e;
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function resolveFrame(frameSpec) {
    let targetFrame;
    if (!frameSpec)
        targetFrame = topmost();
    if (frameSpec instanceof FrameElement)
        targetFrame = frameSpec.nativeView;
    if (frameSpec instanceof Frame)
        targetFrame = frameSpec;
    if (typeof frameSpec == "string") {
        targetFrame = getFrameById(frameSpec);
        if (!targetFrame)
            console.error(`Navigate could not find frame with id ${frameSpec}`);
    }
    return targetFrame;
}
function resolveComponentElement(pageSpec, props) {
    let dummy = createElement('fragment');
    let pageInstance = new pageSpec({ target: dummy, props: props });
    let element = dummy.firstElement();
    return { element, pageInstance };
}
function navigate(options) {
    let { frame, page, props = {} } = options, navOptions = __rest(options, ["frame", "page", "props"]);
    let targetFrame = resolveFrame(frame);
    if (!targetFrame) {
        throw new Error("navigate requires frame option to be a native Frame, a FrameElement, a frame Id, or null");
    }
    if (!page) {
        throw new Error("navigage requires page to be set to the svelte component class that implements the page or reference to a page element");
    }
    let { element, pageInstance } = resolveComponentElement(page, props);
    if (!(element instanceof PageElement))
        throw new Error("navigage requires a svelte component with a page element at the root");
    let nativePage = element.nativeView;
    const handler = (args) => {
        if (args.isBackNavigation) {
            nativePage.off('navigatedFrom', handler);
            pageInstance.$destroy();
        }
    };
    nativePage.on('navigatedFrom', handler);
    targetFrame.navigate(Object.assign({}, navOptions, { create: () => nativePage }));
    return pageInstance;
}
function goBack(options = {}) {
    let targetFrame = resolveFrame(options.frame);
    if (!targetFrame) {
        throw new Error("goback requires frame option to be a native Frame, a FrameElement, a frame Id, or null");
    }
    let backStackEntry = null;
    if (options.to) {
        backStackEntry = targetFrame.backStack.find(e => e.resolvedPage === options.to.nativeView);
        if (!backStackEntry) {
            throw new Error("Couldn't find the destination page in the frames backstack");
        }
    }
    return targetFrame.goBack(backStackEntry);
}
const modalStack = [];
function showModal(modalOptions) {
    let { page, props = {} } = modalOptions, options = __rest(modalOptions, ["page", "props"]);
    //Get this before any potential new frames are created by component below
    let modalLauncher = topmost().currentPage;
    let componentInstanceInfo = resolveComponentElement(page, props);
    let modalView = componentInstanceInfo.element.nativeView;
    return new Promise((resolve, reject) => {
        let resolved = false;
        const closeCallback = (result) => {
            if (resolved)
                return;
            resolved = true;
            try {
                componentInstanceInfo.pageInstance.$destroy(); //don't let an exception in destroy kill the promise callback
            }
            finally {
                resolve(result);
            }
        };
        modalStack.push(componentInstanceInfo);
        modalLauncher.showModal(modalView, Object.assign({}, options, { context: {}, closeCallback }));
    });
}
function closeModal(result) {
    let modalPageInstanceInfo = modalStack.pop();
    modalPageInstanceInfo.element.nativeView.closeModal(result);
}

function installGlobalShims() {
    //expose our fake dom as global document for svelte components
    let window = global;
    window.window = global;
    window.document = new SvelteNativeDocument();
    window.requestAnimationFrame = (action) => {
        setTimeout(action, 33); //about 30 fps
    };
    window.getComputedStyle = (node) => {
        return node.nativeView.style;
    };
    window.performance = {
        now() {
            return Date.now();
        }
    };
    window.CustomEvent = class {
        constructor(name, detail = null) {
            this.eventName = name; //event name for nativescript
            this.type = name; // type for svelte
            this.detail = detail;
        }
    };
    return window.document;
}
function initializeDom() {
    registerSvelteElements();
    registerNativeElements();
    return installGlobalShims();
}

export { initializeDom, FrameElement, SvelteNativeDocument, NativeElementNode, registerElement, createElement, ViewNode, navigate, goBack, showModal, closeModal };
