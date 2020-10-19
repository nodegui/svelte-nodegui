import { NSVElement, NSVViewFlags } from './nodes'
import { warn } from "../../shared/Logger";
import { NodeWidget, QWidgetSignals } from '@nodegui/nodegui';


export type NSVElementResolver<T extends NodeWidget<Signals> = NodeWidget<any>, Signals extends QWidgetSignals = any> = () => NSVElement<T, Signals>

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

/**
 * @param elementName The name of the element registered into the elementMap.
 * @returns The nativeView associated with this element name. May be undefined
 *          (e.g. for virtual elements like head and style).
 */
export function getViewClass(elementName: string): any|undefined {
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

// register built in elements
// prettier-ignore

export function registerNativeElements() {
    registerElement(
        'image',
        () => require('@nodegui/nodegui').QPixmap,
    )
    registerElement(
        'animatedImage',
        () => require('@nodegui/nodegui').QMovie,
    )
    registerElement(
        'view',
        () => require('@nodegui/nodegui').QWidget,
    )
    registerElement(
        'checkBox',
        () => require('@nodegui/nodegui').QCheckBox,
    )
    registerElement(
        'text',
        () => require('@nodegui/nodegui').QLabel,
    )
    registerElement(
        'dial',
        () => require('@nodegui/nodegui').QDial,
    )
    registerElement(
        'lineEdit',
        () => require('@nodegui/nodegui').QLineEdit,
    )
    registerElement(
        'window',
        () => require('@nodegui/nodegui').QMainWindow,
    )
    registerElement(
        'progressBar',
        () => require('@nodegui/nodegui').QProgressBar,
    )
    registerElement(
        'comboBox',
        () => require('@nodegui/nodegui').QComboBox,
    )
    registerElement(
        'button',
        () => require('@nodegui/nodegui').QPushButton,
    )
    registerElement(
        'spinBox',
        () => require('@nodegui/nodegui').QSpinBox,
    )
    registerElement(
        'radioButton',
        () => require('@nodegui/nodegui').QRadioButton,
    )
    registerElement(
        'tab',
        () => require('@nodegui/nodegui').QTabWidget,
    )
    registerElement(
        'menu',
        () => require('@nodegui/nodegui').QMenu,
    )
    registerElement(
        'menuBar',
        () => require('@nodegui/nodegui').QMenuBar,
    )
    registerElement(
        'plainTextEdit',
        () => require('@nodegui/nodegui').QPlainTextEdit,
    )
    registerElement(
        'slider',
        () => require('@nodegui/nodegui').QSlider,
    )
    registerElement(
        'systemTrayIcon',
        () => require('@nodegui/nodegui').QSystemTrayIcon,
    )
    registerElement(
        'action',
        () => require('@nodegui/nodegui').QAction,
    )
    registerElement(
        'boxView',
        () => require('@nodegui/nodegui').QBoxLayout,
    )
    registerElement(
        'gridView',
        () => require('@nodegui/nodegui').QGridLayout,
    )
    registerElement(
        'tabItem',
        () => require('@nodegui/nodegui').Component,
    )
}
