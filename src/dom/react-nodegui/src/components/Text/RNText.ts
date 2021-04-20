import { QLabel, NodeWidget, QLabelSignals, TextInteractionFlag } from '@nodegui/nodegui';
import { ViewProps, setViewProps } from '../View/RNView';
import { RNWidget } from '../config';
import { throwUnsupported } from '../../utils/helpers';

export interface TextProps extends ViewProps<QLabelSignals> {
  children?: string | number | Array<string | number>;
  wordWrap?: boolean;
  scaledContents?: boolean;
  openExternalLinks?: boolean;
  textInteractionFlags?: TextInteractionFlag;
}

/**
 * @ignore
 */
export const setTextProps = (
  widget: RNText,
  newProps: TextProps,
  oldProps: TextProps
) => {
  console.log(`[!RNText] setTextProps 1 - wordWrap now: ${widget.wordWrap()}`, newProps, oldProps);
  const setter: TextProps = {
    set children(text: string | number | Array<string | number>) {
      text = Array.isArray(text) ? text.join('') : text;

      widget.setText(text);
    },
    set wordWrap(shouldWrap: boolean) {
      console.log(`[!RNText] Setting shouldWrap to: ${shouldWrap}`);
      widget.setWordWrap(shouldWrap);
    },
    set scaledContents(scaled: boolean) {
      widget.setProperty('scaledContents', scaled);
    },
    set openExternalLinks(shouldOpenExternalLinks: boolean) {
      widget.setProperty('openExternalLinks', shouldOpenExternalLinks);
    },
    set textInteractionFlags(interactionFlag: TextInteractionFlag){
      widget.setProperty('textInteractionFlags', interactionFlag);
    }
  };
  Object.assign(setter, newProps);
  console.log(`[!RNText] setTextProps 2 - assigned setter`, setter);
  console.log(`[!RNText] setTextProps 3 - wordWrap now: ${widget.wordWrap()}`, newProps, oldProps);
  setViewProps(widget, newProps, oldProps);
  console.log(`[!RNText] setTextProps 4 - wordWrap now: ${widget.wordWrap()}`, newProps, oldProps);
};

/**
 * @ignore
 */
export class RNText extends QLabel implements RNWidget {
  setProps(newProps: TextProps, oldProps: TextProps): void {
    console.log(`[RNText.setProps()]`, newProps, oldProps);
    setTextProps(this, newProps, oldProps);
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
  static tagName = 'text';
}
