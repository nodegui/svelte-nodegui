import BaseTabNavigationElement from "./BaseTabNavigationElement";
import { Tabs } from "@nativescript/core"

export default class TabsElement extends BaseTabNavigationElement {
    constructor() {
        super("Tabs", Tabs);
    }
}