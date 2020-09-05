import { registerElement } from './basicdom'
import FrameElement from './native/FrameElement';
import PageElement from './native/PageElement';
import ListViewElement from './native/ListViewElement';
import TabViewElement from './native/TabViewElement';
import BottomNavigationElement from './native/BottomNavigationElement';
import TabsElement from './native/TabsElement';
import { registerNativeViewElement } from './native/NativeViewElementNode';
import { NativeElementPropType } from './native/NativeElementNode';
import ActionBarElement from './native/ActionBarElement';
import TabStripElement from './native/TabStripElement';



export function registerNativeElements() {
  registerNativeViewElement(
    'ActionItem',
    () => require('@nativescript/core/ui/action-bar').ActionItem,
    'actionItems'
  )

  registerNativeViewElement(
    'NavigationButton',
    () => require('@nativescript/core/ui/action-bar').NavigationButton,
    'navigationButton'
  )


  registerNativeViewElement(
    'TabViewItem',
    () => require('@nativescript/core/ui/tab-view').TabViewItem
  )

  registerNativeViewElement('Label', () => require('@nativescript/core/ui/label').Label)
  
  registerNativeViewElement(
    'DatePicker',
    () => require('@nativescript/core/ui/date-picker').DatePicker,
  )

  registerNativeViewElement(
    'AbsoluteLayout',
    () => require('@nativescript/core/ui/layouts/absolute-layout').AbsoluteLayout
  )
  registerNativeViewElement(
    'ActivityIndicator',
    () => require('@nativescript/core/ui/activity-indicator').ActivityIndicator
  )
  registerNativeViewElement('Button', () => require('@nativescript/core/ui/button').Button)
  registerNativeViewElement(
    'ContentView',
    () => require('@nativescript/core/ui/content-view').ContentView
  )
  registerNativeViewElement(
    'DockLayout',
    () => require('@nativescript/core/ui/layouts/dock-layout').DockLayout
  )
  registerNativeViewElement(
    'GridLayout',
    () => require('@nativescript/core/ui/layouts/grid-layout').GridLayout
  )
  registerNativeViewElement(
    'HtmlView',
    () => require('@nativescript/core/ui/html-view').HtmlView
  )
  registerNativeViewElement('Image', () => require('@nativescript/core/ui/image').Image)
  registerNativeViewElement(
    'ListPicker',
    () => require('@nativescript/core/ui/list-picker').ListPicker,
  )

  registerNativeViewElement(
    'Placeholder',
    () => require('@nativescript/core/ui/placeholder').Placeholder
  )
  registerNativeViewElement(
    'Progress',
    () => require('@nativescript/core/ui/progress').Progress,
  )
  registerNativeViewElement(
    'ProxyViewContainer',
    () => require('@nativescript/core/ui/proxy-view-container').ProxyViewContainer
  )
  // registerElement(
  //   'Repeater',
  //   () => require('@nativescript/core/ui/repeater').Repeater
  // )
  registerNativeViewElement(
    'ScrollView',
    () => require('@nativescript/core/ui/scroll-view').ScrollView
  )
  registerNativeViewElement(
    'SearchBar',
    () => require('@nativescript/core/ui/search-bar').SearchBar,
  )
  registerNativeViewElement(
    'SegmentedBar',
    () => require('@nativescript/core/ui/segmented-bar').SegmentedBar,
    null,
    { "items": NativeElementPropType.Array }
  )
  registerNativeViewElement(
    'SegmentedBarItem',
    () => require('@nativescript/core/ui/segmented-bar').SegmentedBarItem,
    "items"
  )
  registerNativeViewElement('Slider', () => require('@nativescript/core/ui/slider').Slider)
  registerNativeViewElement(
    'StackLayout',
    () => require('@nativescript/core/ui/layouts/stack-layout').StackLayout
  )
  registerNativeViewElement(
    'FlexboxLayout',
    () => require('@nativescript/core/ui/layouts/flexbox-layout').FlexboxLayout
  )
  registerNativeViewElement('Switch', () => require('@nativescript/core/ui/switch').Switch)

  registerNativeViewElement(
    'TextField',
    () => require('@nativescript/core/ui/text-field').TextField,

  )
  registerNativeViewElement(
    'TextView',
    () => require('@nativescript/core/ui/text-view').TextView,

  )
  registerNativeViewElement(
    'TimePicker',
    () => require('@nativescript/core/ui/time-picker').TimePicker,

  )
  registerNativeViewElement(
    'WebView',
    () => require('@nativescript/core/ui/web-view').WebView
  )
  registerNativeViewElement(
    'WrapLayout',
    () => require('@nativescript/core/ui/layouts/wrap-layout').WrapLayout
  )

  registerNativeViewElement('FormattedString', () => require('@nativescript/core').FormattedString, "formattedText", {
    "spans": NativeElementPropType.ObservableArray
  })

  registerNativeViewElement('Span', () => require('@nativescript/core/text/span').Span, "spans")

  registerElement('ActionBar', () => new ActionBarElement())
  registerElement('Frame', () => new FrameElement())
  registerElement('Page', () => new PageElement())
  registerElement('ListView', () => new ListViewElement())
  registerElement('TabView', () => new TabViewElement())

  registerElement('BottomNavigation', () => new BottomNavigationElement())
  registerElement('Tabs', () => new TabsElement())
  registerElement('TabStrip', () => new TabStripElement());
  registerNativeViewElement('TabStripItem', () => require('@nativescript/core/ui/tab-navigation-base/tab-strip-item').TabStripItem);
  registerNativeViewElement('TabContentItem', () => require('@nativescript/core/ui/tab-navigation-base/tab-content-item').TabContentItem);
}