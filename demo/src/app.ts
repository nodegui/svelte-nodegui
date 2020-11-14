import { svelteDesktop } from "svelte-desktop";

import App from "./App.svelte";
const props = { who: "bob" };
svelteDesktop(App, props);


declare global {
    var __HMR_MODE__: "live-reload" | "hmr" | "none";
    namespace NodeJS {
        interface Module {
            hot: any;
        }
    }
}

if(module.hot){
    if(__HMR_MODE__ === "live-reload"){
        module.hot.accept(function(){
            console.log(`Hot update received; will send exit signal to live reload.`);
            /**
             * Our user-defined exit code for livereload.
             * @see ../livereload.sh
             */
            process.exit(64);
        });
    } else if(__HMR_MODE__ === "hmr"){
        module.hot.accept(["./app", "./App.svelte"], function(...args){
            // console.warn(`Unable to accept hot update – HMR not yet implemented!`);
            console.log(`Accepting!`, args);
            svelteDesktop(App, props);
        });
    }
}