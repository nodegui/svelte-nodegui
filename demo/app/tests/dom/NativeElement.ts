import * as chai from 'chai'
import { createElement, NativeElementNode } from 'svelte-native/dom'
import { componentFromString } from '~/component-loader';
import { ViewNode } from 'svelte-native/dom';
const assert: typeof chai.assert = (<any>global).chai.assert;

describe('NativeElementNode', function () {
    let test_subject: NativeElementNode;
    before(async function () {
        let svelteSrc = `
            <label bind:this="{test_subject}" textWrap="{true}" style="color: red" class="testlabel">Text Content</label>
            <script>
                export let test_subject;
            </script>
            <style>
                .testlabel {
                    background-color: blue;
                }
            </style>
        `;
        let HarnessComponent = await componentFromString(svelteSrc);
        let el = createElement('fragment');
        let harness = new HarnessComponent({ target: el });
        test_subject = harness.test_subject
        assert.isNotNull(test_subject)
    })

    it('sets known properties onto its nativeView', function () {
        assert.equal((test_subject.nativeView as any).textWrap, true);
    })

    it('sets text node children as text property of nativeView', function () {
        assert.equal((test_subject.nativeView as any).text, 'Text Content');
    })

    it('sets class property on nativeView', function () {
        assert.isTrue((test_subject.nativeView as any).cssClasses.has("testlabel"));
    })

    it('sets style properties on native view', function () {
        assert.equal((test_subject.nativeView as any).style.color.name, 'red');
        assert.equal((test_subject.nativeView as any).color.name, 'red');
    })


});