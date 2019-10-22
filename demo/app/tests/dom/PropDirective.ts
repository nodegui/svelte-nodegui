import { createElement } from 'svelte-native/dom'
import { ViewNode } from 'svelte-native/dom';
import PropDirectiveHarness from './PropDirectiveHarness.svelte'
import { Label } from 'tns-core-modules/ui/label/label';

describe('PropDirective', function () {
    let test_subject;
    let harness;
    before(async function () {
        let el = createElement('fragment');
        harness = new PropDirectiveHarness({ target: el });
        test_subject = (harness as any).test_subject
        assert.isNotNull(test_subject)
    })

    it('sets a property on its parent element', async function () {
        assert.isNotNull(test_subject.getAttribute('testproperty'))
    })

    it('the property set is an nativeelement', async function () {
        assert.instanceOf(test_subject.getAttribute('testproperty'), Label);
    })

    it('sets a property to null when removed', async function () {
        harness.enabled = false;
        assert.isNull(test_subject.getAttribute('testproperty'))
    })
});