<page>
		<Header title="Tabs" />

		<tabs tabsPosition="bottom">
				<tabStrip>
						<tabStripItem title="To Do" />
						<tabStripItem title="Completed" />
				</tabStrip>

				<tabContentItem>
						<label textWrap="true">This tab will list active tasks and will let users add new tasks.</label>
				</tabContentItem>
				<tabContentItem>
						<label textWrap="true">This tab will list completed tasks for tracking.</label>
				</tabContentItem>
		</tabs>
</page>

<script>
    import Header from '../Header.svelte'
</script>