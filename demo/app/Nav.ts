import { navigate } from 'svelte-native'
import { writable } from 'svelte/store'
import RadSideDrawerElement from 'svelte-native-nativescript-ui/sidedrawer';

export let current_page = writable(null);
let nav_frame;
let drawer: RadSideDrawerElement;

export function init(navFrame, navDrawer: RadSideDrawerElement, startPage) {
    console.log("Setting nav frame:"+navFrame)
    nav_frame = navFrame;    
    drawer = navDrawer;
    current_page.set(startPage)
}

export function goto(view, props)  {
    current_page.set(view);
    navigate({
       page: view,
       props: props,
       clearHistory: true,
       frame: nav_frame
    });
}

export function toggleDrawer() {
    drawer.toggleDrawerState();
}

