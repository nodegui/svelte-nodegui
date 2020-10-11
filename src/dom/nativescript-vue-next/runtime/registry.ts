import {
    View as TNSView,
    Frame as TNSFrame,
    Page as TNSPage,
    ViewBase as TNSViewBase,
    FormattedString as TNSFormattedString,
    Span as TNSSpan,
    ActionBar as TNSActionBar,
    ActionItem as TNSActionItem,
    NavigationButton as TNSNavigationButton,
    Tabs as TNSTabs,
    TabView as TNSTabView,
    TabViewItem as TNSTabViewItem,
    TabStrip as TNSTabStrip,
    TabStripItem as TNSTabStripItem,
    Label as TNSLabel,
    Image as TNSImage,
    BottomNavigation as TNSBottomNavigation,
    TabContentItem as TNSTabContentItem,
    NavigationContext as TNSNavigationContext,
    NavigationEntry as TNSNavigationEntry,
    BackstackEntry as TNSBackstackEntry,
} from '@nativescript/core';
import { NSVElement, NSVViewFlags } from './nodes'
// import { actionBarNodeOps } from './components/ActionBar'
// import { warn } from '@vue/runtime-core'
import { warn } from "../../shared/Logger";

export type NSVElementResolver = () => TNSViewBase

export type NSVModelDescriptor = {
    prop: string
    event: string
}

export interface NSVViewMeta {
    viewFlags: NSVViewFlags
    nodeOps?: {
        insert(child: NSVElement, parent: NSVElement, atIndex?: number): void
        remove(child: NSVElement, parent: NSVElement): void
    }
    model?: NSVModelDescriptor
    overwriteExisting?: boolean
}

export interface NSVElementDescriptor {
    meta: NSVViewMeta
    resolver?: NSVElementResolver
}

export let defaultViewMeta: NSVViewMeta = {
    viewFlags: NSVViewFlags.NONE,
}

let elementMap: Record<string, NSVElementDescriptor> = {}

export function getViewMeta(elementName: string): NSVViewMeta {
    // console.log(`->getViewMeta(${elementName})`)

    const normalizedName = normalizeElementName(elementName)

    const entry = elementMap[normalizedName]

    if (!entry) {
        throw new Error(`No known component for element ${elementName}.`)
    }

    return entry.meta
}

export function getViewClass(elementName: string): any {
    // console.log(`->getViewClass(${elementName})`)
    const normalizedName = normalizeElementName(elementName)
    const entry = elementMap[normalizedName]

    if (!entry) {
        throw new Error(`No known component for element ${elementName}.`)
    }

    try {
        return entry.resolver!()
    } catch (e) {
        throw new Error(`Could not load view for: ${elementName}. ${e}`)
    }
}

export function normalizeElementName(elementName: string): string {
    return elementName.replace(/-/g, '').toLowerCase()
}

export function registerElement(
    elementName: string,
    resolver?: NSVElementResolver,
    meta?: Partial<NSVViewMeta>
) {
    const normalizedName = normalizeElementName(elementName)
    const mergedMeta = Object.assign({}, defaultViewMeta, meta)

    if (elementMap[normalizedName] && !mergedMeta.overwriteExisting) {
        throw new Error(
            `Element for ${elementName} already registered.\n` +
                `If this is intentional set 'overwriteExisting: true' in 'meta'`
        )
    }

    elementMap[normalizedName] = {
        meta: mergedMeta,
        resolver,
    }
    // console.log(`->registerElement(${elementName})`)
}

export function isKnownView(elementName: string): boolean {
    return elementMap.hasOwnProperty(normalizeElementName(elementName))
}

type TNSFramePrivate = any & TNSFrame & {
    _navigationQueue: TNSNavigationContext[],
    _backStack: TNSBackstackEntry[], // backStack just returns a copy.
    _currentEntry: TNSBackstackEntry|undefined,
    isCurrent: (entry: TNSBackstackEntry) => boolean,
    _removeEntry: (entry: TNSBackstackEntry) => void,
};

