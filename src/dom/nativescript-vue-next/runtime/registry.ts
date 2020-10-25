import { NSVElement, NSVViewFlags, NativeView } from './nodes'
import { warn } from "../../shared/Logger";
import { NodeWidget, QWidgetSignals, Component, QMenuBar, QMainWindow } from '@nodegui/nodegui';
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
        insert?(child: NSVElement, parent: NSVElement<T>, atIndex?: number): void
        remove?(child: NSVElement, parent: NSVElement<T>): void
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
        () => new RNImage(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNAnimatedImage, AnimatedImageProps>(
        'animatedImage',
        () => new RNAnimatedImage(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNView, ViewProps<any>>(
        'view',
        () => new RNView(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {
                    // if(!parent.nativeView.layout && child instanceof require('@nodegui/nodegui').FlexLayout){

                    // }
                    if (child.nodeRole === "layout"){
                        if(!parent.nativeView.layout){
                            console.log(`[LAYOUT] ${parent} > ${child}`);
                            (child.nativeView as unknown as import('@nodegui/nodegui').FlexLayout).setFlexNode(parent.nativeView.getFlexNode());
                            (parent.nativeView as unknown as import('@nodegui/nodegui').QWidget).setLayout(child.nativeView as unknown as import('@nodegui/nodegui').FlexLayout);
                            parent.nativeView.layout = child.nativeView as unknown as import('@nodegui/nodegui').FlexLayout;
                        } else {
                            console.log(`View unexpectedly began with a layout!`);
                        }
                        return;
                    }
                },
                remove(child, parent): void {

                },
            }
        },
    )
    // registerElement<RNFlexLayout, FlexLayoutProps>(
    //     'flexLayout',
    //     () => require('@nodegui/nodegui').FlexLayout,
    //     {
    //         nodeOps: {
    //             insert(child, parent, atIndex?: number): void {
    //                 console.log(`FlexLayout about to add child ${child}`);
    //                 (parent.nativeView as unknown as import('@nodegui/nodegui').FlexLayout).addWidget(child.nativeView as any);
    //                 return;
    //             },
    //             remove(child, parent): void {

    //             },
    //         }
    //     },
    // )
    registerElement<RNCheckBox, CheckBoxProps>(
        'checkBox',
        () => new RNCheckBox(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNText, TextProps>(
        'text',
        () => new RNText(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {
                    console.log(`[text] ${parent.nativeView} > ${child.nativeView}`);
                },
                remove(child, parent): void {

                },
            },
        },
    )
    registerElement<RNDial, DialProps>(
        'dial',
        () => new RNDial(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNLineEdit, LineEditProps>(
        'lineEdit',
        () => new RNLineEdit(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNWindow, WindowProps>(
        'window',
        () => new RNWindow(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {
                    if(child instanceof QMenuBar){
                        if(!parent.nativeView.menuBar()){
                            parent.nativeView.setMenuBar(child);
                            return;
                        } else {
                            console.warn("MainWindow can't have more than one menubar.");
                            return;
                        }
                    }
                    if(child.nodeRole === "centralWidget"){
                        (parent.nativeView as unknown as QMainWindow).setCentralWidget(child.nativeView as NodeWidget<any> & RNComponent);
                        return;
                    }
                    // if(child.nodeRole === "styleSheet"){
                    //     (parent.nativeView as unknown as import('@nodegui/nodegui').QMainWindow).setStyleSheet(child.nativeView.text());
                    // }
                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNProgressBar, ProgressBarProps>(
        'progressBar',
        () => new RNProgressBar(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNComboBox, ComboBoxProps>(
        'comboBox',
        () => new RNComboBox(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNButton, ButtonProps>(
        'button',
        () => new RNButton(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNSpinBox, SpinBoxProps>(
        'spinBox',
        () => new RNSpinBox(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNRadioButton, RadioButtonProps>(
        'radioButton',
        () => new RNRadioButton(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNTab, TabProps>(
        'tab',
        () => new RNTab(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNMenu, MenuProps>(
        'menu',
        () => new RNMenu(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNMenuBar, MenuBarProps>(
        'menuBar',
        () => new RNMenuBar(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNPlainTextEdit, PlainTextEditProps>(
        'plainTextEdit',
        () => new RNPlainTextEdit(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNSlider, SliderProps>(
        'slider',
        () => new RNSlider(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNSystemTrayIcon, SystemTrayIconProps>(
        'systemTrayIcon',
        () => new RNSystemTrayIcon(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNAction, ActionProps>(
        'action',
        () => new RNAction(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {
                    if(typeof atIndex === "undefined"){
                        parent.nativeView.appendChild(child.nativeView);
                        return;
                    }
                    throwUnsupported(parent.nativeView);
                },
                remove(child, parent): void {
                    parent.nativeView.removeChild(child.nativeView);
                },
            }
        },
    )
    registerElement<RNBoxView, BoxViewProps>(
        'boxView',
        () => new RNBoxView(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    registerElement<RNGridView, GridViewProps>(
        'gridView',
        () => new RNGridView(),
        {
            nodeOps: {
                insert(child, parent, atIndex?: number): void {

                },
                remove(child, parent): void {

                },
            }
        },
    )
    /* Component is an abstract class, so this is surely wrong. */
    // registerElement<RNomponent, omponentProps>(
    //     'tabItem',
    //     () => require('@nodegui/nodegui').Component,
    //     {
    //         nodeOps: {
    //             insert(child, parent, atIndex?: number): void {

    //             },
    //             remove(child, parent): void {

    //             },
    //         }
    //     },
    // )
}
