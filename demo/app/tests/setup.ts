import { DomTraceCategory, initializeDom } from "svelte-native/dom";
import * as trace from "tns-core-modules/trace"
//uncomment to enable verbose debug trace
//trace.enable();
trace.addCategories(DomTraceCategory);

before(() => {
    initializeDom();
})
