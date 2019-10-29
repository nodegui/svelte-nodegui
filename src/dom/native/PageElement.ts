import { Page } from 'tns-core-modules/ui/page'
import NativeViewElementNode from './NativeViewElementNode';


export default class PageElement extends NativeViewElementNode<Page> {
    constructor() {
        super('page', Page);
    }
}