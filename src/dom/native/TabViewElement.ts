import { ViewNode, logger as log } from "../basicdom";
import { TabView, TabViewItem } from 'tns-core-modules/ui/tab-view'
import NativeElementNode from "./NativeElementNode";

export default class TabViewElement extends NativeElementNode {

    private needs_update = false;
    constructor() {
        super('TabView', TabView, null);
    }

    doUpdate() {
        let items = this.childNodes.filter(x => x instanceof NativeElementNode && x.nativeView instanceof TabViewItem).map(x => (x as any).nativeView as TabViewItem);
        log.info(`updating tab items. now has ${items.length} items`);
        (this.nativeView as TabView).items = items;
        this.needs_update = false;
    }

    updateItems() {
        this.needs_update = true;
        Promise.resolve().then(() => {
            if (this.needs_update)
                this.doUpdate();
        });
    }

    onInsertedChild(childNode: ViewNode, index: number) {
        //We only want to handle TabViewItem
        if (!(childNode instanceof NativeElementNode && childNode.nativeView instanceof TabViewItem))
            return super.onInsertedChild(childNode, index);
        this.updateItems();
    }

    onRemovedChild(childNode: ViewNode) {
        if (!(childNode instanceof NativeElementNode && childNode.nativeView instanceof TabViewItem))
            return super.onRemovedChild(childNode);
        this.updateItems();
    }
}