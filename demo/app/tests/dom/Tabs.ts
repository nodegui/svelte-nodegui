import { createElement, TabsElement, NativeViewElementNode, initializeDom } from 'svelte-native/dom'
import { tick } from 'svelte';
import TabsHarness from './TabsHarness.svelte'
import { TabStrip } from '@nativescript/core/ui/tab-navigation-base/tab-strip'


describe('Tabs', function () {
    before(() => { initializeDom(); });
    let test_subject: TabsElement;
    let harness: TabsHarness;
    before(async function () {
        let el = createElement('fragment');
        harness = new TabsHarness({ target: el });
        test_subject = (harness as any).test_subject
        assert.isNotNull(test_subject)
    })

    it('it assigns child tabstrip to tabstrip property', function () {
        assert.isNotNull(test_subject.nativeView.tabStrip);
    })

    it('it assigns child tabcontentitems to items property', function () {
        assert.isNotNull(test_subject.nativeView.items);
        assert.equal(test_subject.nativeView.items.length, 1);

    })

    it('has the right content showing', function () {
        let content = (test_subject.nativeView.items[0]).content;
        assert.isNotNull(content);
        assert.equal((content as any).text, "tab content 1");
    });

    it('it assigns/removes revealed/hidden child tabcontentitems to items property', async function () {
        assert.equal(test_subject.nativeView.items.length, 1);
        harness.$set({ show_extra_tab: true });
        await tick();
        assert.equal(test_subject.nativeView.items.length, 2);
        harness.$set({ show_extra_tab: false });
        await tick();
        assert.equal(test_subject.nativeView.items.length, 1);
    })
});

describe('TabStrip', function () {
    let test_subject: NativeViewElementNode<TabStrip>;
    let harness: TabsHarness;
    before(async function () {
        let el = createElement('fragment');
        harness = new TabsHarness({ target: el });
        test_subject = (harness as any).tab_strip_subject;
        assert.isNotNull(test_subject)
    })

    it('it assigns child tabstripitems to items property', function () {
        assert.isNotNull(test_subject.nativeView.items);
        assert.equal(test_subject.nativeView.items.length, 1);
        assert.equal(test_subject.nativeView.items[0].title, "tab button 1");
    })

    it('it assigns/removes revealed/hidden child to items property', async function () {
        assert.equal(test_subject.nativeView.items.length, 1);
        assert.equal(test_subject.nativeView.items[0].title, "tab button 1");
        harness.$set({ show_extra_tab: true });
        await tick();
        assert.equal(test_subject.nativeView.items.length, 2);
        assert.equal(test_subject.nativeView.items[0].title, "tab button 1");
        assert.equal(test_subject.nativeView.items[1].title, "extra tab button");
        harness.$set({ show_extra_tab: false });
        await tick();
        assert.equal(test_subject.nativeView.items.length, 1);
        assert.equal(test_subject.nativeView.items[0].title, "tab button 1");
    })
})


