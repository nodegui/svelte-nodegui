import BaseTabNavigationElement from "./BaseTabNavigationElement";
import { Tabs } from "tns-core-modules/ui/tabs"

export default class TabsElement extends BaseTabNavigationElement {
    constructor() {
        super("Tabs", Tabs);
    }
}