import { ListView, ItemEventData, ItemsSource } from 'tns-core-modules/ui/list-view'
import NativeElementNode from "./NativeElementNode";
import TemplateElement from '../svelte/TemplateElement';
import { createElement } from '../basicdom';


export default class ListViewElement extends NativeElementNode {
    constructor() {
        super('listview', ListView, null);

        this.nativeView.on(ListView.itemLoadingEvent, (args) => { this.updateListItem(args as ItemEventData) });
    }

    updateListItem(args: ItemEventData) {
        let item;
        let listView = this.nativeView;
        let items = listView.items;

        if (args.index >= items.length) {
            console.log("Got request for item at index that didn't exists", items, args.index)
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
            let componentInstance = new (this.itemTemplateComponent)({
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

    get itemTemplateComponent(): typeof SvelteComponent {
        const templateNode = this.childNodes.find(x => x instanceof TemplateElement) as TemplateElement
        return templateNode ? templateNode.component : null;
    }

    get nativeView(): ListView {
        return super.nativeView as ListView
    }

    set nativeView(view: ListView) {
        super.nativeView = view
    }
}