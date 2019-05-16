import { Template } from "svelte-native/components"
import TemplateHarness from './TemplateHarness.svelte'
import { createElement, NativeElementNode } from "svelte-native/dom";

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
            component_target = createElement('fragment');
            harness = new TemplateHarness({ target: component_target });
            component_instance = harness.test_subject;
        });

        it('adds a template element to the dom', function () {
            assert.isNotNull(component_instance);
            assert.equal(component_target.firstChild.tagName, 'template')
        });

        it('the added template element has a component prop', function () {
            assert.isFunction((component_target.firstChild as any).component)
        });

        describe('the component prop output', function () {
            let component;
            let mount_point;
            let inst;
            before(async function () {
                component = (component_target.firstChild as any).component
                mount_point = createElement('fragment');
                inst = new component({
                    target: mount_point,
                    props: { item: "prop_value" }
                })
            })

            it('outputs a the child elements', function () {
                let el = mount_point.firstElement();
                assert.equal(el.tagName, 'label')
            });

            it('uses the provided props', function () {
                let el = mount_point.firstElement() as NativeElementNode;
                assert.equal(el.getAttribute('text'), 'test text prop_value')
            });

            it('can be instantiated twice with its own props', function () {
                let mount_point2 = createElement('fragment');
                let inst2 = new component({
                    target: mount_point2,
                    props: { item: "prop_value2" }
                })

                let el1 = mount_point.firstElement() as NativeElementNode;
                let el2 = mount_point2.firstElement() as NativeElementNode;
                assert.equal(el1.getAttribute('text'), 'test text prop_value')
                assert.equal(el2.getAttribute('text'), 'test text prop_value2')
            })
        });



        it('passes down its props to the template element', function () {
            assert.equal((component_target.firstChild as any).getAttribute('extra-prop'), 'test extra prop')
        });

        after(function () {
            harness.$destroy();
        })
    });

})