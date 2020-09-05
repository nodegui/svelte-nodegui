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
    () => require('@nativescript/core').ActionItem,
    'actionItems'
  )

  registerNativeViewElement(
    'NavigationButton',
    () => require('@nativescript/core').NavigationButton,
    'navigationButton'
  )


  registerNativeViewElement(
    'TabViewItem',
    () => require('@nativescript/core').TabViewItem
  )

  registerNativeViewElement('Label', () => require('@nativescript/core').Label)
  
  registerNativeViewElement(
    'DatePicker',
    () => require('@nativescript/core').DatePicker,
  )

  registerNativeViewElement(
    'AbsoluteLayout',
    () => require('@nativescript/core').AbsoluteLayout
  )
  registerNativeViewElement(
    'ActivityIndicator',
    () => require('@nativescript/core').ActivityIndicator
  )
  registerNativeViewElement('Button', () => require('@nativescript/core').Button)
  registerNativeViewElement(
    'ContentView',
    () => require('@nativescript/core').ContentView
  )
  registerNativeViewElement(
    'DockLayout',
    () => require('@nativescript/core').DockLayout
  )
  registerNativeViewElement(
    'GridLayout',
    () => require('@nativescript/core').GridLayout
  )
  registerNativeViewElement(
    'HtmlView',
    () => require('@nativescript/core').HtmlView
  )
  registerNativeViewElement('Image', () => require('@nativescript/core').Image)
  registerNativeViewElement(
    'ListPicker',
    () => require('@nativescript/core').ListPicker,
  )

  registerNativeViewElement(
    'Placeholder',
    () => require('@nativescript/core').Placeholder
  )
  registerNativeViewElement(
    'Progress',
    () => require('@nativescript/core').Progress,
  )
  registerNativeViewElement(
    'ProxyViewContainer',
    () => require('@nativescript/core').ProxyViewContainer
  )
  // registerElement(
  //   'Repeater',
  //   () => require('@nativescript/core').Repeater
  // )
  registerNativeViewElement(
    'ScrollView',
    () => require('@nativescript/core').ScrollView
  )
  registerNativeViewElement(
    'SearchBar',
    () => require('@nativescript/core').SearchBar,
  )
  registerNativeViewElement(
    'SegmentedBar',
    () => require('@nativescript/core').SegmentedBar,
    null,
    { "items": NativeElementPropType.Array }
  )
  registerNativeViewElement(
    'SegmentedBarItem',
    () => require('@nativescript/core').SegmentedBarItem,
    "items"
  )
  registerNativeViewElement('Slider', () => require('@nativescript/core').Slider)
  registerNativeViewElement(
    'StackLayout',
    () => require('@nativescript/core').StackLayout
  )
  registerNativeViewElement(
    'FlexboxLayout',
    () => require('@nativescript/core').FlexboxLayout
  )
  registerNativeViewElement('Switch', () => require('@nativescript/core').Switch)

  registerNativeViewElement(
    'TextField',
    () => require('@nativescript/core').TextField,

  )
  registerNativeViewElement(
    'TextView',
    () => require('@nativescript/core').TextView,

  )
  registerNativeViewElement(
    'TimePicker',
    () => require('@nativescript/core').TimePicker,

  )
  registerNativeViewElement(
    'WebView',
    () => require('@nativescript/core').WebView
  )
  registerNativeViewElement(
    'WrapLayout',
    () => require('@nativescript/core').WrapLayout
  )

  registerNativeViewElement('FormattedString', () => require('@nativescript/core').FormattedString, "formattedText", {
    "spans": NativeElementPropType.ObservableArray
  })

  registerNativeViewElement('Span', () => require('@nativescript/core').Span, "spans")

  registerElement('ActionBar', () => new ActionBarElement())
  registerElement('Frame', () => new FrameElement())
  registerElement('Page', () => new PageElement())
  registerElement('ListView', () => new ListViewElement())
  registerElement('TabView', () => new TabViewElement())

  registerElement('BottomNavigation', () => new BottomNavigationElement())
  registerElement('Tabs', () => new TabsElement())
  registerElement('TabStrip', () => new TabStripElement());
  registerNativeViewElement('TabStripItem', () => require('@nativescript/core').TabStripItem);
  registerNativeViewElement('TabContentItem', () => require('@nativescript/core').TabContentItem);
}