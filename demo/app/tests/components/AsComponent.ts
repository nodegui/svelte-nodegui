import * as chai from 'chai'
import { AsComponent } from "svelte-native/components"
import { compiler } from 'svelte'
const assert: typeof chai.assert = (<any>global).chai.assert;


describe('AsComponent', function () {
    it('can be instantiated empty', function () {
        let c = new AsComponent({});
        assert.isNotNull(c.component)
    });
});