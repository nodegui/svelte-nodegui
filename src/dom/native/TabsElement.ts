import BaseTabNavigationElement from "./BaseTabNavigationElement";
import { Tabs } from "@nativescript/core/ui/tabs"

export default class TabsElement extends BaseTabNavigationElement {
    constructor() {
        super("Tabs", Tabs);
    }
}