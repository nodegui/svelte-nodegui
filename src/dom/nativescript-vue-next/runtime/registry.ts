import { NSVElement, NSVViewFlags, NativeView } from './nodes'
import { warn } from "../../shared/Logger";
import { NodeWidget, QWidgetSignals, Component, QMenuBar, QMainWindow, WidgetEventTypes } from '@nodegui/nodegui';
import { throwUnsupported } from "../../react-nodegui/src/utils/helpers";
import { RNAction, ActionProps } from "../../react-nodegui/src/components/Action/RNAction";
import { RNBoxView, BoxViewProps } from "../../react-nodegui/src/components/BoxView/RNBoxView";
import { RNGridView, GridViewProps } from "../../react-nodegui/src/components/GridView/RNGridView";
import { RNSlider, SliderProps } from "../../react-nodegui/src/components/Slider/RNSlider";
import { RNView, ViewProps } from "../../react-nodegui/src/components/View/RNView";
import { RNWindow, WindowProps } from "../../react-nodegui/src/components/Window/RNWindow";
import { RNText, TextProps } from "../../react-nodegui/src/components/Text/RNText";
import { RNImage, ImageProps } from "../../react-nodegui/src/components/Image/RNImage";
import { RNAnimatedImage, AnimatedImageProps } from "../../react-nodegui/src/components/AnimatedImage/RNAnimatedImage";
import { RNButton, ButtonProps } from "../../react-nodegui/src/components/Button/RNButton";
import { RNCheckBox, CheckBoxProps } from "../../react-nodegui/src/components/CheckBox/RNCheckBox";
import { RNLineEdit, LineEditProps } from "../../react-nodegui/src/components/LineEdit/RNLineEdit";
import { RNMenu, MenuProps } from "../../react-nodegui/src/components/Menu/RNMenu";
import { RNMenuBar, MenuBarProps } from "../../react-nodegui/src/components/MenuBar/RNMenuBar";
import { RNPlainTextEdit, PlainTextEditProps } from "../../react-nodegui/src/components/PlainTextEdit/RNPlainTextEdit";
import { RNProgressBar, ProgressBarProps } from "../../react-nodegui/src/components/ProgressBar/RNProgressBar";
import { RNRadioButton, RadioButtonProps } from "../../react-nodegui/src/components/RadioButton/RNRadioButton";
import { RNDial, DialProps } from "../../react-nodegui/src/components/Dial/RNDial";
import { RNSpinBox, SpinBoxProps } from "../../react-nodegui/src/components/SpinBox/RNSpinBox";
import { RNScrollArea, ScrollAreaProps } from "../../react-nodegui/src/components/ScrollArea/RNScrollArea";
import { RNComboBox, ComboBoxProps } from "../../react-nodegui/src/components/ComboBox/RNComboBox";
import { RNSystemTrayIcon, SystemTrayIconProps } from "../../react-nodegui/src/components/SystemTrayIcon/RNSystemTrayIcon";
import { RNTab, TabProps } from "../../react-nodegui/src/components/Tab/RNTab";
import { RNTabItem, TabItemProps } from "../../react-nodegui/src/components/TabItem/RNTabItem";
import type { RNComponent } from "../../react-nodegui/src/components/config";
import { RNSvg } from '../../react-nodegui/src/components/Svg/RNSvg';
import { SvgProps } from '../../react-nodegui/src/components/Svg/RNSvg';


export type NSVElementResolver<T extends NativeView = NativeView> = () => T

export type NSVModelDescriptor = {
    prop: string
    event: string
}

export interface NSVViewMeta<T extends NativeView = NativeView, Props extends {} = {}> {
    viewFlags: NSVViewFlags
    nodeOps?: {
        setProps?(newProps: Props, oldProps: Props): void;
        // setAttribute?(name: string, value: any): void;
        // getAttribute?(name: string): any;
        insert?(child: NSVElement, parent: NSVElement<T>, atIndex?: number): void | "defer";
        remove?(child: NSVElement, parent: NSVElement<T>): void | "defer";
    }
    model?: NSVModelDescriptor
    overwriteExisting?: boolean
}

