<script>
    import SlotComponent from './SlotComponent.svelte'

    //copy our slot content and scope
    let slots = $$props.$$slots;
    let scope = $$props.$$scope;

    export const component = class extends SlotComponent {
        constructor(options) {
            //force instances of this component to use our slot content and scope.
            let new_options = Object.assign({}, options);
            new_options.props = Object.assign({}, options.props, { $$slots: slots, $$scope: scope });
            super(new_options)
        }
    }
</script>