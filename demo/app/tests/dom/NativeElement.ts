import { createElement, NativeElementNode } from 'svelte-native/dom'
import NativeElementHarness from './NativeElementHarness.svelte'

describe('NativeElementNode', function () {
    let test_subject: NativeElementNode;
    before(async function () {
        let el = createElement('fragment');
        let harness = new NativeElementHarness({ target: el });
        test_subject = (harness as any).test_subject
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

    it('supports class directive', function () {
        assert.isTrue((test_subject.nativeView as any).cssClasses.has('boolclass'));
        assert.isFalse((test_subject.nativeView as any).cssClasses.has('boolclassf'))
    })


    it('sets style properties on native view', function () {
        assert.equal((test_subject.nativeView as any).style.color.name, 'red');
        assert.equal((test_subject.nativeView as any).color.name, 'red');
    })


});