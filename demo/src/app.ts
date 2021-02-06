import { svelteNodeGUI } from "@nodegui/svelte-nodegui";

import App from "./App.svelte";
svelteNodeGUI(App, {});


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
        module.hot.accept(["./app"], function(){
            console.warn(`Unable to accept hot update – HMR not yet implemented!`);
        });
    }
}