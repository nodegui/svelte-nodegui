import { setViewProps, ViewProps, WidgetEventListeners } from "../View/RNView";
import {
  QSvgWidget,
  NodeWidget,
  QWidgetSignals,
  CursorShape,
  QCursor,
  QBoxLayoutSignals,
  QFont,
  QGraphicsEffect,
  NodeLayout,
  Component,
} from "@nodegui/nodegui";
import { RNComponent, RNProps } from "../config";
import { throwUnsupported } from "../../utils/helpers";

export interface SvgProps extends ViewProps<QBoxLayoutSignals> {
  /**
   * Sets the graphics effect used by the widget
   */
  graphicsEffect?: QGraphicsEffect<any>;

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
    set graphicsEffect(effect: QGraphicsEffect<any>) {
      widget.setGraphicsEffect(effect);
    },
    set src(file: string | Buffer) {
      widget.load(file);
    },
  };
  Object.assign(setter, newProps);
  setViewProps(widget, newProps, oldProps);
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
