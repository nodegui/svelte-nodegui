import {
    QObject,
    QObjectSignals,
    Component,
  } from "@nodegui/nodegui";
  import { RNComponent, RNProps } from "../react-nodegui/src/components/config";
  import { throwUnsupported } from "../react-nodegui/src/utils/helpers";
  
  export interface ObjectProps extends RNProps {
    /**
     * Sets the object name (id) of the widget in Qt. Object name can be analogous to id of an element in the web world. Using the objectName of the widget one can reference it in the Qt's stylesheet much like what we do with id in the web world. [QWidget: setObjectName](https://docs.nodegui.org/docs/api/NodeWidget#widgetsetobjectnameobjectname)
     */
    id?: string;
  
    /**
     * Prop to set the event listener map. See [Handlong Events](/docs/guides/handle-events)
     */
    on?: Partial<QObjectSignals>;

    textContent?: string;
  }
  
  const setObjectProps = (
    widget: RNObject,
    newProps: ObjectProps,
    oldProps: ObjectProps
  ) => {
    const setter: ObjectProps = {
      set id(id: string) {
        widget.setObjectName(id);
      },
      set on(listenerMap: Partial<QObjectSignals>) {
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
      set textContent(t: string) {
        widget.setProperty("textContent", t);
      },
    };
    Object.assign(setter, newProps);
  };
  
  /**
   * @see https://docs.nodegui.org/docs/api/generated/classes/qobject/
   */
  export class RNObject extends QObject implements RNComponent {
    get id(): string {
      return this.objectName();
    }
    get textContent(): string{
      return this.property("textContent").toString();
    }
    set textContent(t: string) {
      this.setProperty("textContent", t);
    };
    setProps(newProps: ObjectProps, oldProps: ObjectProps): void {
      setObjectProps(this, newProps, oldProps);
    }
    appendInitialChild(child: Component) {
      /* Just no-op. Use-cases include e.g. document > head */
      // throwUnsupported(this);
    }
    appendChild(child: Component): void {
      // console.log(`[RNObject] appendChild(${child})`);
      /* Just no-op. Use-cases include e.g. document > head */
      // throwUnsupported(this);
    }
    insertBefore(child: Component, beforeChild: Component): void {
      /* Just no-op. Use-cases include e.g. document > head */
      // throwUnsupported(this);
    }
    removeChild(child: Component): void {
      /* Just no-op. Use-cases include e.g. document x head */
      // throwUnsupported(this);
    }
    static tagName = "object";

    toString(): string {
      return `RNObject()`;
    }
  }