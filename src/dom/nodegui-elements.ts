import { registerNativeViewElement } from './native/NativeViewElementNode';

export function registerNativeElements() {
  registerNativeViewElement(
    'QMainWindow',
    () => require('@nodegui/nodegui').QMainWindow,
  )
  registerNativeViewElement(
    'QApplication',
    () => require('@nodegui/nodegui').QApplication,
  )
  registerNativeViewElement(
    'QBrush',
    () => require('@nodegui/nodegui').QBrush,
  )
  registerNativeViewElement(
    'QPen',
    () => require('@nodegui/nodegui').QPen,
  )
  registerNativeViewElement(
    'QKeySequence',
    () => require('@nodegui/nodegui').QKeySequence,
  )
  registerNativeViewElement(
    'QPicture',
    () => require('@nodegui/nodegui').QPicture,
  )
  registerNativeViewElement(
    'QPixmap',
    () => require('@nodegui/nodegui').QPixmap,
  )
  registerNativeViewElement(
    'ImageFormats',
    () => require('@nodegui/nodegui').ImageFormats,
  )
  registerNativeViewElement(
    'QIcon',
    () => require('@nodegui/nodegui').QIcon,
  )
  registerNativeViewElement(
    'QIconMode',
    () => require('@nodegui/nodegui').QIconMode,
  )
  registerNativeViewElement(
    'QIconState',
    () => require('@nodegui/nodegui').QIconState,
  )
  registerNativeViewElement(
    'QFont',
    () => require('@nodegui/nodegui').QFont,
  )
  registerNativeViewElement(
    'QFontCapitalization',
    () => require('@nodegui/nodegui').QFontCapitalization,
  )
  registerNativeViewElement(
    'QFontStretch',
    () => require('@nodegui/nodegui').QFontStretch,
  )
  registerNativeViewElement(
    'QFontWeight',
    () => require('@nodegui/nodegui').QFontWeight,
  )
  registerNativeViewElement(
    'QMovie',
    () => require('@nodegui/nodegui').QMovie,
  )
  registerNativeViewElement(
    'CacheMode',
    () => require('@nodegui/nodegui').CacheMode,
  )
  registerNativeViewElement(
    'MovieState',
    () => require('@nodegui/nodegui').MovieState,
  )
  registerNativeViewElement(
    'QCursor',
    () => require('@nodegui/nodegui').QCursor,
  )
  registerNativeViewElement(
    'QTextOptionWrapMode',
    () => require('@nodegui/nodegui').QTextOptionWrapMode,
  )
  registerNativeViewElement(
    'QClipboard',
    () => require('@nodegui/nodegui').QClipboard,
  )
  registerNativeViewElement(
    'QClipboardMode',
    () => require('@nodegui/nodegui').QClipboardMode,
  )
  registerNativeViewElement(
    'QStyle',
    () => require('@nodegui/nodegui').QStyle,
  )
  registerNativeViewElement(
    'QStylePixelMetric',
    () => require('@nodegui/nodegui').QStylePixelMetric,
  )
  registerNativeViewElement(
    'QFontDatabase',
    () => require('@nodegui/nodegui').QFontDatabase,
  )
  registerNativeViewElement(
    'SystemFont',
    () => require('@nodegui/nodegui').SystemFont,
  )
  registerNativeViewElement(
    'WritingSystem',
    () => require('@nodegui/nodegui').WritingSystem,
  )
  registerNativeViewElement(
    'QKeyEvent',
    () => require('@nodegui/nodegui').QKeyEvent,
  )
  registerNativeViewElement(
    'QMouseEvent',
    () => require('@nodegui/nodegui').QMouseEvent,
  )
  registerNativeViewElement(
    'QWheelEvent',
    () => require('@nodegui/nodegui').QWheelEvent,
  )
  registerNativeViewElement(
    'QNativeGestureEvent',
    () => require('@nodegui/nodegui').QNativeGestureEvent,
  )
  registerNativeViewElement(
    'QTabletEvent',
    () => require('@nodegui/nodegui').QTabletEvent,
  )
  registerNativeViewElement(
    'QDrag',
    () => require('@nodegui/nodegui').QDrag,
  )
  registerNativeViewElement(
    'QDropEvent',
    () => require('@nodegui/nodegui').QDropEvent,
  )
  registerNativeViewElement(
    'QDragMoveEvent',
    () => require('@nodegui/nodegui').QDragMoveEvent,
  )
  registerNativeViewElement(
    'QDragLeaveEvent',
    () => require('@nodegui/nodegui').QDragLeaveEvent,
  )
  registerNativeViewElement(
    'WidgetEventTypes',
    () => require('@nodegui/nodegui').WidgetEventTypes,
  )
  registerNativeViewElement(
    'NodeWidget',
    () => require('@nodegui/nodegui').NodeWidget,
  )
  registerNativeViewElement(
    'QWidget',
    () => require('@nodegui/nodegui').QWidget,
  )
  registerNativeViewElement(
    'QWidgetSignals',
    () => require('@nodegui/nodegui').QWidgetSignals,
  )
  registerNativeViewElement(
    'NodeLayout',
    () => require('@nodegui/nodegui').NodeLayout,
  )
  registerNativeViewElement(
    'QLayoutSignals',
    () => require('@nodegui/nodegui').QLayoutSignals,
  )
  registerNativeViewElement(
    'SizeConstraint',
    () => require('@nodegui/nodegui').SizeConstraint,
  )
  registerNativeViewElement(
    'QAbstractScrollArea',
    () => require('@nodegui/nodegui').QAbstractScrollArea,
  )
  registerNativeViewElement(
    'QAbstractSlider',
    () => require('@nodegui/nodegui').QAbstractSlider,
  )
  registerNativeViewElement(
    'QAbstractSliderSignals',
    () => require('@nodegui/nodegui').QAbstractSliderSignals,
  )
  registerNativeViewElement(
    'QAbstractButton',
    () => require('@nodegui/nodegui').QAbstractButton,
  )
  registerNativeViewElement(
    'QAbstractButtonSignals',
    () => require('@nodegui/nodegui').QAbstractButtonSignals,
  )
  registerNativeViewElement(
    'QAbstractItemView',
    () => require('@nodegui/nodegui').QAbstractItemView,
  )
  registerNativeViewElement(
    'QAbstractItemViewSignals',
    () => require('@nodegui/nodegui').QAbstractItemViewSignals,
  )
  registerNativeViewElement(
    'QAbstractSpinBox',
    () => require('@nodegui/nodegui').QAbstractSpinBox,
  )
  registerNativeViewElement(
    'QAbstractSpinBoxSignals',
    () => require('@nodegui/nodegui').QAbstractSpinBoxSignals,
  )
  registerNativeViewElement(
    'ButtonSymbols',
    () => require('@nodegui/nodegui').ButtonSymbols,
  )
  registerNativeViewElement(
    'CorrectionMode',
    () => require('@nodegui/nodegui').CorrectionMode,
  )
  registerNativeViewElement(
    'StepType',
    () => require('@nodegui/nodegui').StepType,
  )
  registerNativeViewElement(
    'QCalendarWidget',
    () => require('@nodegui/nodegui').QCalendarWidget,
  )
  registerNativeViewElement(
    'QCalendarWidgetSignals',
    () => require('@nodegui/nodegui').QCalendarWidgetSignals,
  )
  registerNativeViewElement(
    'QCheckBox',
    () => require('@nodegui/nodegui').QCheckBox,
  )
  registerNativeViewElement(
    'QCheckBoxSignals',
    () => require('@nodegui/nodegui').QCheckBoxSignals,
  )
  registerNativeViewElement(
    'QColorDialog',
    () => require('@nodegui/nodegui').QColorDialog,
  )
  registerNativeViewElement(
    'QColorDialogSignals',
    () => require('@nodegui/nodegui').QColorDialogSignals,
  )
  registerNativeViewElement(
    'QDateEdit',
    () => require('@nodegui/nodegui').QDateEdit,
  )
  registerNativeViewElement(
    'QDateTimeEdit',
    () => require('@nodegui/nodegui').QDateTimeEdit,
  )
  registerNativeViewElement(
    'NodeDateTimeEdit',
    () => require('@nodegui/nodegui').NodeDateTimeEdit,
  )
  registerNativeViewElement(
    'QDateTimeEditSignals',
    () => require('@nodegui/nodegui').QDateTimeEditSignals,
  )
  registerNativeViewElement(
    'QLabel',
    () => require('@nodegui/nodegui').QLabel,
  )
  registerNativeViewElement(
    'QLabelSignals',
    () => require('@nodegui/nodegui').QLabelSignals,
  )
  registerNativeViewElement(
    'QLCDNumber',
    () => require('@nodegui/nodegui').QLCDNumber,
  )
  registerNativeViewElement(
    'QLCDNumberSignals',
    () => require('@nodegui/nodegui').QLCDNumberSignals,
  )
  registerNativeViewElement(
    'Mode',
    () => require('@nodegui/nodegui').Mode,
  )
  registerNativeViewElement(
    'SegmentStyle',
    () => require('@nodegui/nodegui').SegmentStyle,
  )
  registerNativeViewElement(
    'QDial',
    () => require('@nodegui/nodegui').QDial,
  )
  registerNativeViewElement(
    'QDialSignals',
    () => require('@nodegui/nodegui').QDialSignals,
  )
  registerNativeViewElement(
    'QDoubleSpinBox',
    () => require('@nodegui/nodegui').QDoubleSpinBox,
  )
  registerNativeViewElement(
    'QDoubleSpinBoxSignals',
    () => require('@nodegui/nodegui').QDoubleSpinBoxSignals,
  )
  registerNativeViewElement(
    'QErrorMessage',
    () => require('@nodegui/nodegui').QErrorMessage,
  )
  registerNativeViewElement(
    'QErrorMessageSignals',
    () => require('@nodegui/nodegui').QErrorMessageSignals,
  )
  registerNativeViewElement(
    'QFileDialog',
    () => require('@nodegui/nodegui').QFileDialog,
  )
  registerNativeViewElement(
    'QFileDialogSignals',
    () => require('@nodegui/nodegui').QFileDialogSignals,
  )
  registerNativeViewElement(
    'QFontDialog',
    () => require('@nodegui/nodegui').QFontDialog,
  )
  registerNativeViewElement(
    'QFontDialogSignals',
    () => require('@nodegui/nodegui').QFontDialogSignals,
  )
  registerNativeViewElement(
    'FontDialogOption',
    () => require('@nodegui/nodegui').FontDialogOption,
  )
  registerNativeViewElement(
    'QFrame',
    () => require('@nodegui/nodegui').QFrame,
  )
  registerNativeViewElement(
    'QFrameSignals',
    () => require('@nodegui/nodegui').QFrameSignals,
  )
  registerNativeViewElement(
    'Shadow',
    () => require('@nodegui/nodegui').Shadow,
  )
  registerNativeViewElement(
    'Shape',
    () => require('@nodegui/nodegui').Shape,
  )
  registerNativeViewElement(
    'QGraphicsEffect',
    () => require('@nodegui/nodegui').QGraphicsEffect,
  )
  registerNativeViewElement(
    'QGraphicsEffectSignals',
    () => require('@nodegui/nodegui').QGraphicsEffectSignals,
  )
  registerNativeViewElement(
    'QGraphicsBlurEffect',
    () => require('@nodegui/nodegui').QGraphicsBlurEffect,
  )
  registerNativeViewElement(
    'QGraphicsBlurEffectSignals',
    () => require('@nodegui/nodegui').QGraphicsBlurEffectSignals,
  )
  registerNativeViewElement(
    'QGraphicsDropShadowEffect',
    () => require('@nodegui/nodegui').QGraphicsDropShadowEffect,
  )
  registerNativeViewElement(
    'QGraphicsDropShadowEffectSignals',
    () => require('@nodegui/nodegui').QGraphicsDropShadowEffectSignals,
  )
  registerNativeViewElement(
    'QLineEdit',
    () => require('@nodegui/nodegui').QLineEdit,
  )
  registerNativeViewElement(
    'QLineEditSignals',
    () => require('@nodegui/nodegui').QLineEditSignals,
  )
  registerNativeViewElement(
    'EchoMode',
    () => require('@nodegui/nodegui').EchoMode,
  )
  registerNativeViewElement(
    'QMainWindow',
    () => require('@nodegui/nodegui').QMainWindow,
  )
  registerNativeViewElement(
    'QMainWindowSignals',
    () => require('@nodegui/nodegui').QMainWindowSignals,
  )
  registerNativeViewElement(
    'QProgressBar',
    () => require('@nodegui/nodegui').QProgressBar,
  )
  registerNativeViewElement(
    'QProgressBarSignals',
    () => require('@nodegui/nodegui').QProgressBarSignals,
  )
  registerNativeViewElement(
    'QProgressBarDirection',
    () => require('@nodegui/nodegui').QProgressBarDirection,
  )
  registerNativeViewElement(
    'QProgressDialog',
    () => require('@nodegui/nodegui').QProgressDialog,
  )
  registerNativeViewElement(
    'QProgressDialogSignals',
    () => require('@nodegui/nodegui').QProgressDialogSignals,
  )
  registerNativeViewElement(
    'QComboBox',
    () => require('@nodegui/nodegui').QComboBox,
  )
  registerNativeViewElement(
    'QComboBoxSignals',
    () => require('@nodegui/nodegui').QComboBoxSignals,
  )
  registerNativeViewElement(
    'InsertPolicy',
    () => require('@nodegui/nodegui').InsertPolicy,
  )
  registerNativeViewElement(
    'QPushButton',
    () => require('@nodegui/nodegui').QPushButton,
  )
  registerNativeViewElement(
    'QPushButtonSignals',
    () => require('@nodegui/nodegui').QPushButtonSignals,
  )
  registerNativeViewElement(
    'QToolButton',
    () => require('@nodegui/nodegui').QToolButton,
  )
  registerNativeViewElement(
    'QToolButtonSignals',
    () => require('@nodegui/nodegui').QToolButtonSignals,
  )
  registerNativeViewElement(
    'ToolButtonPopupMode',
    () => require('@nodegui/nodegui').ToolButtonPopupMode,
  )
  registerNativeViewElement(
    'QSpinBox',
    () => require('@nodegui/nodegui').QSpinBox,
  )
  registerNativeViewElement(
    'QSpinBoxSignals',
    () => require('@nodegui/nodegui').QSpinBoxSignals,
  )
  registerNativeViewElement(
    'QRadioButton',
    () => require('@nodegui/nodegui').QRadioButton,
  )
  registerNativeViewElement(
    'QRadioButtonSignals',
    () => require('@nodegui/nodegui').QRadioButtonSignals,
  )
  registerNativeViewElement(
    'QStackedWidget',
    () => require('@nodegui/nodegui').QStackedWidget,
  )
  registerNativeViewElement(
    'QStackedWidgetSignals',
    () => require('@nodegui/nodegui').QStackedWidgetSignals,
  )
  registerNativeViewElement(
    'QListView',
    () => require('@nodegui/nodegui').QListView,
  )
  registerNativeViewElement(
    'QListViewSignals',
    () => require('@nodegui/nodegui').QListViewSignals,
  )
  registerNativeViewElement(
    'Flow',
    () => require('@nodegui/nodegui').Flow,
  )
  registerNativeViewElement(
    'LayoutMode',
    () => require('@nodegui/nodegui').LayoutMode,
  )
  registerNativeViewElement(
    'Movement',
    () => require('@nodegui/nodegui').Movement,
  )
  registerNativeViewElement(
    'ResizeMode',
    () => require('@nodegui/nodegui').ResizeMode,
  )
  registerNativeViewElement(
    'ListViewMode',
    () => require('@nodegui/nodegui').ListViewMode,
  )
  registerNativeViewElement(
    'QListWidget',
    () => require('@nodegui/nodegui').QListWidget,
  )
  registerNativeViewElement(
    'QListWidgetSignals',
    () => require('@nodegui/nodegui').QListWidgetSignals,
  )
  registerNativeViewElement(
    'QListWidgetItem',
    () => require('@nodegui/nodegui').QListWidgetItem,
  )
  registerNativeViewElement(
    'QTabBar',
    () => require('@nodegui/nodegui').QTabBar,
  )
  registerNativeViewElement(
    'QTabBarSignals',
    () => require('@nodegui/nodegui').QTabBarSignals,
  )
  registerNativeViewElement(
    'ButtonPosition',
    () => require('@nodegui/nodegui').ButtonPosition,
  )
  registerNativeViewElement(
    'SelectionBehavior',
    () => require('@nodegui/nodegui').SelectionBehavior,
  )
  registerNativeViewElement(
    'TabBarShape',
    () => require('@nodegui/nodegui').TabBarShape,
  )
  registerNativeViewElement(
    'QTabWidget',
    () => require('@nodegui/nodegui').QTabWidget,
  )
  registerNativeViewElement(
    'QTabWidgetSignals',
    () => require('@nodegui/nodegui').QTabWidgetSignals,
  )
  registerNativeViewElement(
    'QTableView',
    () => require('@nodegui/nodegui').QTableView,
  )
  registerNativeViewElement(
    'QTableViewSignals',
    () => require('@nodegui/nodegui').QTableViewSignals,
  )
  registerNativeViewElement(
    'QTableWidget',
    () => require('@nodegui/nodegui').QTableWidget,
  )
  registerNativeViewElement(
    'QTableWidgetSignals',
    () => require('@nodegui/nodegui').QTableWidgetSignals,
  )
  registerNativeViewElement(
    'QTableWidgetItem',
    () => require('@nodegui/nodegui').QTableWidgetItem,
  )
  registerNativeViewElement(
    'QMenu',
    () => require('@nodegui/nodegui').QMenu,
  )
  registerNativeViewElement(
    'QMenuSignals',
    () => require('@nodegui/nodegui').QMenuSignals,
  )
  registerNativeViewElement(
    'QMenuBar',
    () => require('@nodegui/nodegui').QMenuBar,
  )
  registerNativeViewElement(
    'QMenuBarSignals',
    () => require('@nodegui/nodegui').QMenuBarSignals,
  )
  registerNativeViewElement(
    'QPlainTextEdit',
    () => require('@nodegui/nodegui').QPlainTextEdit,
  )
  registerNativeViewElement(
    'QPlainTextEditSignals',
    () => require('@nodegui/nodegui').QPlainTextEditSignals,
  )
  registerNativeViewElement(
    'LineWrapMode',
    () => require('@nodegui/nodegui').LineWrapMode,
  )
  registerNativeViewElement(
    'QScrollArea',
    () => require('@nodegui/nodegui').QScrollArea,
  )
  registerNativeViewElement(
    'QScrollAreaSignals',
    () => require('@nodegui/nodegui').QScrollAreaSignals,
  )
  registerNativeViewElement(
    'QScrollBar',
    () => require('@nodegui/nodegui').QScrollBar,
  )
  registerNativeViewElement(
    'QScrollBarSignals',
    () => require('@nodegui/nodegui').QScrollBarSignals,
  )
  registerNativeViewElement(
    'QSlider',
    () => require('@nodegui/nodegui').QSlider,
  )
  registerNativeViewElement(
    'QSliderSignals',
    () => require('@nodegui/nodegui').QSliderSignals,
  )
  registerNativeViewElement(
    'TickPosition',
    () => require('@nodegui/nodegui').TickPosition,
  )
  registerNativeViewElement(
    'QTimeEdit',
    () => require('@nodegui/nodegui').QTimeEdit,
  )
  registerNativeViewElement(
    'QTreeWidget',
    () => require('@nodegui/nodegui').QTreeWidget,
  )
  registerNativeViewElement(
    'QTreeWidgetSignals',
    () => require('@nodegui/nodegui').QTreeWidgetSignals,
  )
  registerNativeViewElement(
    'QTreeWidgetItem',
    () => require('@nodegui/nodegui').QTreeWidgetItem,
  )
  registerNativeViewElement(
    'QPainter',
    () => require('@nodegui/nodegui').QPainter,
  )
  registerNativeViewElement(
    'RenderHint',
    () => require('@nodegui/nodegui').RenderHint,
  )
  registerNativeViewElement(
    'QPainterPath',
    () => require('@nodegui/nodegui').QPainterPath,
  )
  registerNativeViewElement(
    'QDialog',
    () => require('@nodegui/nodegui').QDialog,
  )
  registerNativeViewElement(
    'QDialogSignals',
    () => require('@nodegui/nodegui').QDialogSignals,
  )
  registerNativeViewElement(
    'QMessageBox',
    () => require('@nodegui/nodegui').QMessageBox,
  )
  registerNativeViewElement(
    'QMessageBoxSignals',
    () => require('@nodegui/nodegui').QMessageBoxSignals,
  )
  registerNativeViewElement(
    'QMessageBoxIcon',
    () => require('@nodegui/nodegui').QMessageBoxIcon,
  )
  registerNativeViewElement(
    'ButtonRole',
    () => require('@nodegui/nodegui').ButtonRole,
  )
  registerNativeViewElement(
    'QInputDialog',
    () => require('@nodegui/nodegui').QInputDialog,
  )
  registerNativeViewElement(
    'QInputDialogSignals',
    () => require('@nodegui/nodegui').QInputDialogSignals,
  )
  registerNativeViewElement(
    'InputDialogOptions',
    () => require('@nodegui/nodegui').InputDialogOptions,
  )
  registerNativeViewElement(
    'InputMode',
    () => require('@nodegui/nodegui').InputMode,
  )
  registerNativeViewElement(
    'QButtonGroup',
    () => require('@nodegui/nodegui').QButtonGroup,
  )
  registerNativeViewElement(
    'QButtonGroupSignals',
    () => require('@nodegui/nodegui').QButtonGroupSignals,
  )
  registerNativeViewElement(
    'QSystemTrayIcon',
    () => require('@nodegui/nodegui').QSystemTrayIcon,
  )
  registerNativeViewElement(
    'QSystemTrayIconSignals',
    () => require('@nodegui/nodegui').QSystemTrayIconSignals,
  )
  registerNativeViewElement(
    'QSystemTrayIconActivationReason',
    () => require('@nodegui/nodegui').QSystemTrayIconActivationReason,
  )
  registerNativeViewElement(
    'QAction',
    () => require('@nodegui/nodegui').QAction,
  )
  registerNativeViewElement(
    'QActionSignals',
    () => require('@nodegui/nodegui').QActionSignals,
  )
  registerNativeViewElement(
    'QShortcut',
    () => require('@nodegui/nodegui').QShortcut,
  )
  registerNativeViewElement(
    'QShortcutSignals',
    () => require('@nodegui/nodegui').QShortcutSignals,
  )
  registerNativeViewElement(
    'QGroupBox',
    () => require('@nodegui/nodegui').QGroupBox,
  )
  registerNativeViewElement(
    'QGroupBoxSignals',
    () => require('@nodegui/nodegui').QGroupBoxSignals,
  )
  registerNativeViewElement(
    'QStatusBar',
    () => require('@nodegui/nodegui').QStatusBar,
  )
  registerNativeViewElement(
    'QStatusBarSignals',
    () => require('@nodegui/nodegui').QStatusBarSignals,
  )
  registerNativeViewElement(
    'QStandardItemModel',
    () => require('@nodegui/nodegui').QStandardItemModel,
  )
  registerNativeViewElement(
    'QStandardItemModelSignals',
    () => require('@nodegui/nodegui').QStandardItemModelSignals,
  )
  registerNativeViewElement(
    'QStandardItem',
    () => require('@nodegui/nodegui').QStandardItem,
  )
  registerNativeViewElement(
    'QTextBrowser',
    () => require('@nodegui/nodegui').QTextBrowser,
  )
  registerNativeViewElement(
    'QTextBrowserSignals',
    () => require('@nodegui/nodegui').QTextBrowserSignals,
  )
  registerNativeViewElement(
    'QTextEdit',
    () => require('@nodegui/nodegui').QTextEdit,
  )
  registerNativeViewElement(
    'QTextEditSignals',
    () => require('@nodegui/nodegui').QTextEditSignals,
  )
  registerNativeViewElement(
    'AutoFormattingFlag',
    () => require('@nodegui/nodegui').AutoFormattingFlag,
  )
  registerNativeViewElement(
    'QTextEditLineWrapMode',
    () => require('@nodegui/nodegui').QTextEditLineWrapMode,
  )
  registerNativeViewElement(
    'WrapMode',
    () => require('@nodegui/nodegui').WrapMode,
  )
  registerNativeViewElement(
    'QDate',
    () => require('@nodegui/nodegui').QDate,
  )
  registerNativeViewElement(
    'QDateTime',
    () => require('@nodegui/nodegui').QDateTime,
  )
  registerNativeViewElement(
    'QModelIndex',
    () => require('@nodegui/nodegui').QModelIndex,
  )
  registerNativeViewElement(
    'QMimeData',
    () => require('@nodegui/nodegui').QMimeData,
  )
  registerNativeViewElement(
    'QObject',
    () => require('@nodegui/nodegui').QObject,
  )
  registerNativeViewElement(
    'QObjectSignals',
    () => require('@nodegui/nodegui').QObjectSignals,
  )
  registerNativeViewElement(
    'NodeObject',
    () => require('@nodegui/nodegui').NodeObject,
  )
  registerNativeViewElement(
    'QVariant',
    () => require('@nodegui/nodegui').QVariant,
  )
  registerNativeViewElement(
    'QSize',
    () => require('@nodegui/nodegui').QSize,
  )
  registerNativeViewElement(
    'QRect',
    () => require('@nodegui/nodegui').QRect,
  )
  registerNativeViewElement(
    'QRectF',
    () => require('@nodegui/nodegui').QRectF,
  )
  registerNativeViewElement(
    'QPoint',
    () => require('@nodegui/nodegui').QPoint,
  )
  registerNativeViewElement(
    'QPointF',
    () => require('@nodegui/nodegui').QPointF,
  )
  registerNativeViewElement(
    'QColor',
    () => require('@nodegui/nodegui').QColor,
  )
  registerNativeViewElement(
    'QTime',
    () => require('@nodegui/nodegui').QTime,
  )
  registerNativeViewElement(
    'QUrl',
    () => require('@nodegui/nodegui').QUrl,
  )
  registerNativeViewElement(
    'ParsingMode',
    () => require('@nodegui/nodegui').ParsingMode,
  )
  registerNativeViewElement(
    'QSettings',
    () => require('@nodegui/nodegui').QSettings,
  )
  registerNativeViewElement(
    'QSettingsFormat',
    () => require('@nodegui/nodegui').QSettingsFormat,
  )
  registerNativeViewElement(
    'QSettingsScope',
    () => require('@nodegui/nodegui').QSettingsScope,
  )
  registerNativeViewElement(
    'QBoxLayout',
    () => require('@nodegui/nodegui').QBoxLayout,
  )
  registerNativeViewElement(
    'QBoxLayoutSignals',
    () => require('@nodegui/nodegui').QBoxLayoutSignals,
  )
  registerNativeViewElement(
    'QGridLayout',
    () => require('@nodegui/nodegui').QGridLayout,
  )
  registerNativeViewElement(
    'QGridLayoutSignals',
    () => require('@nodegui/nodegui').QGridLayoutSignals,
  )
  registerNativeViewElement(
    'FlexLayout',
    () => require('@nodegui/nodegui').FlexLayout,
  )
  registerNativeViewElement(
    'FlexLayoutSignals',
    () => require('@nodegui/nodegui').FlexLayoutSignals,
  )
  registerNativeViewElement(
    'StyleSheet',
    () => require('@nodegui/nodegui').StyleSheet,
  )
  registerNativeViewElement(
    'NativeElement',
    () => require('@nodegui/nodegui').NativeElement,
  )
  registerNativeViewElement(
    'Component',
    () => require('@nodegui/nodegui').Component,
  )
  registerNativeViewElement(
    'checkIfNativeElement',
    () => require('@nodegui/nodegui').checkIfNativeElement,
  )
  registerNativeViewElement(
    'checkIfNapiExternal',
    () => require('@nodegui/nodegui').checkIfNapiExternal,
  )
}