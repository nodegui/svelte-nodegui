/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { svelteNative, DomTraceCategory } from "svelte-native";
import * as trace from "tns-core-modules/trace"
import App from "./App.svelte";
trace.enable();
trace.addCategories(DomTraceCategory);
svelteNative(App, {});


