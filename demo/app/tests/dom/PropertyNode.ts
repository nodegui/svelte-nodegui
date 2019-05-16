import { createElement } from 'svelte-native/dom'
import { ViewNode } from 'svelte-native/dom';
import PropertyNodeHarness from './PropertyNodeHarness.svelte'

describe('PropertyNode', function () {
    let test_subject;
    before(async function () {

        let el = createElement('fragment');
        let harness = new PropertyNodeHarness({ target: el });
        test_subject = (harness as any).test_subject
        assert.isNotNull(test_subject)
    })

    it('sets a property on its parent element', async function () {
        assert.isNotNull(test_subject.getAttribute('testproperty'))
    })

    it('the property set is an element', async function () {
        assert.instanceOf(test_subject.getAttribute('testproperty'), ViewNode);
    })

    it('the property is the first child of the node', async function () {
        let propValue = test_subject.getAttribute('testproperty')
        assert.equal(propValue.tagName, 'label');
        assert.equal(propValue.getAttribute('text'), 'test label');
    })
});