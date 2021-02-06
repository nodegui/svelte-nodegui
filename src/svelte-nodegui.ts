declare namespace svelteNodeGUI.JSX {
    /* svelte specific */
    interface ElementClass {
        $$prop_def: any;
    }

    interface ElementAttributesProperty {
        $$prop_def: any; // specify the property name to use
    }

    /* I'm not sure of the type for Svelte Element, but extending ElementClass just makes the `$$prop_def` attribute become mandatory. */
    // type SvelteElement = ElementClass;
    type SvelteElement = {};
    type SvelteText = string | number;
    type SvelteChild = SvelteElement | SvelteText;

    interface SvelteNodeArray extends Array<SvelteNode> {}
    type SvelteFragment = {} | SvelteNodeArray;

    type SvelteNode = SvelteChild | SvelteFragment | boolean | null | undefined; 

    interface SvelteNodeGUIAttributes<
        T extends import("@nodegui/nodegui").Component = import("@nodegui/nodegui").Component
    > extends SvelteElement {
        nodeRole?: string;
        /* Unlike in React, Doesn't seem to be checked..? */
        // children?: SvelteNode;
    }
    
    /**
     * Known issues:
     * 1) None of the event handlers are filled in. Consequently, all event handlers provoke edit-time errors.
     *    Of interest: `on:clicked` in HTMLX becomes `onclicked` in JSX.
     *    Most likely, it follows a rule of `on${Lowercase<T>}` for a given event name.
     * 
     * 2) All attributes written in HTMLX are forced to lowercase (both at edit-time and runtime, by different
     *    tooling). Thus, `windowTitle="Hi"` becomes `windowtitle="Hi"`.
     * 
     * In both cases, the latest stable TypeScript isn't expressive enough to express a remapping of types to lower case.
     * However, once TypeScript 4.1 lands, it should be (provided they can sort out intrinsic types like Lowercase<T>).
     * @see https://github.com/microsoft/TypeScript/pull/40336
     * @see https://github.com/microsoft/TypeScript/pull/40580
     * 
     * In any case, a change coming to core would hopefully solve this.
     * @see https://github.com/sveltejs/svelte/pull/5652
     * 
     * For now, particularly until Svelte tooling supports TypeScript 4.1, the best we can do to prevent frustration is
     * fall back to any type (which we do with the final type intersection).
     */
    type SvelteNodeGUIProps<
        Props extends {} = {},
        T extends import("@nodegui/nodegui").Component = import("@nodegui/nodegui").Component
    > = SvelteNodeGUIAttributes<T> & Props & { [name: string]: any; };

    // Add empty IntrinsicAttributes to prevent fallback to the one in the JSX namespace
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicAttributes {
    }

    interface IntrinsicElements {
        [name: string]: { [name: string]: any };
        image: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/Image/RNImage").ImageProps,
            import("./dom/react-nodegui/src/components/Image/RNImage").RNImage
        >;
        animatedImage: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/AnimatedImage/RNAnimatedImage").AnimatedImageProps,
            import("./dom/react-nodegui/src/components/AnimatedImage/RNAnimatedImage").RNAnimatedImage
        >;
        view: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/View/RNView").ViewProps<any>,
            import("./dom/react-nodegui/src/components/View/RNView").RNView
        >;
        checkBox: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/CheckBox/RNCheckBox").CheckBoxProps,
            import("./dom/react-nodegui/src/components/CheckBox/RNCheckBox").RNCheckBox
        >;
        text: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/Text/RNText").TextProps,
            import("./dom/react-nodegui/src/components/Text/RNText").RNText
        >;
        dial: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/Dial/RNDial").DialProps,
            import("./dom/react-nodegui/src/components/Dial/RNDial").RNDial
        >;
        lineEdit: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/LineEdit/RNLineEdit").LineEditProps,
            import("./dom/react-nodegui/src/components/LineEdit/RNLineEdit").RNLineEdit
        >;
        window: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/Window/RNWindow").WindowProps,
            import("./dom/react-nodegui/src/components/Window/RNWindow").RNWindow
        >;
        progressBar: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/ProgressBar/RNProgressBar").ProgressBarProps,
            import("./dom/react-nodegui/src/components/ProgressBar/RNProgressBar").RNProgressBar
        >;
        comboBox: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/ComboBox/RNComboBox").ComboBoxProps,
            import("./dom/react-nodegui/src/components/ComboBox/RNComboBox").RNComboBox
        >;
        button: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/Button/RNButton").ButtonProps,
            import("./dom/react-nodegui/src/components/Button/RNButton").RNButton
        >;
        spinBox: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/SpinBox/RNSpinBox").SpinBoxProps,
            import("./dom/react-nodegui/src/components/SpinBox/RNSpinBox").RNSpinBox
        >;
        radioButton: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/RadioButton/RNRadioButton").RadioButtonProps,
            import("./dom/react-nodegui/src/components/RadioButton/RNRadioButton").RNRadioButton
        >;
        tab: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/Tab/RNTab").TabProps,
            import("./dom/react-nodegui/src/components/Tab/RNTab").RNTab
        >;
        menu: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/Menu/RNMenu").MenuProps,
            import("./dom/react-nodegui/src/components/Menu/RNMenu").RNMenu
        >;
        menuBar: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/MenuBar/RNMenuBar").MenuBarProps,
            import("./dom/react-nodegui/src/components/MenuBar/RNMenuBar").RNMenuBar
        >;
        plainTextEdit: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/PlainTextEdit/RNPlainTextEdit").PlainTextEditProps,
            import("./dom/react-nodegui/src/components/PlainTextEdit/RNPlainTextEdit").RNPlainTextEdit
        >;
        slider: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/Slider/RNSlider").SliderProps,
            import("./dom/react-nodegui/src/components/Slider/RNSlider").RNSlider
        >;
        systemTrayIcon: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/SystemTrayIcon/RNSystemTrayIcon").SystemTrayIconProps,
            import("./dom/react-nodegui/src/components/SystemTrayIcon/RNSystemTrayIcon").RNSystemTrayIcon
        >;
        action: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/Action/RNAction").ActionProps,
            import("./dom/react-nodegui/src/components/Action/RNAction").RNAction
        >;
        boxView: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/BoxView/RNBoxView").BoxViewProps,
            import("./dom/react-nodegui/src/components/BoxView/RNBoxView").RNBoxView
        >;
        gridView: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src/components/GridView/RNGridView").GridViewProps,
            import("./dom/react-nodegui/src/components/GridView/RNGridView").RNGridView
        >;
    }
}
