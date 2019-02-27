import { Page } from 'tns-core-modules/ui/page'
import NativeElementNode from "./NativeElementNode";


export default class PageElement extends NativeElementNode {
    constructor() {
        super('page', Page, null);
    }

    get nativeView(): Page {
        return super.nativeView as Page
    }

    set nativeView(view: Page) {
        super.nativeView = view
    }
}