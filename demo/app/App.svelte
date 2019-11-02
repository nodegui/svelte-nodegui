<radSideDrawer bind:this={drawer}>
    <radSideDrawer.drawerContent>
        <gridLayout rows="auto, *" >
            <label row="0" padding="10" class="h2" horizontalAlignment="left">Examples</label>
            <label row="0" class="fas h2" text="&#xf00d;" padding="10" horizontalAlignment="right" on:tap={() => drawer.closeDrawer()} />
            <scrollView row="1" >
                <stackLayout>
                    <label text="ListView" class:current={$current_page == ListViewPage} padding="10" on:tap="{() => gotoPage(ListViewPage)}" />
                     <label text="Tabs" class:current={$current_page == TabsPage} padding="10" on:tap="{() => gotoPage(TabsPage)}" />
                </stackLayout>
            </scrollView>
        </gridLayout>
    </radSideDrawer.drawerContent>
    <radSideDrawer.mainContent>
        <frame id="navframe" defaultPage={ListViewPage}></frame>
    </radSideDrawer.mainContent>
</radSideDrawer>

<script>
    import { onMount } from 'svelte'
    import * as nav from './Nav'
    import ListViewPage from './pages/ListViewPage.svelte'
    import TabsPage from './pages/TabsPage.svelte'

    function gotoPage(page) {
        drawer.closeDrawer();
        nav.goto(page);
    }
    
    let drawer;
    let current_page = nav.current_page

    onMount(() => {
        nav.init("navframe", drawer, ListViewPage)
    })
</script>

<style>
    .current {
        font-weight: bold;
    }
</style>
