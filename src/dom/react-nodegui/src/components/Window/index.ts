import { registerComponent, ComponentConfig } from "../config";
import type { Fiber } from "../../utils/decoupleFromReact";
import { WindowProps, RNWindow } from "./RNWindow";
import { AppContainer } from "../../reconciler";

class WindowConfig extends ComponentConfig {
  tagName = RNWindow.tagName;
  shouldSetTextContent(nextProps: WindowProps): boolean {
    return false;
  }
  createInstance(
    newProps: WindowProps,
    rootInstance: AppContainer,
    context: any,
    workInProgress: Fiber
  ): RNWindow {
    const window = new RNWindow();
    window.setProps(newProps, {});
    return window;
  }
  finalizeInitialChildren(
    instance: RNWindow,
    newProps: WindowProps,
    rootContainerInstance: AppContainer,
    context: any
  ): boolean {
    return true;
  }
  commitMount(
    instance: RNWindow,
    newProps: WindowProps,
    internalInstanceHandle: any
  ): void {
    if (newProps.visible !== false) {
      instance.show();
    }
    return;
  }
  commitUpdate(
    instance: RNWindow,
    updatePayload: any,
    oldProps: WindowProps,
    newProps: WindowProps,
    finishedWork: Fiber
  ): void {
    instance.setProps(newProps, oldProps);
  }
}

export const Window = registerComponent<WindowProps>(new WindowConfig());
