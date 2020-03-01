import { ListView, ItemEventData, ItemsSource } from '@nativescript/core/ui/list-view'
import TemplateElement from '../svelte/TemplateElement';
import { createElement, logger as log, ViewNode } from '../basicdom';
import NativeViewElementNode from './NativeViewElementNode';
import { View } from '@nativescript/core/ui/core/view';


export class SvelteKeyedTemplate {
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
        //create a proxy element to eventually contain our item (once we have one to render)
        //TODO is StackLayout the best choice here? 
        log.debug(() => `creating view for key ${this.key}`)
        let wrapper = createElement('StackLayout') as NativeViewElementNode<View>;
        wrapper.setStyle("padding", 0)
        wrapper.setStyle("margin", 0)
        let nativeEl = wrapper.nativeView;
        (nativeEl as any).__SvelteComponentBuilder__ = (props: any) => {
            let instance = new this.component({
                target: wrapper,
                props: props
            });
            (nativeEl as any).__SvelteComponent__ = instance;
        }
        return nativeEl;
    }
}



export default class ListViewElement extends NativeViewElementNode<ListView> {
    constructor() {
        super('listview', ListView);
        this.nativeView.on(ListView.itemLoadingEvent, (args) => { this.updateListItem(args as ItemEventData) });
    }

    updateListItem(args: ItemEventData) {
        let item;
        let listView = this.nativeView;
        let items = listView.items;

        if (args.index >= items.length) {
            log.error(() => `Got request for item at index that didn't exist ${args.index}`)
            return;
        }

        if ((items as ItemsSource).getItem) {
            item = (items as ItemsSource).getItem(args.index);
        } else {
            item = (items as any)[args.index]
        }

        if (!args.view || !(args.view as any).__SvelteComponent__) {
            let component;

            if (args.view && (args.view as any).__SvelteComponentBuilder__) {
                log.debug(() => `instantiating component in keyed view item at ${args.index}`);
                //now we have an item, we can create and mount this component
                (args.view as any).__SvelteComponentBuilder__({ item });
                (args.view as any).__SvelteComponentBuilder__ = null; //free the memory
                return;
            }

            log.debug(() => `creating default view for item at ${args.index}`)
            if (typeof listView.itemTemplates == "object") {
                component = listView.itemTemplates.filter(x => x.key == "default").map(x => (x as SvelteKeyedTemplate).component)[0]
            }

            if (!component) {
                log.error(() => `Couldn't determine component to use for item at ${args.index}`);
                return;
            }
            let wrapper = createElement('ProxyViewContainer') as NativeViewElementNode<View>;
            let componentInstance = new component({
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
            log.debug(() => `updating view for ${args.index} which is a ${args.view}`)
            componentInstance.$set({ item })
        }
    }

    onInsertedChild(childNode: ViewNode, index: number) {
        super.onInsertedChild(childNode, index);
        if (childNode instanceof TemplateElement) {
            let key = childNode.getAttribute('key') || "default"
            log.debug(() => `Adding template for key ${key}`);
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
}