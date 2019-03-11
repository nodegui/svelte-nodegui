import * as chai from 'chai'
import { AsComponent } from "svelte-native/components"
import { tick } from 'svelte'
import { createElement, NativeElementNode } from 'svelte-native/dom'
import { componentFromString } from '~/component-loader';
const assert: typeof chai.assert = (<any>global).chai.assert;

describe('AsComponent', function () {

    it('can be create an empty component', function () {
        let c = new AsComponent({});
        assert.isNotNull(c.component)
    });

    describe('AsComponent.component', function () {
        let component_instance;

        before(async function () {
            let svelteSrc = `
                <AsComponent bind:this={test_subject} let:prop>
                <label text="test text {prop ? prop : ''}" />
                </AsComponent>
                <script>
                    import { AsComponent } from 'svelte-native/components'
                    export let test_subject;
                </script>
            `;
            let HarnessComponent = await componentFromString(svelteSrc);
            let el = createElement('fragment');
            let harness = new HarnessComponent({ target: el });
            component_instance = harness.test_subject
        })

        it('renders its children', async function () {
            let new_component = component_instance.component;
            assert.isFunction(new_component)

            let destEl = createElement('fragment');
            let component = new new_component({ target: destEl })
            assert.isNotEmpty(component);

            assert.equal(destEl.firstChild.tagName, 'label')
            assert.equal((destEl.firstChild as any).nativeView.text, 'test text ')
        })

        it('takes props', async function () {
            let new_component = component_instance.component;
            assert.isFunction(new_component)

            let destEl = createElement('fragment');
            let component = new new_component({ target: destEl, props: { prop: "prop" } });
            assert.isNotEmpty(component);

            assert.equal(destEl.firstChild.tagName, 'label');
            assert.match((destEl.firstChild as any).nativeView.text, /prop/);
        })

        it('instantiated twice', async function () {
            let new_component = component_instance.component;
            assert.isFunction(new_component)

            let destEl = createElement('fragment');
            let component1 = new new_component({ target: destEl, props: { prop: "prop1" } });
            let component2 = new new_component({ target: destEl, props: { prop: "prop2" } });
            assert.isNotEmpty(component1);
            assert.isNotEmpty(component2);
            assert.equal(destEl.firstChild.tagName, 'label');
            assert.match((destEl.firstChild as any).nativeView.text, /prop1/);
            assert.match((destEl.childNodes[1] as any).nativeView.text, /prop2/);
        })

        it('updating props only impacts a single instance', async function () {
            let new_component = component_instance.component;
            assert.isFunction(new_component)

            let destEl = createElement('fragment');
            let component1 = new new_component({ target: destEl, props: { prop: "prop1" } });
            let component2 = new new_component({ target: destEl, props: { prop: "prop2" } });
            assert.isNotEmpty(component1);
            assert.isNotEmpty(component2);
            assert.equal(destEl.firstChild.tagName, 'label');
            assert.match((destEl.firstChild as any).nativeView.text, /prop1/);
            assert.match((destEl.childNodes[1] as any).nativeView.text, /prop2/);

            component1.$set({ prop: 'new_prop' });
            await tick;

            assert.match((destEl.firstChild as any).nativeView.text, /new_prop/);
            assert.match((destEl.childNodes[1] as any).nativeView.text, /prop2/)
        })
    });
});