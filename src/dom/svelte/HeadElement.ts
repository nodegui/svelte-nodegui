import { NSVElement, NSVNodeTypes } from "../nativescript-vue-next/runtime/nodes";
import { RNObject } from "./RNObject";
import StyleElement from "./StyleElement";
// import { addCss } from "@nativescript/core/application"

export default class HeadElement extends NSVElement<RNObject> {
    private readonly styleElements: Set<StyleElement> = new Set();

    constructor() {
        super("head")
    }

    addStyleElement(styleElement: StyleElement): void {
        this.styleElements.add(styleElement);
        this.updateStyles();
    }

    removeStyleElement(styleElement: StyleElement): void {
        this.styleElements.delete(styleElement);
        this.updateStyles();
    }

    getStyleSheet(): string {
        let css: string = "";
        let i: number = 0;
        for (const styleElement of this.styleElements) {
            if(i > 0){
                css += "\n";
            }
            css += styleElement.nativeView.textContent;
            i++;
        }
        return css;
    }

    updateStyles(): void {
        const ss: string = this.getStyleSheet();
        // console.log(`[HeadElement] updateStyles got stylesheet: \`${ss}\``);
        this.ownerDocument.setStyleSheets(ss);
    }
}