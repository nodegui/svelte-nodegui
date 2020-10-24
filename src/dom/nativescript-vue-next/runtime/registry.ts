import { NSVElement, NSVViewFlags } from './nodes'
import { warn } from "../../shared/Logger";
import { NodeWidget, QWidgetSignals, Component } from '@nodegui/nodegui';


export type NSVElementResolver<T extends Component> = () => NSVElement<T>

export type NSVModelDescriptor = {
    prop: string
    event: string
}

export interface NSVViewMeta<T extends Component = Component> {
    viewFlags: NSVViewFlags
    nodeOps?: {
        insert(child: NSVElement, parent: NSVElement<T>, atIndex?: number): void
        remove(child: NSVElement, parent: NSVElement<T>): void
    }
    model?: NSVModelDescriptor
    overwriteExisting?: boolean
}

export interface NSVElementDescriptor<T extends Component = Component> {
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
export function registerElement<T extends Component = Component>(
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
    registerElement<import('@nodegui/nodegui').QPixmap>(
        'image',
        () => require('@nodegui/nodegui').QPixmap,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QMovie>(
        'animatedImage',
        () => require('@nodegui/nodegui').QMovie,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QWidget>(
        'view',
        () => require('@nodegui/nodegui').QWidget,
        {
            nodeOps: {
                insert(child, parent): void {
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
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').FlexLayout>(
        'flexLayout',
        () => require('@nodegui/nodegui').FlexLayout,
        {
            nodeOps: {
                insert(child, parent): void {
                    console.log(`FlexLayout about to add child ${child}`);
                    (parent.nativeView as unknown as import('@nodegui/nodegui').FlexLayout).addWidget(child.nativeView as any);
                    return;
                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QCheckBox>(
        'checkBox',
        () => require('@nodegui/nodegui').QCheckBox,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QLabel>(
        'text',
        () => require('@nodegui/nodegui').QLabel,
        {
            nodeOps: {
                insert(child, parent): void {
                    console.log(`[text] ${parent.nativeView} > ${child.nativeView}`);
                },
                remove(): void {

                },
            },
        },
    )
    registerElement<import('@nodegui/nodegui').QDial>(
        'dial',
        () => require('@nodegui/nodegui').QDial,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QLineEdit>(
        'lineEdit',
        () => require('@nodegui/nodegui').QLineEdit,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QMainWindow>(
        'window',
        () => require('@nodegui/nodegui').QMainWindow,
        {
            nodeOps: {
                insert(child, parent): void {
                    if(child.nodeRole === "centralWidget"){
                        (parent.nativeView as unknown as import('@nodegui/nodegui').QMainWindow).setCentralWidget(child.nativeView as NodeWidget<any>);
                        return;
                    }
                    // if(child.nodeRole === "styleSheet"){
                    //     (parent.nativeView as unknown as import('@nodegui/nodegui').QMainWindow).setStyleSheet(child.nativeView.text());
                    // }
                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QProgressBar>(
        'progressBar',
        () => require('@nodegui/nodegui').QProgressBar,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QComboBox>(
        'comboBox',
        () => require('@nodegui/nodegui').QComboBox,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QPushButton>(
        'button',
        () => require('@nodegui/nodegui').QPushButton,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QSpinBox>(
        'spinBox',
        () => require('@nodegui/nodegui').QSpinBox,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QRadioButton>(
        'radioButton',
        () => require('@nodegui/nodegui').QRadioButton,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QTabWidget>(
        'tab',
        () => require('@nodegui/nodegui').QTabWidget,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QMenu>(
        'menu',
        () => require('@nodegui/nodegui').QMenu,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QMenuBar>(
        'menuBar',
        () => require('@nodegui/nodegui').QMenuBar,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QPlainTextEdit>(
        'plainTextEdit',
        () => require('@nodegui/nodegui').QPlainTextEdit,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QSlider>(
        'slider',
        () => require('@nodegui/nodegui').QSlider,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QSystemTrayIcon>(
        'systemTrayIcon',
        () => require('@nodegui/nodegui').QSystemTrayIcon,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QAction>(
        'action',
        () => require('@nodegui/nodegui').QAction,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QBoxLayout>(
        'boxView',
        () => require('@nodegui/nodegui').QBoxLayout,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    registerElement<import('@nodegui/nodegui').QGridLayout>(
        'gridView',
        () => require('@nodegui/nodegui').QGridLayout,
        {
            nodeOps: {
                insert(child, parent): void {

                },
                remove(): void {

                },
            }
        },
    )
    /* Component is an abstract class, so this is surely wrong. */
    // registerElement<import('@nodegui/nodegui').Component>(
    //     'tabItem',
    //     () => require('@nodegui/nodegui').Component,
    //     {
    //         nodeOps: {
    //             insert(child, parent): void {

    //             },
    //             remove(): void {

    //             },
    //         }
    //     },
    // )
}
