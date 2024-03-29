import type { FunctionComponentElement } from "../../../utils/decoupleFromReact";
import { Component, NodeWidget } from "@nodegui/nodegui";
import { RNComponent } from "../../config";
import { RNGridRow } from "../GridRow/RNGridRow";

export type GridColumnProps = {
  /**
   * The number of horizontal units to occupy
   */
  width?: number;
};

const setGridColumnProps = (
  widget: RNGridColumn,
  parentRow: RNGridRow,
  newProps: GridColumnProps,
  oldProps: GridColumnProps
) => {
  if (widget.actualWidget) {
    // TODO: Optimize this
    parentRow.parentGrid?.layout?.removeWidget(widget.actualWidget);
    parentRow.parentGrid?.layout?.addWidget(
      widget.actualWidget,
      parentRow.rowIndex ?? 0,
      widget.columnIndex ?? 0,
      parentRow.height ?? 1,
      widget.width ?? 1
    );
  }

  const setter: GridColumnProps = {
    set width(width: number) {
      widget.width = width;
    },
  };
  Object.assign(setter, newProps);
};

export class RNGridColumn extends Component implements RNComponent {
  native: any;
  actualWidget?: NodeWidget<any>;
  parentRow?: RNGridRow;
  latestProps?: GridColumnProps;
  prevProps?: GridColumnProps;
  columnIndex?: number;
  width?: number;

  setParentRowAndUpdateProps(parentRow: RNGridRow, index: number): void {
    this.parentRow = parentRow;
    this.columnIndex = index;
    setGridColumnProps(
      this,
      parentRow,
      this.latestProps ?? {},
      this.prevProps ?? {}
    );
  }

  remove(): void {
    if (!this.actualWidget) {
      return;
    }

    this.parentRow?.parentGrid?.layout?.removeWidget(this.actualWidget);
    this.actualWidget.close();
    this.actualWidget = undefined;
  }

  /* RNComponent */

  setProps(newProps: GridColumnProps, oldProps: GridColumnProps): void {
    if (this.parentRow) {
      setGridColumnProps(this, this.parentRow, newProps, oldProps);
    }

    this.latestProps = newProps;
    this.prevProps = oldProps;
  }
  appendInitialChild(child: NodeWidget<any>): void {
    if (this.actualWidget) {
      throw new Error("Grid column can have only one child");
    }
    this.actualWidget = child;
  }
  appendChild(child: NodeWidget<any>): void {
    this.appendInitialChild(child);
  }
  insertBefore(child: NodeWidget<any>, beforeChild: NodeWidget<any>): void {
    this.appendInitialChild(child);
  }
  removeChild(child: NodeWidget<any>): void {
    this.remove();
  }
  static tagName: string = "gridcolumn";
}