export interface NSVElementDescriptor<T extends NativeView = NativeView> {
    meta: NSVViewMeta
    resolver?: NSVElementResolver<T>
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

/**
 * @param elementName The name of the element registered into the elementMap.
 * @returns The nativeView associated with this element name. May be undefined
 *          (e.g. for virtual elements like head and style).
 */
export function getViewClass(elementName: string): any|undefined {
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

// interface registerElement<Component>;
export function registerElement<T extends NativeView = NativeView, Props extends {} = {}>(
    elementName: string,
    resolver?: NSVElementResolver<T>,
    meta?: Partial<NSVViewMeta<T>>
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

// register built in elements
// prettier-ignore

/**
 * I had thought that all of these would extend NodeWidget, but it appears that many extend Component instead.
 * I'll improve the typings later.
 */
export function registerNativeElements() {
    registerElement<RNImage, ImageProps>(
        'image',
        () => {
            const widget = new RNImage();
            widget.setProperty("scaledContents", true);
            widget.addEventListener(WidgetEventTypes.Resize, () => {
                widget.scalePixmap(widget.size());
            });
            return widget;
        },
    )
    registerElement<RNAnimatedImage, AnimatedImageProps>(
        'animatedImage',
        () => {
            const widget = new RNAnimatedImage();
            widget.setProperty("scaledContents", true);
            return widget;
        },
    )
    registerElement<RNView, ViewProps<any>>(
        'view',
        () => new RNView(),
    )
    // registerElement<RNFlexLayout, FlexLayoutProps>(
    //     'flexLayout',
    //     () => require('@nodegui/nodegui').FlexLayout,
    // )
    registerElement<RNCheckBox, CheckBoxProps>(
        'checkBox',
        () => new RNCheckBox(),
    )
    registerElement<RNText, TextProps>(
        'text',
        () => new RNText(),
    )
    registerElement<RNDial, DialProps>(
        'dial',
        () => new RNDial(),
    )
    registerElement<RNLineEdit, LineEditProps>(
        'lineEdit',
        () => new RNLineEdit(),
    )
    registerElement<RNWindow, WindowProps>(
        'window',
        () => new RNWindow(),
    )
    registerElement<RNProgressBar, ProgressBarProps>(
        'progressBar',
        () => new RNProgressBar(),
    )
    registerElement<RNComboBox, ComboBoxProps>(
        'comboBox',
        () => new RNComboBox(),
    )
    registerElement<RNButton, ButtonProps>(
        'button',
        () => new RNButton(),
    )
    registerElement<RNSpinBox, SpinBoxProps>(
        'spinBox',
        () => new RNSpinBox(),
    )
    registerElement<RNSvg, SvgProps>(
        'svg',
        () => new RNSvg(),
    )
    registerElement<RNRadioButton, RadioButtonProps>(
        'radioButton',
        () => new RNRadioButton(),
    )
    registerElement<RNTab, TabProps>(
        'tab',
        () => new RNTab(),
    )
    registerElement<RNMenu, MenuProps>(
        'menu',
        () => new RNMenu(),
    )
    registerElement<RNMenuBar, MenuBarProps>(
        'menuBar',
        () => new RNMenuBar(),
    )
    registerElement<RNPlainTextEdit, PlainTextEditProps>(
        'plainTextEdit',
        () => new RNPlainTextEdit(),
    )
    registerElement<RNSlider, SliderProps>(
        'slider',
        () => new RNSlider(),
    )
    registerElement<RNSystemTrayIcon, SystemTrayIconProps>(
        'systemTrayIcon',
        () => new RNSystemTrayIcon(),
    )
    registerElement<RNAction, ActionProps>(
        'action',
        () => new RNAction(),
    )
    registerElement<RNBoxView, BoxViewProps>(
        'boxView',
        () => new RNBoxView(),
    )
    registerElement<RNGridView, GridViewProps>(
        'gridView',
        () => {
            const widget = new RNGridView();
            const initialProps: GridViewProps = {
                children: []
            };
            widget.setProps(initialProps, initialProps);
            return widget;
        },
    )
    registerElement<RNScrollArea, ScrollAreaProps>(
        'scrollArea',
        () => new RNScrollArea(),
    )
    /* Component is an abstract class, so this is surely wrong. */
    // registerElement<RNComponent, ComponentProps>(
    //     'tabItem',
    //     () => require('@nodegui/nodegui').Component,
    // )
}
