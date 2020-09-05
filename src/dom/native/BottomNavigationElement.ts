import BaseTabNavigationElement from "./BaseTabNavigationElement";
import { BottomNavigation } from "@nativescript/core"

export default class BottomNavigationElement extends BaseTabNavigationElement {
    constructor() {
        super("BottomNavigation", BottomNavigation);
    }
}