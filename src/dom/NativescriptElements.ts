import { registerCustomElementNode } from './basicdom'
import NativeElementNode, { ComponentMeta } from './NativeElementNode'
import { View } from 'tns-core-modules/ui/page/page'
import FrameElement from './FrameElement';

export function registerElement(elementName: string, resolver: () => typeof View, meta: ComponentMeta = null) {
  registerCustomElementNode(elementName, () => new NativeElementNode(elementName, resolver(), meta));
}


export function registerNativeElements() {
  registerElement(
    'ActionBar',
    () => require('tns-core-modules/ui/action-bar').ActionBar
  )

  registerElement(
    'ActionItem',
    () => require('tns-core-modules/ui/action-bar').ActionItem
  )


  registerElement(
    'ListView',
    () => require('tns-core-modules/ui/list-view').ListView
  )

  registerElement(
    'NavigationButton',
    () => require('tns-core-modules/ui/action-bar').NavigationButton
  )

  registerElement(
    'TabView',
    () => require('tns-core-modules/ui/tab-view').TabView
  )

  registerElement(
    'TabViewItem',
    () => require('tns-core-modules/ui/tab-view').TabViewItem
  )


  // NS components which uses the automatic registerElement Vue wrapper
  // as they do not need any special logic

  registerElement('Label', () => require('tns-core-modules/ui/label').Label)

  registerElement(
    'DatePicker',
    () => require('tns-core-modules/ui/date-picker').DatePicker,
  )

  registerElement(
    'AbsoluteLayout',
    () => require('tns-core-modules/ui/layouts/absolute-layout').AbsoluteLayout
  )
  registerElement(
    'ActivityIndicator',
    () => require('tns-core-modules/ui/activity-indicator').ActivityIndicator
  )
  registerElement('Border', () => require('tns-core-modules/ui/border').Border)
  registerElement('Button', () => require('tns-core-modules/ui/button').Button)
  registerElement(
    'ContentView',
    () => require('tns-core-modules/ui/content-view').ContentView
  )
  registerElement(
    'DockLayout',
    () => require('tns-core-modules/ui/layouts/dock-layout').DockLayout
  )
  registerElement(
    'GridLayout',
    () => require('tns-core-modules/ui/layouts/grid-layout').GridLayout
  )
  registerElement(
    'HtmlView',
    () => require('tns-core-modules/ui/html-view').HtmlView
  )
  registerElement('Image', () => require('tns-core-modules/ui/image').Image)
  registerElement(
    'ListPicker',
    () => require('tns-core-modules/ui/list-picker').ListPicker,
  )
  registerElement('Page', () => require('tns-core-modules/ui/page').Page)

  registerElement(
    'Placeholder',
    () => require('tns-core-modules/ui/placeholder').Placeholder
  )
  registerElement(
    'Progress',
    () => require('tns-core-modules/ui/progress').Progress,
  )
  registerElement(
    'ProxyViewContainer',
    () => require('tns-core-modules/ui/proxy-view-container').ProxyViewContainer
  )
  // registerElement(
  //   'Repeater',
  //   () => require('tns-core-modules/ui/repeater').Repeater
  // )
  registerElement(
    'ScrollView',
    () => require('tns-core-modules/ui/scroll-view').ScrollView
  )
  registerElement(
    'SearchBar',
    () => require('tns-core-modules/ui/search-bar').SearchBar,
  )
  registerElement(
    'SegmentedBar',
    () => require('tns-core-modules/ui/segmented-bar').SegmentedBar,
  )
  registerElement(
    'SegmentedBarItem',
    () => require('tns-core-modules/ui/segmented-bar').SegmentedBarItem
  )
  registerElement('Slider', () => require('tns-core-modules/ui/slider').Slider)
  registerElement(
    'StackLayout',
    () => require('tns-core-modules/ui/layouts/stack-layout').StackLayout
  )
  registerElement(
    'FlexboxLayout',
    () => require('tns-core-modules/ui/layouts/flexbox-layout').FlexboxLayout
  )
  registerElement('Switch', () => require('tns-core-modules/ui/switch').Switch)

  registerElement(
    'TextField',
    () => require('tns-core-modules/ui/text-field').TextField,

  )
  registerElement(
    'TextView',
    () => require('tns-core-modules/ui/text-view').TextView,

  )
  registerElement(
    'TimePicker',
    () => require('tns-core-modules/ui/time-picker').TimePicker,

  )
  registerElement(
    'WebView',
    () => require('tns-core-modules/ui/web-view').WebView
  )
  registerElement(
    'WrapLayout',
    () => require('tns-core-modules/ui/layouts/wrap-layout').WrapLayout
  )
  registerElement(
    'FormattedString',
    () => require('tns-core-modules/text/formatted-string').FormattedString
  )
  registerElement('Span', () => require('tns-core-modules/text/span').Span)

  /*
   registerElement('Frame', () => require('tns-core-modules/ui/frame').Frame, {
     insertChild() {
       //dont bother
     }
   })
 */
  registerCustomElementNode('Frame', () => new FrameElement())





}