import { initializeDom, NSVElement } from './dom';


declare global {
    export class SvelteComponent {
        $destroy(): void;
        constructor(options: { target?: NSVElement | Element, props?: any, anchor?: NSVElement | Element, intro?: boolean });
        $set(props: any): void;
    }
}

export function svelteNodeGUI(rootElement: typeof SvelteComponent, data: any): Promise<SvelteComponent> {
    const doc = initializeDom();

    return new Promise((resolve, reject) => {

        let elementInstance: SvelteComponent;

        const buildElement = () => {
            elementInstance = new rootElement({
                target: doc.body,
                props: data || {}
            })
            return (doc.body.firstChild as NSVElement).nativeView;
        }
        
        buildElement();
        resolve(elementInstance);
    });
}

// Svelte looks to see if window is undefined in order to determine if it is running on the client or in SSR.
// window is undefined until initializeDom is called. We will set it to a temporary value here and overwrite it in intializedom.
(global as any).window = { env: "Svelte NodeGUI" }


export { initializeDom, DomTraceCategory, NSVElement } from "./dom";
export {
    ImageProps, RNImage,
    AnimatedImageProps, RNAnimatedImage,
    ViewProps, RNView,
    CheckBoxProps, RNCheckBox,
    TextProps, RNText,
    DialProps, RNDial,
    LineEditProps, RNLineEdit,
    WindowProps, RNWindow,
    ProgressBarProps, RNProgressBar,
    ComboBoxProps, RNComboBox,
    ButtonProps, RNButton,
    SpinBoxProps, RNSpinBox,
    RadioButtonProps, RNRadioButton,
    TabProps, RNTab,
    MenuProps, RNMenu,
    MenuBarProps, RNMenuBar,
    PlainTextEditProps, RNPlainTextEdit,
    SliderProps, RNSlider,
    SystemTrayIconProps, RNSystemTrayIcon,
    ActionProps, RNAction,
    BoxViewProps, RNBoxView,
    GridViewProps, RNGridView,
    ScrollAreaProps, RNScrollArea,
} from "./dom/react-nodegui/src";