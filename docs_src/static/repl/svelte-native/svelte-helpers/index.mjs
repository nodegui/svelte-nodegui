import { current_component, flush } from 'svelte/internal';
import { ListView } from 'tns-core-modules/ui/list-view';
import { createElement } from '../dom';

function proxyEvents(node, events) {
    console.warn("proxyEvents is deprecated");
    let registeredEvents = [];
    for (let type of Object.keys(events)) {
        let thisType = type;
        let handler = (ev) => {
            (events[thisType] || []).forEach(fn => fn(ev));
        };
        node.addEventListener(type, handler);
        registeredEvents.push({ type, handler });
    }
    return {
        destroy() {
            for (let { type, handler } of registeredEvents) {
                node.removeEventListener(type, handler);
            }
        }
    };
}

function getEventHandlers() {
    console.warn("getEventHandlers is deprecated");
    return current_component.$$.callbacks;
}
function forceRender() {
    console.warn("force render is deprecated");
    flush();
}

function componentAsListItem(node, component) {
    const listView = node.nativeView;
    console.warn("componentAsListItem is deprecated, use the Template component from 'svelte-native/components'");
    const updateListItem = (args) => {
        let item;
        let items = listView.items;
        if (args.index >= items.length) {
            console.log("Got request for item at index that didn't exists", this.items, args.index);
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
            let componentInstance = new (component())({
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
    };
    listView.on(ListView.itemLoadingEvent, updateListItem);
    return {
        destroy() {
            listView.off(ListView.itemLoadingEvent, updateListItem);
        }
    };
}

console.warn('svelte-helpers has been deprecated, this stuff is unused by svelte-native');

export { proxyEvents, getEventHandlers, forceRender, componentAsListItem };
