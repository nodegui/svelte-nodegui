import { ListView, ItemEventData, ItemsSource } from 'tns-core-modules/ui/list-view';
import { NativeElementNode, createElement } from "../dom";

export default function componentAsListItem(node: NativeElementNode, component: () => typeof SvelteComponent) {
    const listView: ListView = node.nativeView as ListView;

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

        if (!args.view || !(args.view as any).__SvelteComponent__) {
            console.log("creating view for ", args.index, item.name)
            let wrapper = createElement('StackLayout') as NativeElementNode;
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
            let componentInstance: SvelteComponent = (args.view as any).__SvelteComponent__
            console.log("updating view for ", args.index, item.name, args.view)
            componentInstance.$set({ item })
        }
    }

    listView.on(ListView.itemLoadingEvent, updateListItem);

    return {
        destroy() {
            listView.off(ListView.itemLoadingEvent, updateListItem);
        }
    }
}