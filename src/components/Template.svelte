<template {...$$props} component="{template}" xmlns="tns" />
<AsComponent bind:component="{template}" let:props>
    <slot item="{(props ? props.item : null)}" />
</AsComponent>


<script>
    import AsComponent from "./AsComponent.svelte"
    let template;
</script>