import BaseTabNavigationElement from "./BaseTabNavigationElement";
import { BottomNavigation } from "@nativescript/core/ui/bottom-navigation"

export default class BottomNavigationElement extends BaseTabNavigationElement {
    constructor() {
        super("BottomNavigation", BottomNavigation);
    }
}