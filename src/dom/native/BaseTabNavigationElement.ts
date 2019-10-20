import { ViewNode, logger as log } from "../basicdom";
import { TabNavigationBase } from 'tns-core-modules/ui/tab-navigation-base/tab-navigation-base'
import { TabStrip } from 'tns-core-modules/ui/tab-navigation-base/tab-strip';
import { TabContentItem } from 'tns-core-modules/ui/tab-navigation-base/tab-content-item';
import NativeViewElementNode from "./NativeViewElementNode";

export default class BaseTabNavigationElement extends NativeViewElementNode<TabNavigationBase> {

    constructor(tagName: string, viewClass: new () => TabNavigationBase) {
        super(tagName, viewClass);
    }

    get nativeView(): TabNavigationBase {
        return super.nativeView as TabNavigationBase
    }

    set nativeView(view: TabNavigationBase) {
        super.nativeView = view
    }

    onInsertedChild(childNode: ViewNode, index: number) {
        try {
            if (childNode instanceof NativeViewElementNode && childNode.nativeView instanceof TabStrip) {
                log.debug(`adding tab strip to nav`);
                this.nativeView.tabStrip = childNode.nativeView;
            }

            if (childNode instanceof NativeViewElementNode && childNode.nativeView instanceof TabContentItem) {
                log.debug(`adding tab content to nav`);
                let item = childNode.nativeView;
                //wait for next turn so that any content for our tab is attached to the dom
                Promise.resolve().then(() => {
                    let items = (this.nativeView.items || []).concat([item]);
                    this.nativeView.items = []
                    this.nativeView.items = items;
                });
            }
        } catch (e) {
            console.error(e);
        }

    }

    onRemovedChild(childNode: ViewNode) {
        try {
            if (childNode instanceof NativeViewElementNode && childNode.nativeView instanceof TabStrip) {
                log.debug(`removing tab strip from nav`);
                this.nativeView.tabStrip = null;
            }

            if (childNode instanceof NativeViewElementNode && childNode.nativeView instanceof TabContentItem) {
                log.debug(`removing content item from nav`);
                let items = (this.nativeView.items || []).filter(i => i != childNode.nativeView);
                this.nativeView.items = [];
                this.nativeView.items = items;
            }
        } catch (e) {
            console.error(e);
        }
    }

}
