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
    }

    removeStyleElement(styleElement: StyleElement): void {
        this.styleElements.delete(styleElement);
    }

    getStyleSheet(): string {
        let css: string = "";
        for (const styleElement of this.styleElements) {
            css += styleElement.nativeView.textContent + "\n";
        }
        return css;
    }

    updateStyles(): void {
        const ss: string = this.getStyleSheet();
        this.ownerDocument.setStyleSheets(ss);
    }
}