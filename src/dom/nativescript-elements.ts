import { registerElement } from './basicdom'
import { View } from 'tns-core-modules/ui/page'
import FrameElement from './native/FrameElement';
import PageElement from './native/PageElement';
import ListViewElement from './native/ListViewElement';
import TabViewElement from './native/TabViewElement';
import BottomNavigationElement from './native/BottomNavigationElement';
import TabsElement from './native/TabsElement';
import NativeViewElementNode from './native/NativeViewElementNode';
import { NativeElementPropConfig, NativeElementPropType } from './native/NativeElementNode';
import ActionBarElement from './native/ActionBarElement';

export function registerNativeViewElement<T extends View>(elementName: string, resolver: () => new () => T, parentProp: string = null, propConfig: NativeElementPropConfig = {}) {
  registerElement(elementName, () => new NativeViewElementNode(elementName, resolver(), parentProp, propConfig));
}


export function registerNativeElements() {
  registerNativeViewElement(
    'ActionItem',
    () => require('tns-core-modules/ui/action-bar').ActionItem,
    'actionItems'
  )

  registerNativeViewElement(
    'NavigationButton',
    () => require('tns-core-modules/ui/action-bar').NavigationButton,
    'navigationButton'
  )


  registerNativeViewElement(
    'TabViewItem',
    () => require('tns-core-modules/ui/tab-view').TabViewItem
  )

  // NS components which uses the automatic registerElement Vue wrapper
  // as they do not need any special logic

  registerNativeViewElement('Label', () => require('tns-core-modules/ui/label').Label)

  registerNativeViewElement(
    'DatePicker',
    () => require('tns-core-modules/ui/date-picker').DatePicker,
  )

  registerNativeViewElement(
    'AbsoluteLayout',
    () => require('tns-core-modules/ui/layouts/absolute-layout').AbsoluteLayout
  )
  registerNativeViewElement(
    'ActivityIndicator',
    () => require('tns-core-modules/ui/activity-indicator').ActivityIndicator
  )
  registerNativeViewElement('Border', () => require('tns-core-modules/ui/border').Border)
  registerNativeViewElement('Button', () => require('tns-core-modules/ui/button').Button)
  registerNativeViewElement(
    'ContentView',
    () => require('tns-core-modules/ui/content-view').ContentView
  )
  registerNativeViewElement(
    'DockLayout',
    () => require('tns-core-modules/ui/layouts/dock-layout').DockLayout
  )
  registerNativeViewElement(
    'GridLayout',
    () => require('tns-core-modules/ui/layouts/grid-layout').GridLayout
  )
  registerNativeViewElement(
    'HtmlView',
    () => require('tns-core-modules/ui/html-view').HtmlView
  )
  registerNativeViewElement('Image', () => require('tns-core-modules/ui/image').Image)
  registerNativeViewElement(
    'ListPicker',
    () => require('tns-core-modules/ui/list-picker').ListPicker,
  )

  registerNativeViewElement(
    'Placeholder',
    () => require('tns-core-modules/ui/placeholder').Placeholder
  )
  registerNativeViewElement(
    'Progress',
    () => require('tns-core-modules/ui/progress').Progress,
  )
  registerNativeViewElement(
    'ProxyViewContainer',
    () => require('tns-core-modules/ui/proxy-view-container').ProxyViewContainer
  )
  // registerElement(
  //   'Repeater',
  //   () => require('tns-core-modules/ui/repeater').Repeater
  // )
  registerNativeViewElement(
    'ScrollView',
    () => require('tns-core-modules/ui/scroll-view').ScrollView
  )
  registerNativeViewElement(
    'SearchBar',
    () => require('tns-core-modules/ui/search-bar').SearchBar,
  )
  registerNativeViewElement(
    'SegmentedBar',
    () => require('tns-core-modules/ui/segmented-bar').SegmentedBar,
    null,
    { "items": NativeElementPropType.Array }
  )
  registerNativeViewElement(
    'SegmentedBarItem',
    () => require('tns-core-modules/ui/segmented-bar').SegmentedBarItem,
    "items"
  )
  registerNativeViewElement('Slider', () => require('tns-core-modules/ui/slider').Slider)
  registerNativeViewElement(
    'StackLayout',
    () => require('tns-core-modules/ui/layouts/stack-layout').StackLayout
  )
  registerNativeViewElement(
    'FlexboxLayout',
    () => require('tns-core-modules/ui/layouts/flexbox-layout').FlexboxLayout
  )
  registerNativeViewElement('Switch', () => require('tns-core-modules/ui/switch').Switch)

  registerNativeViewElement(
    'TextField',
    () => require('tns-core-modules/ui/text-field').TextField,

  )
  registerNativeViewElement(
    'TextView',
    () => require('tns-core-modules/ui/text-view').TextView,

  )
  registerNativeViewElement(
    'TimePicker',
    () => require('tns-core-modules/ui/time-picker').TimePicker,

  )
  registerNativeViewElement(
    'WebView',
    () => require('tns-core-modules/ui/web-view').WebView
  )
  registerNativeViewElement(
    'WrapLayout',
    () => require('tns-core-modules/ui/layouts/wrap-layout').WrapLayout
  )
  registerNativeViewElement(
    'FormattedString',
    () => require('tns-core-modules/text/formatted-string').FormattedString
  )
  registerNativeViewElement('Span', () => require('tns-core-modules/text/span').Span)

  registerElement('ActionBar', () => new ActionBarElement())
  registerElement('Frame', () => new FrameElement())
  registerElement('Page', () => new PageElement())
  registerElement('ListView', () => new ListViewElement())
  registerElement('TabView', () => new TabViewElement())

  registerElement('BottomNavigation', () => new BottomNavigationElement())
  registerElement('Tabs', () => new TabsElement())
  registerNativeViewElement('TabStrip', () => require('tns-core-modules/ui/tab-navigation-base/tab-strip').TabStrip, "tabStrip", { "items": NativeElementPropType.Array });
  registerNativeViewElement('TabStripItem', () => require('tns-core-modules/ui/tab-navigation-base/tab-strip-item').TabStripItem, "items");
  registerNativeViewElement('TabContentItem', () => require('tns-core-modules/ui/tab-navigation-base/tab-content-item').TabContentItem);

}