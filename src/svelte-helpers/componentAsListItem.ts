import { ElementNode } from "../dom";
import { ListView, ItemEventData, ItemsSource } from 'tns-core-modules/ui/list-view';

export default function componentAsListItem(node: ElementNode, component: () => typeof SvelteComponent ) {
    if (node.tagName.toLowerCase() != "listview" ) {
        throw new Error("componentAsListItem only valid on listview elements")
    }
   
    console.log("component was", component);
    const listView: ListView =  node.nativeView as ListView;

    const updateListItem = (args: ItemEventData) => {
        let item;
        let items = listView.items;

        if (args.index >= items.length) {
            console.log("Got request for item at index that didn't exists", this.items, args.index)
            return;
        }

        if ((items as ItemsSource).getItem) {
            item = (items as ItemsSource).getItem(args.index);
        } else {
            item = (items as any)[args.index]
        }
  
        if (!args.view) {
            console.log("creating view for ",args.index, item.name, args.view)
            let wrapper = new ElementNode('proxyViewContainer');
            let componentInstance = new (component())({
                target: wrapper,
                props: {
                    item
                }
            });

            let nativeEl = wrapper.nativeView;
            (nativeEl as any).__SvelteComponent__ = componentInstance;
            args.view = nativeEl;
        } else {
            console.log("updating view for ",args.index, item.name, args.view)
            let componentInstance:SvelteComponent = (args.view as any).__SvelteComponent__
            console.log("updating view for ",args.index, item.name, args.view, componentInstance)
            componentInstance.$set({item})
        }
    }

    listView.on(ListView.itemLoadingEvent, updateListItem);

    return {
        destroy() {
            listView.off(ListView.itemLoadingEvent, updateListItem);
        }
    }
}