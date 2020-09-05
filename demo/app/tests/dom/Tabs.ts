import { createElement, TabsElement } from 'svelte-native/dom'
import { tick } from 'svelte';
import TabsHarness from './TabsHarness.svelte'


describe('Tabs', function () {
    let test_subject: TabsElement;
    let harness: TabsHarness;
    before(async function () {
        let el = createElement('fragment');
        harness = new TabsHarness({ target: el as any });
        test_subject = (harness as any).test_subject
        assert.isDefined(test_subject);
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



