import { ViewNode, logger as log } from "../basicdom";
import { TabStrip, TabStripItem } from '@nativescript/core';

import NativeViewElementNode from "./NativeViewElementNode";

export default class TabStripElement extends NativeViewElementNode<TabStrip> {

    constructor() {
        super("TabStrip", TabStrip, null);
    }

    onInsertedChild(childNode: ViewNode, index: number) {
        // As of @nativescript/core 6.1.2 setting a new array here doesn't set the parent property of any new tabstripitems
        // and causes a crash. a workaround suggested https://github.com/NativeScript/NativeScript/issues/7608
        // is to set items to [] before setting it to the new array.
        try {
            if (childNode instanceof NativeViewElementNode && childNode.nativeView instanceof TabStripItem) {
                log.debug(() => `adding tab strip item ${childNode.nativeView.title}`);
                const items = this.nativeView.items || [];
                this.nativeView.items = [];
                this.nativeView.items = items.concat([childNode.nativeView]);
                return;
            }
        } catch (e) {
            console.error(e);
        }
        super.onInsertedChild(childNode, index);
    }

    onRemovedChild(childNode: ViewNode) {
        try {
            if (childNode instanceof NativeViewElementNode && childNode.nativeView instanceof TabStripItem) {
                log.debug(() => `removing tab strip item ${childNode.nativeView.title}`);
                let items = (this.nativeView.items || []).filter(i => i != childNode.nativeView);
                this.nativeView.items = [];
                this.nativeView.items = items;
            }
        } catch (e) {
            console.error(e);
        }
        super.onRemovedChild(childNode);
    }

}