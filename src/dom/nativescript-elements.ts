import { registerElement } from './basicdom'
import NativeElementNode, { ComponentMeta } from './native/NativeElementNode'
import { View } from 'tns-core-modules/ui/page'
import FrameElement from './native/FrameElement';
import PageElement from './native/PageElement';
import ListViewElement from './native/ListViewElement';
import TabViewElement from './native/TabViewElement';

export function registerNativeElement(elementName: string, resolver: () => typeof View, meta: ComponentMeta = null) {
  registerElement(elementName, () => new NativeElementNode(elementName, resolver(), meta));
}


export function registerNativeElements() {
  registerNativeElement(
    'ActionBar',
    () => require('tns-core-modules/ui/action-bar').ActionBar
  )

  registerNativeElement(
    'ActionItem',
    () => require('tns-core-modules/ui/action-bar').ActionItem
  )

  registerNativeElement(
    'NavigationButton',
    () => require('tns-core-modules/ui/action-bar').NavigationButton
  )


  registerNativeElement(
    'TabViewItem',
    () => require('tns-core-modules/ui/tab-view').TabViewItem
  )


  // NS components which uses the automatic registerElement Vue wrapper
  // as they do not need any special logic

  registerNativeElement('Label', () => require('tns-core-modules/ui/label').Label)

  registerNativeElement(
    'DatePicker',
    () => require('tns-core-modules/ui/date-picker').DatePicker,
  )

  registerNativeElement(
    'AbsoluteLayout',
    () => require('tns-core-modules/ui/layouts/absolute-layout').AbsoluteLayout
  )
  registerNativeElement(
    'ActivityIndicator',
    () => require('tns-core-modules/ui/activity-indicator').ActivityIndicator
  )
  registerNativeElement('Border', () => require('tns-core-modules/ui/border').Border)
  registerNativeElement('Button', () => require('tns-core-modules/ui/button').Button)
  registerNativeElement(
    'ContentView',
    () => require('tns-core-modules/ui/content-view').ContentView
  )
  registerNativeElement(
    'DockLayout',
    () => require('tns-core-modules/ui/layouts/dock-layout').DockLayout
  )
  registerNativeElement(
    'GridLayout',
    () => require('tns-core-modules/ui/layouts/grid-layout').GridLayout
  )
  registerNativeElement(
    'HtmlView',
    () => require('tns-core-modules/ui/html-view').HtmlView
  )
  registerNativeElement('Image', () => require('tns-core-modules/ui/image').Image)
  registerNativeElement(
    'ListPicker',
    () => require('tns-core-modules/ui/list-picker').ListPicker,
  )

  registerNativeElement(
    'Placeholder',
    () => require('tns-core-modules/ui/placeholder').Placeholder
  )
  registerNativeElement(
    'Progress',
    () => require('tns-core-modules/ui/progress').Progress,
  )
  registerNativeElement(
    'ProxyViewContainer',
    () => require('tns-core-modules/ui/proxy-view-container').ProxyViewContainer
  )
  // registerElement(
  //   'Repeater',
  //   () => require('tns-core-modules/ui/repeater').Repeater
  // )
  registerNativeElement(
    'ScrollView',
    () => require('tns-core-modules/ui/scroll-view').ScrollView
  )
  registerNativeElement(
    'SearchBar',
    () => require('tns-core-modules/ui/search-bar').SearchBar,
  )
  registerNativeElement(
    'SegmentedBar',
    () => require('tns-core-modules/ui/segmented-bar').SegmentedBar,
  )
  registerNativeElement(
    'SegmentedBarItem',
    () => require('tns-core-modules/ui/segmented-bar').SegmentedBarItem
  )
  registerNativeElement('Slider', () => require('tns-core-modules/ui/slider').Slider)
  registerNativeElement(
    'StackLayout',
    () => require('tns-core-modules/ui/layouts/stack-layout').StackLayout
  )
  registerNativeElement(
    'FlexboxLayout',
    () => require('tns-core-modules/ui/layouts/flexbox-layout').FlexboxLayout
  )
  registerNativeElement('Switch', () => require('tns-core-modules/ui/switch').Switch)

  registerNativeElement(
    'TextField',
    () => require('tns-core-modules/ui/text-field').TextField,

  )
  registerNativeElement(
    'TextView',
    () => require('tns-core-modules/ui/text-view').TextView,

  )
  registerNativeElement(
    'TimePicker',
    () => require('tns-core-modules/ui/time-picker').TimePicker,

  )
  registerNativeElement(
    'WebView',
    () => require('tns-core-modules/ui/web-view').WebView
  )
  registerNativeElement(
    'WrapLayout',
    () => require('tns-core-modules/ui/layouts/wrap-layout').WrapLayout
  )
  registerNativeElement(
    'FormattedString',
    () => require('tns-core-modules/text/formatted-string').FormattedString
  )
  registerNativeElement('Span', () => require('tns-core-modules/text/span').Span)

  registerElement('Frame', () => new FrameElement())
  registerElement('Page', () => new PageElement())
  registerElement('ListView', () => new ListViewElement())
  registerElement('TabView', () => new TabViewElement())
}