<svelte:options bind:props={props} />
<template {...props} component="{template}" xmlns="tns" />
<AsComponent bind:component="{template}" let:item>
    <slot item="{item}" />
</AsComponent>

<script>
    import { AsComponent } from "./AsComponent"
    let template;
    let props;
</script>