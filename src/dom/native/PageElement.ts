import { Page } from '@nativescript/core'
import NativeViewElementNode from './NativeViewElementNode';


export default class PageElement extends NativeViewElementNode<Page> {
    constructor() {
        super('page', Page);
    }
}