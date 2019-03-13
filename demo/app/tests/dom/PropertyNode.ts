import * as chai from 'chai'
import { createElement, NativeElementNode } from 'svelte-native/dom'
import { componentFromString } from '~/component-loader';
import { ViewNode } from 'svelte-native/dom';
const assert: typeof chai.assert = (<any>global).chai.assert;

describe('PropertyNode', function () {
    let test_subject;
    before(async function () {
        let svelteSrc = `
            <fragment bind:this={test_subject}>
                <fragment.testproperty>
                    <label text="test label"/>
                </fragment.testproperty>
            </fragment>
            <script>
                export let test_subject;
            </script>
        `;
        let HarnessComponent = await componentFromString(svelteSrc);
        let el = createElement('fragment');
        let harness = new HarnessComponent({ target: el });
        test_subject = harness.test_subject
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