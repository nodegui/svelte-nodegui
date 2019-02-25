import { SvelteComponent, assign, create_slot, get_slot_context, init, noop, safe_not_equal } from "svelte/internal";
/* repl https://v3.svelte.technology/repl?version=3.0.0-alpha27&gist=623e9f32d2bcd103a45f26e1d9ce83ac */

/*
Generated from 
	<svelte:options bind:props={props}/>
	<slot props={props}/>
	<script> let props; </script> 
then 
   "let { $$slot_default, $$scope } = $$props;"
	 was removed and added to the AsComponent's "instance" function
*/

function createComponent($$slot_default, $$scope) {
    //const get_default_slot_changes = ({ props }) => ({ props: props });
    //const get_default_slot_context = ({ props }) => ({ props: props });

    const get_default_slot_context = ({ props }) => (assign({}, props));

    function create_fragment(ctx) {
        const default_slot_1 = ctx.$$slot_default;
        const default_slot = create_slot(default_slot_1, ctx, get_default_slot_context);
        const get_default_slot_changes = ({ props }) => {
            let changes = {};
            Object.keys(ctx.props).forEach(k => changes[k] = props)
            return changes;
        }

        return {
            c() {

                if (default_slot) default_slot.c();
            },

            l(nodes) {
                if (default_slot) default_slot.l(nodes);
            },

            m(target, anchor) {

                if (default_slot) {
                    default_slot.m(target, anchor);
                }
            },

            p(changed, ctx) {

                if (default_slot && (changed.$$scope || changed.props)) {
                    default_slot.p(assign(assign({}, get_default_slot_changes(changed)), ctx.$$scope.changed), get_slot_context(default_slot_1, ctx, get_default_slot_context));
                }
            },

            i: noop,
            o: noop,

            d(detach) {

                if (default_slot) default_slot.d(detach);
            }
        };
    }

    function instance($$self, $$props, $$invalidate) {
        let props = $$props;

        $$self.$set = $$props => {
            if (!props) props = {};
            assign(props, $$props);
            $$invalidate('props', props);
            if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
        };

        return { props, $$slot_default, $$scope };
    }

    return class extends SvelteComponent {
        constructor(options) {
            super();
            init(this, options, instance, create_fragment, safe_not_equal);
        }
    }
}

/*
Generated from 
		<script> export let component; </script> 
then modified
*/
function create_fragment(ctx) {
    return {
        c: noop,
        m: noop,
        p: noop,
        i: noop,
        o: noop,
        d: noop
    };
}

function instance($$self, $$props, $$invalidate) {
    let { $$slot_default, $$scope } = $$props;

    let component = createComponent($$slot_default, $$scope)

    return { component };
}

export class AsComponent extends SvelteComponent {
    constructor(options) {
        super();
        init(this, options, instance, create_fragment, safe_not_equal);
        console.log("returning component", this.$$.ctx.component)
    }

    get component() {

        return this.$$.ctx.component;
    }
}

