import { NSVElement, NSVNodeTypes } from "../nativescript-vue-next/runtime/nodes";
import { RNObject } from "./Object";
import StyleElement from "./StyleElement";
// import { addCss } from "@nativescript/core/application"

export default class HeadElement extends NSVElement<RNObject> {
    constructor() {
        super("head")
    }
}