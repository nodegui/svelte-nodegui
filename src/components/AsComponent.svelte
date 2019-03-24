<script>
    import SlotComponent from './SlotComponent.svelte'

    //copy our slot content and scope
    let slot_default = $$props.$$slot_default;
    let scope = $$props.$$scope;

    export let component = class extends SlotComponent {
        constructor(options) {
            //force instances of this component to use our slot content and scope.
            let new_options = Object.assign({}, options);
            new_options.props = Object.assign({}, options.props, { $$slot_default: slot_default, $$scope: scope });
            super(new_options)
        }
    }
</script>