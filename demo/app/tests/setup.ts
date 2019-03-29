import { initializeDom } from 'svelte-native/dom'
import { Buffer } from 'buffer'
(global as any).btoa =
    function (str) { return Buffer.from(str, 'utf-8').toString('base64'); };
(global as any).window = global;

console.log("registered btoa", window.btoa);

before(() => {
    initializeDom();
    (global as any).self = (global as any).window;
})
