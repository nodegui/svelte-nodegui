import { initializeDom } from 'svelte-native/dom'

before(function () {
    initializeDom();
    (global as any).self = (global as any).window;
})