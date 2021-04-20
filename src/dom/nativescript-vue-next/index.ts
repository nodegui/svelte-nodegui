export { NSVNodeTypes, NSVViewFlags, NSVNode, NSVElement, NSVComment, NSVText, NSVRoot } from "./runtime";
export {
    NSVElementResolver,
    NSVModelDescriptor,
    NSVViewMeta,
    NSVElementDescriptor,
    defaultViewMeta,
    getViewMeta,
    getViewClass,
    normalizeElementName,
    registerElement,
    isKnownView,
    registerNativeElements
} from "./runtime";

export {
    ELEMENT_REF,
    isBoolean,
} from "./runtime";