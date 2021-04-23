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
            import("./dom/react-nodegui/src").ImageProps,
            import("./dom/react-nodegui/src").RNImage
        >;
        animatedImage: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").AnimatedImageProps,
            import("./dom/react-nodegui/src").RNAnimatedImage
        >;
        view: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").ViewProps<any>,
            import("./dom/react-nodegui/src").RNView
        >;
        checkBox: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").CheckBoxProps,
            import("./dom/react-nodegui/src").RNCheckBox
        >;
        text: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").TextProps,
            import("./dom/react-nodegui/src").RNText
        >;
        dial: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").DialProps,
            import("./dom/react-nodegui/src").RNDial
        >;
        lineEdit: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").LineEditProps,
            import("./dom/react-nodegui/src").RNLineEdit
        >;
        window: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").WindowProps,
            import("./dom/react-nodegui/src").RNWindow
        >;
        progressBar: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").ProgressBarProps,
            import("./dom/react-nodegui/src").RNProgressBar
        >;
        comboBox: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").ComboBoxProps,
            import("./dom/react-nodegui/src").RNComboBox
        >;
        button: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").ButtonProps,
            import("./dom/react-nodegui/src").RNButton
        >;
        spinBox: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").SpinBoxProps,
            import("./dom/react-nodegui/src").RNSpinBox
        >;
        radioButton: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").RadioButtonProps,
            import("./dom/react-nodegui/src").RNRadioButton
        >;
        tab: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").TabProps,
            import("./dom/react-nodegui/src").RNTab
        >;
        menu: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").MenuProps,
            import("./dom/react-nodegui/src").RNMenu
        >;
        menuBar: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").MenuBarProps,
            import("./dom/react-nodegui/src").RNMenuBar
        >;
        plainTextEdit: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").PlainTextEditProps,
            import("./dom/react-nodegui/src").RNPlainTextEdit
        >;
        slider: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").SliderProps,
            import("./dom/react-nodegui/src").RNSlider
        >;
        systemTrayIcon: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").SystemTrayIconProps,
            import("./dom/react-nodegui/src").RNSystemTrayIcon
        >;
        svg: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").SvgProps,
            import("./dom/react-nodegui/src").RNSvg
        >;
        action: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").ActionProps,
            import("./dom/react-nodegui/src").RNAction
        >;
        boxView: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").BoxViewProps,
            import("./dom/react-nodegui/src").RNBoxView
        >;
        gridView: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").GridViewProps,
            import("./dom/react-nodegui/src").RNGridView
        >;
        scrollArea: SvelteNodeGUIProps<
            import("./dom/react-nodegui/src").ScrollAreaProps,
            import("./dom/react-nodegui/src").RNScrollArea
        >;
    }
}
