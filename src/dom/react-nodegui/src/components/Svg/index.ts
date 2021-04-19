import type { Fiber } from "../../utils/decoupleFromReact";
import { registerComponent, ComponentConfig } from "../config";
import { RNSvg, SvgProps } from "./RNSvg";
import { AppContainer } from "../../reconciler";

class SvgConfig extends ComponentConfig {
  tagName = RNSvg.tagName;
  shouldSetTextContent(nextProps: SvgProps): boolean {
    return false;
  }
  createInstance(
    newProps: SvgProps,
    rootInstance: AppContainer,
    context: any,
    workInProgress: Fiber
  ): RNSvg {
    const widget = new RNSvg();
    widget.setProps(newProps, {});
    return widget;
  }
  commitMount(
    instance: RNSvg,
    newProps: SvgProps,
    internalInstanceHandle: any
  ): void {
    if (newProps.visible !== false) {
      instance.show();
    }
  }
  commitUpdate(
    instance: RNSvg,
    updatePayload: any,
    oldProps: SvgProps,
    newProps: SvgProps,
    finishedWork: Fiber
  ): void {
    instance.setProps(newProps, oldProps);
  }
}

export const Svg = registerComponent<SvgProps>(
  new SvgConfig()
);
