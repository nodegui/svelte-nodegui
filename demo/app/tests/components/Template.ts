import { Template } from "svelte-native/components"
import { componentFromString } from '~/component-loader';
import { createElement, ViewNode } from "svelte-native/dom";

const assert: typeof chai.assert = (<any>global).chai.assert;


describe('Template', function () {
    it('can be create be instantiated', function () {
        let c = new Template({});
        assert.isNotNull(c)
    });

    describe('Template Instance', function () {
        let component_instance;
        let component_target: ViewNode;
        before(async function () {
            let svelteSrc = `
                <Template bind:this={test_subject} let:prop>
                    <label text="test text {prop ? prop : ''}" />
                </Template>
                <script>
                    import { Template } from 'svelte-native/components'
                    export let test_subject;
                </script>
            `;
            let HarnessComponent = await componentFromString(svelteSrc);
            let component_target_inner = createElement('fragment');
            component_target = component_target_inner;
            let harness = new HarnessComponent({ target: component_target, props: { prop: null } });
            component_instance = harness.test_subject
        })

        it('adds a template element to the dom', function () {
            assert.isNotEmpty(component_instance);
            assert.equal(component_target.firstChild.tagName, 'template')
        });

        it('the added template element has a component prop', function () {
            assert.isNotEmpty((component_target.firstChild as any).component)
        });
    });

})