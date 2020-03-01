import { Page } from '@nativescript/core/ui/page'
import NativeViewElementNode from './NativeViewElementNode';


export default class PageElement extends NativeViewElementNode<Page> {
    constructor() {
        super('page', Page);
    }
}