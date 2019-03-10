var svelte_native = require("svelte-native"); //Require the main view model to expose the functionality inside it.

describe('svelte-native', function () {
    it('exposes start function', function () {
        assert.exists(svelte_native.svelteNative); //Assert that the counter equals 42.
    });
});