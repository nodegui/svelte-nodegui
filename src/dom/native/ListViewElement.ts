import { ListView, ItemEventData, ItemsSource } from 'tns-core-modules/ui/list-view'
import NativeElementNode from "./NativeElementNode";
import TemplateElement from '../svelte/TemplateElement';
import { createElement, logger as log, ViewNode } from '../basicdom';
import { View } from 'tns-core-modules/ui/core/view';

class SvelteKeyedTemplate {
    _key: string;
    _templateEl: TemplateElement;

    constructor(key: string, templateEl: TemplateElement) {
        this._key = key;
        this._templateEl = templateEl;
    }

    get component() {
        return this._templateEl.component;
    }

    get key() {
        return this._key
    }

    createView(): View {
        //don't return anything until we try to render
        return null;
    }
}



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
            log.error(`Got request for item at index that didn't exist ${args.index}`)
            return;
        }

        if ((items as ItemsSource).getItem) {
            item = (items as ItemsSource).getItem(args.index);
        } else {
            item = (items as any)[args.index]
        }

        if (!args.view || !(args.view as any).__SvelteComponent__) {
            let component;
            let key: string;
            if (typeof listView.itemTemplateSelector == "function") {
                key = listView.itemTemplateSelector(item, args.index, items);
            } else {
                key = "default"
            }

            log.debug(`creating view for item at ${args.index} using template with key ${key}`)
            if (typeof listView.itemTemplates == "object") {
                component = listView.itemTemplates.filter(x => x.key == key).map(x => (x as SvelteKeyedTemplate).component)[0]
            }

            let wrapper = createElement('StackLayout') as NativeElementNode;
            let componentInstance = new component({
                target: wrapper,
                intro: true,
                props: {
                    item
                }
            });

            let nativeEl = wrapper.nativeView;
            (nativeEl as any).__SvelteComponent__ = componentInstance;
            args.view = nativeEl;
        } else {
            let componentInstance: SvelteComponent = (args.view as any).__SvelteComponent__
            log.debug(`updating view for ${args.index} which is a ${args.view}`)
            componentInstance.$set({ item })
        }
    }

    onInsertedChild(childNode: ViewNode, index: number) {
        super.onInsertedChild(childNode, index);
        if (childNode instanceof TemplateElement) {
            let key = childNode.getAttribute('key') || "default"
            log.debug(`Adding template for key ${key}`);
            if (!this.nativeView.itemTemplates || typeof this.nativeView.itemTemplates == "string") {
                this.nativeView.itemTemplates = []
            }
            this.nativeView.itemTemplates.push(new SvelteKeyedTemplate(key, childNode))
        }
    }

    onRemovedChild(childNode: ViewNode) {
        super.onRemovedChild(childNode);
        if (childNode instanceof TemplateElement) {
            let key = childNode.getAttribute('key') || "default"
            if (this.nativeView.itemTemplates && typeof this.nativeView.itemTemplates != "string") {
                this.nativeView.itemTemplates = this.nativeView.itemTemplates.filter(t => t.key != key);
            }
        }
    }

    get nativeView(): ListView {
        return super.nativeView as ListView
    }

    set nativeView(view: ListView) {
        super.nativeView = view
    }


}