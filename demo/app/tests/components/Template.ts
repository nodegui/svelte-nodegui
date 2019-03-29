import { Template } from "svelte-native/components"
import { componentFromString } from '~/component-loader';
import { createElement, ViewNode } from "svelte-native/dom";

const assert: typeof chai.assert = (<any>global).chai.assert;

describe('Template', function () {

    it('can be instantiated', function () {
        let dummy = createElement('fragment');
        let c = new Template({ target: dummy });
        assert.isNotNull(c)
    });

    describe('Template Instance', function () {
        let component_target;
        let component_instance;
        let harness;
        before(async function () {
            let svelteSrc = `
                <Template bind:this={test_subject} extra-prop="test extra prop"  let:prop>
                    <label text="test text {prop ? prop : ''}" />
                </Template>
                <script>
                    import { Template } from 'svelte-native/components'
                    export let test_subject;
                </script>
            `;
            let HarnessComponent = await componentFromString(svelteSrc);
            component_target = createElement('fragment');
            harness = new HarnessComponent({ target: component_target });
            component_instance = harness.test_subject;
        });

        it('adds a template element to the dom', async function () {
            assert.isNotNull(component_instance);
            assert.equal(component_target.firstChild.tagName, 'template')
        });

        it('the added template element has a component prop', async function () {
            assert.isFunction((component_target.firstChild as any).component)
        });

        it('passes down its props to the template element', async function () {
            assert.equal((component_target.firstChild as any).getAttribute('extra-prop'), 'test extra prop')
        });

        after(function () {
            harness.$destroy();
        })
    });

})