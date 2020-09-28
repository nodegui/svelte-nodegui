import { initializeDom, DomTraceCategory } from "svelte-native";


import { Trace as trace } from "@nativescript/core"
trace.enable();
trace.addCategories(DomTraceCategory);


before(() => { initializeDom(); });