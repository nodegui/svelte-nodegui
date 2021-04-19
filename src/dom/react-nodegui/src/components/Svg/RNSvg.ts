import { WidgetEventListeners } from "../View/RNView";
import {
  QSvgWidget,
  NodeWidget,
  QWidgetSignals,
  CursorShape,
  QCursor,
  QFont,
  QGraphicsEffect,
  NodeLayout,
  Component,
} from "@nodegui/nodegui";
import { RNComponent, RNProps } from "../config";
import { throwUnsupported } from "../../utils/helpers";

export interface SvgProps extends RNProps {
  /**
   * Sets whether the widget accepts drop events [boolean: setAcceptDrops](https://docs.nodegui.org/docs/api/generated/classes/qsvgwidget#acceptdrops)
   */
  acceptDrops?: boolean;

  /**
   * Sets the object name (id) of the widget in Qt. Object name can be analogous to id of an element in the web world. Using the objectName of the widget one can reference it in the Qt's stylesheet much like what we do with id in the web world. [QWidget: setObjectName](https://docs.nodegui.org/docs/api/NodeWidget#widgetsetobjectnameobjectname)
   */
  id?: string;

  /**
   * Prop to set the event listener map. See [Handling Events](/docs/guides/handle-events)
   */
  on?: Partial<WidgetEventListeners | QWidgetSignals>;

  /**
   * Shows or hides the widget and its children. [QWidget: show](https://docs.nodegui.org/docs/api/NodeWidget#widgetshow)
   */
  visible?: boolean;

  /**
   * Sets whether the widget is enabled or disabled by default
   */ 
  enabled?: boolean;

  /**
   * Sets the cursor type
   */
  cursor?: CursorShape|QCursor;

  /**
   * Sets a fixed size
   */
  fixedSize?: {width: number, height: number};

  /**
   * Sets whether the widget's size is controlled by someone else (for example a window's size is controlled by its frame when dragged).
   */
  flexNodeSizeControlled?: boolean;

  /**
   * Sets the font used by the widget
   */
  font?: QFont;

  /**
   * Manually set the geometry for the widget
   */
  geometry?: {x: number, y: number, w: number, h: number}

  /**
   * Sets the graphics effect used by the widget
   */
  graphicsEffect?: QGraphicsEffect<any>;

  /**
   * Sets the style string
   */
  inlineStyle?: string;

  /**
   * Sets the layout
   */
  layout?: NodeLayout<QWidgetSignals>;

  /**
   * Sets the maximum size for the widget
   */
  maximumSize?: {maxw: number, maxh: number};

  /**
   * Sets the minimum size for the widget
   */
  minimumSize?: {minw: number, minh: number};

  /**
   * Sets whether mouse tracking is enabled for this widget
   */
  mouseTracking?: boolean;

  /**
   * Sets the parent node for this widget
   */
  nodeParent?: Component;

  /**
   * Sets the stylesheet
   */
  styleSheet?: string;

  /**
   * Sets the file path
   */
  src?: string | Buffer;
}

const setSvgProps = (
  widget: RNSvg,
  newProps: SvgProps,
  oldProps: SvgProps
) => {
  const setter: SvgProps = {
    set acceptDrops(on: boolean) {
      widget.setAcceptDrops(on);
    },
    set cursor(cursor: CursorShape|QCursor) {
      widget.setCursor(cursor);
    },
    set enabled(enabled: boolean) {
      widget.setEnabled(enabled);
    },
    set fixedSize({width, height}: {width: number, height: number}) {
      widget.setFixedSize(width, height);
    },
    set flexNodeSizeControlled(isSizeControlled: boolean) {
      widget.setFlexNodeSizeControlled(isSizeControlled);
    },
    set font(font: QFont) {
      widget.setFont(font);
    },
    set geometry({x, y, w, h}: {x: number, y: number, w: number, h: number}) {
      widget.setGeometry(x, y, w, h);
    },
    set graphicsEffect(effect: QGraphicsEffect<any>) {
      widget.setGraphicsEffect(effect);
    },
    set inlineStyle(style: string) {
      widget.setInlineStyle(style);
    },
    set layout(parentLayout: NodeLayout<QWidgetSignals>) {
      widget.setLayout(parentLayout);
    },
    set maximumSize({maxw, maxh}: {maxw: number, maxh: number}) {
      widget.setMaximumSize(maxw, maxh);
    },
    set minimumSize({minw, minh}: {minw: number, minh: number}) {
      widget.setMinimumSize(minw, minh);
    },
    set mouseTracking(isMouseTracked: boolean) {
      widget.setMouseTracking(isMouseTracked);
    },
    set nodeParent(parent: Component) {
      widget.setNodeParent(parent);
    },
    set styleSheet(styleSheet: string) {
      widget.setStyleSheet(styleSheet);
    },
    set src(file: string | Buffer) {
      widget.load(file);
    },
    set id(id: string) {
      widget.setObjectName(id);
    },
    set on(
      listenerMap: Partial<WidgetEventListeners | QWidgetSignals>
    ) {
      const listenerMapLatest: any = Object.assign({}, listenerMap);
      const oldListenerMap = Object.assign({}, oldProps.on);
      Object.entries(oldListenerMap).forEach(([eventType, oldEvtListener]) => {
        const newEvtListener = listenerMapLatest[eventType];
        if (oldEvtListener !== newEvtListener) {
          widget.removeEventListener(eventType as any, oldEvtListener);
        } else {
          delete listenerMapLatest[eventType];
        }
      });

      Object.entries(listenerMapLatest).forEach(
        ([eventType, newEvtListener]) => {
          widget.addEventListener(eventType as any, newEvtListener);
        }
      );
    },
    set visible(shouldShow: boolean) {
      shouldShow ? widget.show() : widget.hide();
    },
  };
  Object.assign(setter, newProps);
};

/**
 * @ignore
 */
export class RNSvg extends QSvgWidget implements RNComponent {
  static tagName = "svg";

  setProps(newProps: SvgProps, oldProps: SvgProps): void {
    setSvgProps(this, newProps, oldProps);
  }
  appendInitialChild(child: NodeWidget<any>): void {
    throwUnsupported(this);
  }
  appendChild(child: NodeWidget<any>): void {
    throwUnsupported(this);
  }
  insertBefore(child: NodeWidget<any>, beforeChild: NodeWidget<any>): void {
    throwUnsupported(this);
  }
  removeChild(child: NodeWidget<any>): void {
    throwUnsupported(this);
  }
}
