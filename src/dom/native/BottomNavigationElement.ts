import BaseTabNavigationElement from "./BaseTabNavigationElement";
import { BottomNavigation } from "tns-core-modules/ui/bottom-navigation"

export default class BottomNavigationElement extends BaseTabNavigationElement {
    constructor() {
        super("BottomNavigation", BottomNavigation);
    }
}