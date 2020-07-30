import { createElement, NativeElementNode, NativeViewElementNode, initializeDom } from 'svelte-native/dom'
import NativeElementHarness from './NativeElementHarness.svelte'
import MountParent from './MountParent.svelte'
import MountChild from './MountChild.svelte'
import { LayoutBase } from '@nativescript/core/ui/layouts/layout-base'
import { Label } from '@nativescript/core/ui/label'
import { StackLayout } from '@nativescript/core/ui/layouts/stack-layout'

describe('NativeElementNode', function () {
    
    before(() => { initializeDom(); });

    let test_subject: NativeViewElementNode<Label>;
    before(async function () {
        let el = createElement('fragment');
        let harness = new NativeElementHarness({ target: el  as any});
        test_subject = (harness as any).test_subject
        assert.isNotNull(test_subject)
    })

    it('sets known properties onto its nativeView', function () {
        assert.equal(test_subject.nativeElement.textWrap, true);
    })

    it('sets text node children as text property of nativeView', function () {
        assert.equal(test_subject.nativeElement.text, 'Text Content');
    })

    it('sets class property on nativeView', function () {
        assert.isTrue(test_subject.nativeElement.cssClasses.has("testlabel"));
    })

    it('supports class directive', function () {
        assert.isTrue(test_subject.nativeElement.cssClasses.has('boolclass'));
        assert.isFalse(test_subject.nativeElement.cssClasses.has('boolclassf'))
    })


    it('sets style properties on native view', function () {
        assert.equal(test_subject.nativeElement.style.color.name, 'red');
        assert.equal(test_subject.nativeElement.color.name, 'red');
    })
});

describe('NativeElementNode mounting', function () {
    let mount_parent: { $destroy: any, stack: NativeViewElementNode<StackLayout>, first: NativeViewElementNode<Label>, last: NativeViewElementNode<Label> } = null;
    beforeEach(async function () {
        let el = createElement('fragment');
        let harness = new MountParent({ target: el as any });
        mount_parent = (harness as any);
    })

    afterEach(function () {
        mount_parent.$destroy();
    });

    function assertChildrenMatch(parent: LayoutBase, expected: Label[]) {
        assert.equal(parent.getChildrenCount(), expected.length, "Counts were different");
        for (var i = 0; i < parent.getChildrenCount(); i++) {
            assert.equal(parent.getChildAt(i), expected[i], `Expected ${expected[i].text} at ${i} but got ${(parent.getChildAt(i) as Label).text}`);
        }
    }

    it('can mount child element at the end', function () {
        let mount_child: { $destroy: any, childA: NativeViewElementNode<Label>, childB: NativeViewElementNode<Label> } = new MountChild({ target: mount_parent.stack as any }) as any;
        try {
            assertChildrenMatch(mount_parent.stack.nativeView, [
                mount_parent.first.nativeView,
                mount_parent.last.nativeView,
                mount_child.childA.nativeView,
                mount_child.childB.nativeView
            ])
        } finally {
            mount_child.$destroy()
        }

    })

    it('can mount child element before an anchor', function () {
        let mount_child: { $destroy: any, childA: NativeViewElementNode<Label>, childB: NativeViewElementNode<Label> } = new MountChild({ target: mount_parent.stack as any, anchor: mount_parent.last as any }) as any;
        try {
            assertChildrenMatch(mount_parent.stack.nativeView, [
                mount_parent.first.nativeView,
                mount_child.childA.nativeView,
                mount_child.childB.nativeView,
                mount_parent.last.nativeView,
            ])
        } finally {
            mount_child.$destroy()
        }

    })

    it('can mount child element at the start', function () {
        let mount_child: { $destroy: any, childA: NativeViewElementNode<Label>, childB: NativeViewElementNode<Label> } = new MountChild({ target: mount_parent.stack as any, anchor: mount_parent.first as any }) as any;
        try {
            assertChildrenMatch(mount_parent.stack.nativeView, [
                mount_child.childA.nativeView,
                mount_child.childB.nativeView,
                mount_parent.first.nativeView,
                mount_parent.last.nativeView,
            ])
        } finally {
            mount_child.$destroy()
        }

    })

})
