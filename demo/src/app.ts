/// <reference path="../node_modules/svelte-desktop/svelte-desktop.d.ts" />
import { svelteDesktop } from "svelte-desktop";

//import * as trace from "@nativescript/core/trace"
//trace.enable();
//trace.addCategories(DomTraceCategory);

import App from "./App.svelte";
svelteDesktop(App, {});
