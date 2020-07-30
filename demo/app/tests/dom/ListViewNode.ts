import { createElement, NativeViewElementNode, initializeDom } from 'svelte-native/dom'
import { ListView } from '@nativescript/core/ui/list-view'

import ListViewMultiTemplate from './ListViewMultiTemplate.svelte'
before(() => { initializeDom(); });

describe('ListViewNode', function () {
    let test_subject: NativeViewElementNode<ListView>
    

    before(async function () {
        let el = createElement('fragment');
        let harness = new ListViewMultiTemplate({ target: el as any });
        test_subject = (harness as any).test_subject
        assert.isNotNull(test_subject)
    })

    it('detects keyed templates', async function () {
        let listview = test_subject.nativeView;
        assert.equal(listview.itemTemplates.length, 2, `expected 2 keyed item templates`)
    })

});