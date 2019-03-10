const assert = (global as any).chai.assert
import { svelteNative } from "svelte-native"

describe('svelte-native', function () {
    it('exposes start function', function () {
        assert.exists(svelteNative); //Assert that the counter equals 42.
    });
});