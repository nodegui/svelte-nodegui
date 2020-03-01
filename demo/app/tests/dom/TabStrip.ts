import { NativeViewElementNode, createElement, initializeDom } from "svelte-native/dom";
import { TabStrip } from "@nativescript/core/ui/tab-navigation-base/tab-strip/tab-strip";
import { tick } from "svelte";
import TabsHarness from './TabsHarness.svelte'

describe('TabStrip', function () {
    let test_subject: NativeViewElementNode<TabStrip>;
    let harness: TabsHarness;
    before(async function () {
        initializeDom();
        let el = createElement('fragment');
        harness = new TabsHarness({ target: el });
        test_subject = (harness as any).tab_strip_subject;
        assert.isDefined(test_subject);
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
