import { registerNativeViewElement } from './native/NativeViewElementNode';

export function registerNativeElements() {
    registerNativeViewElement(
        'image',
        () => require('@nodegui/nodegui').QPixmap,
    )
    registerNativeViewElement(
        'animatedImage',
        () => require('@nodegui/nodegui').QMovie,
    )
    registerNativeViewElement(
        'view',
        () => require('@nodegui/nodegui').QWidget,
    )
    registerNativeViewElement(
        'checkBox',
        () => require('@nodegui/nodegui').QCheckBox,
    )
    registerNativeViewElement(
        'text',
        () => require('@nodegui/nodegui').QLabel,
    )
    registerNativeViewElement(
        'dial',
        () => require('@nodegui/nodegui').QDial,
    )
    registerNativeViewElement(
        'lineEdit',
        () => require('@nodegui/nodegui').QLineEdit,
    )
    registerNativeViewElement(
        'window',
        () => require('@nodegui/nodegui').QMainWindow,
    )
    registerNativeViewElement(
        'progressBar',
        () => require('@nodegui/nodegui').QProgressBar,
    )
    registerNativeViewElement(
        'comboBox',
        () => require('@nodegui/nodegui').QComboBox,
    )
    registerNativeViewElement(
        'button',
        () => require('@nodegui/nodegui').QPushButton,
    )
    registerNativeViewElement(
        'spinBox',
        () => require('@nodegui/nodegui').QSpinBox,
    )
    registerNativeViewElement(
        'radioButton',
        () => require('@nodegui/nodegui').QRadioButton,
    )
    registerNativeViewElement(
        'tab',
        () => require('@nodegui/nodegui').QTabWidget,
    )
    registerNativeViewElement(
        'menu',
        () => require('@nodegui/nodegui').QMenu,
    )
    registerNativeViewElement(
        'menuBar',
        () => require('@nodegui/nodegui').QMenuBar,
    )
    registerNativeViewElement(
        'plainTextEdit',
        () => require('@nodegui/nodegui').QPlainTextEdit,
    )
    registerNativeViewElement(
        'slider',
        () => require('@nodegui/nodegui').QSlider,
    )
    registerNativeViewElement(
        'systemTrayIcon',
        () => require('@nodegui/nodegui').QSystemTrayIcon,
    )
    registerNativeViewElement(
        'action',
        () => require('@nodegui/nodegui').QAction,
    )
    registerNativeViewElement(
        'boxView',
        () => require('@nodegui/nodegui').QBoxLayout,
    )
    registerNativeViewElement(
        'gridView',
        () => require('@nodegui/nodegui').QGridLayout,
    )
    registerNativeViewElement(
        'tabItem',
        () => require('@nodegui/nodegui').Component,
    )
}