// register built in elements
// prettier-ignore
if (!__TEST__) {
    // layouts
    registerElement(
        'absoluteLayout',
        () => require('@nativescript/core').AbsoluteLayout,
        { viewFlags: NSVViewFlags.LAYOUT_VIEW }
    )
    registerElement(
        'dockLayout',
        () => require('@nativescript/core').DockLayout,
        { viewFlags: NSVViewFlags.LAYOUT_VIEW }
    )
    registerElement(
        'flexboxLayout',
        () => require('@nativescript/core').FlexboxLayout,
        { viewFlags: NSVViewFlags.LAYOUT_VIEW }
    )
    registerElement(
        'gridLayout',
        () => require('@nativescript/core').GridLayout,
        { viewFlags: NSVViewFlags.LAYOUT_VIEW }
    )
    registerElement(
        'stackLayout',
        () => require('@nativescript/core').StackLayout,
        { viewFlags: NSVViewFlags.LAYOUT_VIEW }
    )
    registerElement(
        'wrapLayout',
        () => require('@nativescript/core').WrapLayout,
        { viewFlags: NSVViewFlags.LAYOUT_VIEW }
    )

    // ContentViews
    registerElement(
        'contentView',
        () => require('@nativescript/core').ContentView,
        { viewFlags: NSVViewFlags.CONTENT_VIEW }
    )
    registerElement(
        'scrollView',
        () => require('@nativescript/core').ScrollView,
        { viewFlags: NSVViewFlags.CONTENT_VIEW }
    )

    registerElement(
        'actionBar',
        () => require('@nativescript/core').ActionBar,
        {
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<TNSActionBar>, atIndex?: number): void {
                    const actionBar = parent.nativeView;

                    if(child.nodeRole === "navigationButton"){
                        if(child.nativeView instanceof TNSNavigationButton){
                            actionBar.navigationButton = child.nativeView;
                        } else {
                            if (__DEV__) {
                                warn(
                                    `Unable to add child "${child.nativeView.constructor.name}" as the navigationButton of <actionBar> as it is not an instance of NavigationButton.`
                                );
                            }
                        }
                    } else if(child.nodeRole === "actionItems"){
                        if(child.nativeView instanceof TNSActionItem === false){
                            if (__DEV__) {
                                warn(
                                    `Unable to add child "${child.nativeView.constructor.name}" to the actionItems of <actionBar> as it is not an instance of ActionItem.`
                                );
                            };
                            return;
                        }

                        /**
                         * The implementation shows that getItems() returns a clone of the array, conforming to Array.
                         * @see action-bar-common.js
                         */
                        const existingItems: TNSActionItem[] = actionBar.actionItems.getItems();

                        if(typeof atIndex === "undefined" || atIndex === existingItems.length){
                            /**
                             * The implementation shows that addItem() acts as Array.prototype.push().
                             * @see action-bar-common.js
                             */
                            actionBar.actionItems.addItem(child.nativeView as TNSActionItem);
                        } else {
                            /**
                             * actionBar.actionItems doesn't publicly expose a splice() API, so we'll have to do things the hard way.
                             */
                            const updatedItems: TNSActionItem[] = actionBar.actionItems.getItems();
                            updatedItems.splice(
                                atIndex,
                                0,
                                child.nativeView as TNSActionItem
                            );
    
                            existingItems.forEach(actionItem => actionBar.actionItems.removeItem(actionItem));
                            updatedItems.forEach(actionItem => actionBar.actionItems.addItem(actionItem));
                        }
                    } else if(child.nodeRole === "actionItem"){
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <actionBar> as it had the nodeRole "actionItem"; please correct it to "actionItems".`
                            );
                        }
                    } else if(child.nodeRole === "titleView"){
                        actionBar.titleView = child.nativeView as TNSView;
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <actionBar> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "navigationButton", "actionItems", or "titleView".`
                            )
                        }
                    }
                },
                remove(child: NSVElement, parent: NSVElement<TNSActionBar>): void {
                    const actionBar = parent.nativeView as TNSActionBar;

                    if(child.nodeRole === "navigationButton"){
                        actionBar.navigationButton = null; // Anything falsy should work.
                    } else if(child.nodeRole === "actionItems"){
                        actionBar.actionItems.removeItem(child.nativeView as TNSActionItem);
                    } else if(child.nodeRole === "actionItem"){
                        if (__DEV__) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <actionBar> as it had the nodeRole "actionItem"; please correct it to "actionItems".`
                            );
                        }
                    } else if(child.nodeRole === "titleView"){
                        actionBar.titleView = null; // Anything falsy should work.
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <actionBar> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "navigationButton", "actionItems", or "titleView".`
                            )
                        }
                    }
                }
            }
        }
    )
    registerElement(
        'actionItem',
        () => require('@nativescript/core').ActionItem
        // _addChildFromBuilder and removeChild both refer to actionView, so no strict need for nodeOps here.
    )
    registerElement(
        'navigationButton',
        () => require('@nativescript/core').NavigationButton
        // _addChildFromBuilder and removeChild both refer to actionView, so no strict need for nodeOps here.
    )

    // navigation
    registerElement(
        'frame',
        () => require('@nativescript/core').Frame,
        {
            // todo: move into Frame.ts when we end up creating a component for Frame
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<TNSFrame>, atIndex?: number): void {
                    // console.log(`[frame.insert] ${parent}.childNodes updating to: [${parent.childNodes}]`);
                    const frame = parent.nativeView;
                    const page = child.nativeView as TNSPage;
                    if (child.nativeView instanceof TNSPage) {
                        if(typeof atIndex === "undefined"){
                            // console.log(`[frame.insert] ${parent} > ${child} @${atIndex} √`);
                            frame.navigate({
                                create() {
                                    return child.nativeView as TNSView
                                }
                            })
                            return;
                        } else {
                            if (__DEV__) {
                                warn(`NativeScript Core does not support splicing pages into frames. Can't add page to index ${atIndex}.`);
                            }
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `<frame> must only contain <page> elements - ` +
                                `got <${child.nativeView.constructor.name}> instead.`
                            )
                        }
                    }
                    // console.log(`[frame.insert] ${parent} > ${child} @${atIndex} x`);
                },
                /**
                 * This is a best-of-a-bad-job. NativeScript Core implements push & pop, and
                 * replacement (but only of the topmost, currentEntry of the stack). The latter
                 * was only implemented for HMR purposes.
                 * 
                 * We can splice frame._backStack (belonging to frame-common.ts), but it doesn't
                 * update the logic of the frame.ios.ts and frame.android.ts native implementations.
                 */
                remove(child: NSVElement, parent: NSVElement<TNSFramePrivate>): void {
                    // console.log(`[frame.remove] ${parent}.childNodes updating to: [${parent.childNodes}]`);

                    const frame = parent.nativeView as TNSFramePrivate;
                    const page = child.nativeView as TNSPage;

                    if(frame._currentEntry && frame._currentEntry.resolvedPage === page){
                        // console.log(`[frame.remove] ${parent} x ${child} √`);
                        frame.goBack();
                    } else {
                        /* There's actually valid reason to no-op here:
                         * We might simply be trying to pop a child page in response to a native pop having occurred. */
                        // console.log(`[frame.remove] ${parent} x ${child} x`);
                        return;
                    }
                }
            }
        }
    )
    registerElement(
        'page',
        () => require('@nativescript/core').Page,
        {
            viewFlags: NSVViewFlags.CONTENT_VIEW,
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<TNSPage>, atIndex?: number): void {
                    const page = parent.nativeView;

                    if(typeof atIndex === "number" && atIndex > 0){
                        if (__DEV__) {
                            warn(
                                `Cannot add child "${child.nativeView.constructor.name}" to Page, as Page only accepts a single child. ` +
                                `If you wish to add more than one child to a Page, wrap them in a LayoutBase like <stackLayout>.`
                            )
                        }
                        return;
                    }

                    if (child.nodeRole === "actionBar" || child.nativeView instanceof TNSActionBar) {
                        page.actionBar = child.nativeView as TNSActionBar;
                    } else {
                        page.content = child.nativeView as TNSView;
                    }
                },
                remove(child: NSVElement, parent: NSVElement<TNSPage>): void {
                    const page = parent.nativeView;
                    if (child.nodeRole === "actionBar" || child.nativeView instanceof TNSActionBar) {
                        /* Well we could technically do this, but it'd be better to just teach good practices. */
                        // page.actionBar = new TNSActionBar();
                        
                        if (__DEV__) {
                            warn(
                                `Unable to remove ActionBar from Page; not supported by NativeScript Core. ` +
                                `You may prefer to set page.actionBarHidden = true instead.`
                            )
                        }
                    } else {
                        page.content = null;
                    }
                }
            }
        }
    )

    // html
    registerElement(
        'htmlView',
        () => require('@nativescript/core').HtmlView
    )
    registerElement(
        'webView',
        () => require('@nativescript/core').WebView
    )

    // components
    registerElement(
        'activityIndicator',
        () => require('@nativescript/core').ActivityIndicator
    )
    registerElement(
        'button',
        () => require('@nativescript/core').Button
    )
    registerElement(
        'datePicker',
        () => require('@nativescript/core').DatePicker,
        {
            model: {
                prop: 'date',
                event: 'dateChange'
            }
        }
    )
    registerElement(
        'formattedString',
        () => require('@nativescript/core').FormattedString,
        {
            // todo: move into FormattedString.ts when we end up creating a component for FormattedString
            /**
             * The default parentView._addChildFromBuilder() seems to handle the case of pushing a new child in.
             * It might even handle the case of splicing a child into place. I wasn't able to check.
             */
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement, atIndex?: number): void {
                    const formattedString = parent.nativeView as TNSFormattedString
                    if (child.nativeView instanceof TNSSpan) {
                        const spansLength: number = formattedString.spans.length;
                        formattedString.spans.splice(
                            typeof atIndex === "undefined" ? 
                                spansLength :
                                atIndex,
                            0,
                            child.nativeView
                        );
                    } else {
                        if (__DEV__) {
                            warn(
                                `<formattedString> must only contain <span> elements - ` +
                                `got <${child.nativeView.constructor.name}> instead.`
                            )
                        }
                    }
                },
                /**
                 * The default parentView._removeView() crashes upon removing a span.
                 * This implementation addresses that.
                 */
                remove(child: NSVElement, parent: NSVElement): void {
                    const formattedString = parent.nativeView as TNSFormattedString
                    if (child.nativeView instanceof TNSSpan) {
                        const childIndex: number = formattedString.spans.indexOf(child.nativeView);
                        formattedString.spans.splice(childIndex, 1);
                    } else {
                        if (__DEV__) {
                            warn(
                                `<formattedString> must only contain <span> elements - ` +
                                `got <${child.nativeView.constructor.name}> instead.`
                            )
                        }
                    }
                }
            }
        }
    )
    registerElement(
        'image',
        () => require('@nativescript/core').Image
    )
    registerElement(
        'label',
        () => require('@nativescript/core').Label
    )
    registerElement(
        'listPicker',
        () => require('@nativescript/core').ListPicker,
        {
            model: {
                prop: 'selectedIndex',
                event: 'selectedIndexChange'
            }
        }
    )
    registerElement(
        'listView',
        () => require('@nativescript/core').ListView,
        {
            viewFlags: NSVViewFlags.NO_CHILDREN
        }
    )
    registerElement(
        'placeholder',
        () => require('@nativescript/core').Placeholder,
    )
    registerElement(
        'progress',
        () => require('@nativescript/core').Progress
    )
    registerElement(
        'searchBar',
        () => require('@nativescript/core').SearchBar,
        {
            model: {
                prop: 'text',
                event: 'textChange',
            }
        }
    )
    registerElement(
        'segmentedBar',
        () => require('@nativescript/core').SegmentedBar,
        {
            model: {
                prop: 'selectedIndex',
                event: 'selectedIndexChange',
            }
        }
    )
    registerElement(
        'segmentedBarItem',
        () => require('@nativescript/core').SegmentedBarItem,
    )
    registerElement(
        'slider',
        () => require('@nativescript/core').Slider,
        {
            model: {
                prop: 'value',
                event: 'valueChange',
            }
        }
    )
    registerElement(
        'span',
        () => require('@nativescript/core').Span,
    )
    registerElement(
        'switch',
        () => require('@nativescript/core').Switch,
        {
            model: {
                prop: 'checked',
                event: 'checkedChange',
            }
        }
    )
    registerElement(
        'textField',
        () => require('@nativescript/core').TextField,
        {
            model: {
                prop: 'text',
                event: 'textChange',
            }
        }
    )
    registerElement(
        'textView',
        () => require('@nativescript/core').TextView,
        {
            model: {
                prop: 'text',
                event: 'textChange',
            },
        }
    )
    registerElement(
        'timePicker',
        () => require('@nativescript/core').TimePicker,
        {
            model: {
                prop: 'time',
                event: 'timeChange',
            },
        }
    )

    registerElement(
        'tabView',
        () => require('@nativescript/core').TabView,
        {
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<TNSTabView>, atIndex?: number): void {
                    const tabView = parent.nativeView;
                    
                    if(child.nodeRole === "items"){
                        if(child.nativeView instanceof TNSTabViewItem === false){
                            if (__DEV__) {
                                warn(
                                    `Unable to add child "${child.nativeView.constructor.name}" to the items of <tabView> as it is not an instance of TabViewItem.`
                                );
                            };
                            return;
                        }

                        const items = tabView.items || []; // Annoyingly, it's the consumer's responsibility to ensure there's an array there!

                        if(typeof atIndex === "undefined" || atIndex === items.length){
                            tabView.items = items.concat(child.nativeView as TNSTabViewItem);
                        } else {
                            tabView.items = items.slice().splice(
                                atIndex,
                                0,
                                child.nativeView as TNSTabViewItem
                            );
                        }
                    } else if(child.nodeRole === "item"){
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <tabView> as it had the nodeRole "item"; please correct it to "items".`
                            );
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <tabView> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "items".`
                            )
                        }
                    }
                },
                remove(child: NSVElement, parent: NSVElement<TNSTabView>): void {
                    const tabView = parent.nativeView;

                    if(child.nodeRole === "items"){
                        tabView.items = (tabView.items || []).filter(i => i !== child.nativeView);
                    } else if(child.nodeRole === "item"){
                        if (__DEV__) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <tabView> as it had the nodeRole "item"; please correct it to "items".`
                            );
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <tabView> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "items"`
                            )
                        }
                    }
                }
            }
        }
    )

    registerElement(
        'tabViewItem',
        () => require('@nativescript/core').TabViewItem,
        {
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<TNSTabViewItem>, atIndex?: number): void {
                    const tabViewItem = parent.nativeView;

                    if(child.nodeRole === "view"){
                        if(child.nativeView instanceof TNSView){
                            tabViewItem.view = child.nativeView;
                        } else {
                            if (__DEV__) {
                                warn(
                                    `Unable to add child "${child.nativeView.constructor.name}" as the view of <tabViewItem> as it is not an instance of View.`
                                );
                            }
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <tabViewItem> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "view".`
                            )
                        }
                    }
                },
                remove(child: NSVElement, parent: NSVElement<TNSTabViewItem>): void {
                    const tabViewItem = parent.nativeView;

                    if(child.nodeRole === "view"){
                        // tabViewItem.view = null; // Anything falsy should work.
                        if (__DEV__) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <tabViewItem> as NativeScript Core does not support it; ` +
                                `please re-use and modify the existing TabViewItem instead.`
                            )
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <tabViewItem> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "view".`
                            )
                        }
                    }
                }
            }
        }
    )

    registerElement(
        'tabStrip',
        () => require('@nativescript/core').TabStrip,
        {
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<TNSTabStrip>, atIndex?: number): void {
                    const tabStrip = parent.nativeView;

                    if(child.nodeRole === "items"){
                        if(child.nativeView instanceof TNSTabStripItem === false){
                            if (__DEV__) {
                                warn(
                                    `Unable to add child "${child.nativeView.constructor.name}" to the items of <tabStrip> as it is not an instance of TabStripItem.`
                                );
                            };
                            return;
                        }

                        const items = tabStrip.items || []; // Annoyingly, it's the consumer's responsibility to ensure there's an array there!

                        if(typeof atIndex === "undefined" || atIndex === items.length){
                            tabStrip.items = items.concat(child.nativeView as TNSTabStripItem);
                        } else {
                            tabStrip.items = items.slice().splice(
                                atIndex,
                                0,
                                child.nativeView as TNSTabStripItem
                            );
                        }
                    } else if(child.nodeRole === "item"){
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <tabStrip> as it had the nodeRole "item"; please correct it to "items".`
                            );
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <tabStrip> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "tabStrip", or "items".`
                            )
                        }
                    }
                },
                remove(child: NSVElement, parent: NSVElement<TNSTabStrip>): void {
                    const tabs = parent.nativeView;

                    if(child.nodeRole === "items"){
                        tabs.items = (tabs.items || []).filter(i => i !== child.nativeView);
                    } else if(child.nodeRole === "item"){
                        if (__DEV__) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <tabStrip> as it had the nodeRole "item"; please correct it to "items".`
                            );
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <tabStrip> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "tabStrip", or "items"`
                            )
                        }
                    }
                }
            }
        }
    )


    registerElement(
        'tabStripItem',
        () => require('@nativescript/core').TabStripItem,
        {
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<TNSTabStripItem>, atIndex?: number): void {
                    const tabStripItem = parent.nativeView;

                    // Note: The instanceof check, and nodeRole check, is technically redundant if you look at the implementation, but I'll
                    //       keep these good practices in case it's ever refactored.

                    if(child.nodeRole === "label"){
                        if(child.nativeView instanceof TNSLabel === false){
                            if (__DEV__) {
                                warn(
                                    `Unable to add child "${child.nativeView.constructor.name}" to the items of <tabStripItem> as it is not an instance of Label.`
                                );
                            };
                            return;
                        }

                        tabStripItem.label = child.nativeView as TNSLabel;
                    } else if(child.nodeRole === "image"){
                        if(child.nativeView instanceof TNSImage === false){
                            if (__DEV__) {
                                warn(
                                    `Unable to add child "${child.nativeView.constructor.name}" to the items of <tabStripItem> as it is not an instance of Image.`
                                );
                            };
                            return;
                        }

                        tabStripItem.image = child.nativeView as TNSImage;
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <tabStripItem> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "label", or "image".`
                            )
                        }
                    }
                },
                remove(child: NSVElement, parent: NSVElement<TNSTabStripItem>): void {
                    const tabStripItem = parent.nativeView;

                    if(child.nodeRole === "label"){
                        // WARNING: It is not evident from the implementation that TabStripItem supports removing label at all!
                        tabStripItem.label = null;
                    } else if(child.nodeRole === "image"){
                        // WARNING: It is not evident from the implementation that TabStripItem supports removing image at all!
                        tabStripItem.image = null;
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <tabStripItem> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "label", or "image"`
                            )
                        }
                    }
                }
            }
        }
    )

    registerElement(
        'tabs',
        () => require('@nativescript/core').Tabs,
        {
            // TODO: share the same NodeOps for both BottomNavigation and Tabs; they're identical as they both extend TabNavigationBase.
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<TNSTabs>, atIndex?: number): void {
                    const tabs = parent.nativeView;

                    if(child.nodeRole === "tabStrip"){
                        if(child.nativeView instanceof TNSTabStrip){
                            tabs.tabStrip = child.nativeView;
                        } else {
                            if (__DEV__) {
                                warn(
                                    `Unable to add child "${child.nativeView.constructor.name}" as the tabStrip of <tabs> as it is not an instance of TabStrip.`
                                );
                            }
                        }
                    } else if(child.nodeRole === "items"){
                        if(child.nativeView instanceof TNSTabContentItem === false){
                            if (__DEV__) {
                                warn(
                                    `Unable to add child "${child.nativeView.constructor.name}" to the items of <tabs> as it is not an instance of TabContentItem.`
                                );
                            };
                            return;
                        }

                        const items = tabs.items || []; // Annoyingly, it's the consumer's responsibility to ensure there's an array there!
                        if(typeof atIndex === "undefined" || atIndex === items.length){
                            tabs.items = items.concat(child.nativeView as TNSTabContentItem);
                        } else {
                            tabs.items = items.slice().splice(
                                atIndex,
                                0,
                                child.nativeView as TNSTabContentItem
                            );
                        }
                    } else if(child.nodeRole === "item"){
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <tabs> as it had the nodeRole "item"; please correct it to "items".`
                            );
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <tabs> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "tabStrip", or "items".`
                            )
                        }
                    }
                },
                remove(child: NSVElement, parent: NSVElement): void {
                    const tabs = parent.nativeView as TNSTabs;

                    if(child.nodeRole === "tabStrip"){
                        tabs.tabStrip = null; // Anything falsy should work.
                    } else if(child.nodeRole === "items"){
                        tabs.items = (tabs.items || []).filter(i => i !== child.nativeView);
                    } else if(child.nodeRole === "item"){
                        if (__DEV__) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <tabs> as it had the nodeRole "item"; please correct it to "items".`
                            );
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <tabs> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "tabStrip", or "items"`
                            )
                        }
                    }
                }
            }
        }
    )

    registerElement(
        'tabContentItem',
        () => require('@nativescript/core').TabContentItem,
        { viewFlags: NSVViewFlags.CONTENT_VIEW }
    )

    registerElement(
        'bottomNavigation',
        () => require('@nativescript/core').BottomNavigation,
        {
            // TODO: share the same NodeOps for both BottomNavigation and Tabs; they're identical as they both extend TabNavigationBase.
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<TNSBottomNavigation>, atIndex?: number): void {
                    const bottomNavigation = parent.nativeView;

                    if(child.nodeRole === "tabStrip"){
                        if(child.nativeView instanceof TNSTabStrip){
                            bottomNavigation.tabStrip = child.nativeView;
                        } else {
                            if (__DEV__) {
                                warn(
                                    `Unable to add child "${child.nativeView.constructor.name}" as the tabStrip of <bottomNavigation> as it is not an instance of TabStrip.`
                                );
                            }
                        }
                    } else if(child.nodeRole === "items"){
                        if(child.nativeView instanceof TNSTabContentItem === false){
                            if (__DEV__) {
                                warn(
                                    `Unable to add child "${child.nativeView.constructor.name}" to the items of <bottomNavigation> as it is not an instance of TabContentItem.`
                                );
                            };
                            return;
                        }

                        const items = bottomNavigation.items || []; // Annoyingly, it's the consumer's responsibility to ensure there's an array there!
                        
                        if(typeof atIndex === "undefined" || atIndex === items.length){
                            bottomNavigation.items = items.concat(child.nativeView as TNSTabContentItem);
                        } else {
                            bottomNavigation.items = items.slice().splice(
                                atIndex,
                                0,
                                child.nativeView as TNSTabContentItem
                            );
                        }
                    } else if(child.nodeRole === "item"){
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <bottomNavigation> as it had the nodeRole "item"; please correct it to "items".`
                            );
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <bottomNavigation> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "tabStrip", or "items".`
                            )
                        }
                    }
                },
                remove(child: NSVElement, parent: NSVElement<TNSTabs>): void {
                    const tabs = parent.nativeView;

                    if(child.nodeRole === "tabStrip"){
                        tabs.tabStrip = null; // Anything falsy should work.
                    } else if(child.nodeRole === "items"){
                        tabs.items = (tabs.items || []).filter(i => i !== child.nativeView);
                    } else if(child.nodeRole === "item"){
                        if (__DEV__) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <bottomNavigation> as it had the nodeRole "item"; please correct it to "items".`
                            );
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <bottomNavigation> as it does not have a nodeRole specified; ` +
                                `please set a nodeRole of "tabStrip", or "items"`
                            )
                        }
                    }
                }
            }
        }
    )
}
// todo: more
