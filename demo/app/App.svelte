<page class="page">
    <actionBar title="My App" icon="" class="action-bar">
    </actionBar>
    <stackLayout class="p-20">
        <label text="Tap the button" class="h1 text-center"/>
        <button text="TAP" on:tap="{ onTap }" class="btn btn-primary btn-active"/>
        <label text="{ message }" class="h2 text-center" textWrap="true"/>
    </stackLayout>
</page>

<script>
    let counter = 42;
    let message;
    $: message = (counter <= 0) 
                    ? "Hoorraaay! You unlocked the Svelte-Native clicker achievement!"
                    : `${counter} taps left`
    
    const onTap = () => counter--;
</script>