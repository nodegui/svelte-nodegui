import { svelteNativeNoFrame } from "svelte-native";
import RadSideDrawerElement from "svelte-native-nativescript-ui/sidedrawer"

RadSideDrawerElement.register();

//import * as trace from "@nativescript/core/trace"
//trace.enable();
//trace.addCategories(DomTraceCategory);

import App from "./App.svelte";
svelteNativeNoFrame(App, {});
