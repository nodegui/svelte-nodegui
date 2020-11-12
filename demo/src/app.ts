import { svelteDesktop } from "svelte-desktop";

//import * as trace from "@nativescript/core/trace"
//trace.enable();
//trace.addCategories(DomTraceCategory);

import App from "./App.svelte";
svelteDesktop(App, {});


declare global {
    var __HMR_MODE__: "live-reload" | "hmr" | "none";
    namespace NodeJS {
        interface Module {
            hot: any;
        }
    }
}

if(module.hot){
    module.hot.accept(["./app"], function() {
        if(__HMR_MODE__ === "live-reload"){
            console.log(`Hot update received; will send exit signal to live reload.`);
            process.exit(1);
        } else if(__HMR_MODE__ === "hmr"){
            console.warn(`Unable to accept hot update – HMR not yet implemented!`);
        }
    });
}