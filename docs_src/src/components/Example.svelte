<script>
	import { Section } from '@sveltejs/site-kit';
	import IntersectionObserver from './IntersectionObserver.svelte';
	export let imageUrl;
</script>

<style>
	.example {
		width: 100%;
	}

	.example > :global(p) {
		margin: 4.4rem 2.4rem 2.4rem 0;
	}

    img {
        height: 420px;
    }

	.image-container {
		width: 100%;
		height: 420px;
		border-radius: var(--border-r);
		overflow: hidden;
        text-align: center;
	}

	@media (min-width: 920px) {
		.example {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 0.5em;
			align-items: start;
		}
	}
</style>

<Section>
	<div class="example">
        <div>
		<slot></slot>
        </div>

		<div class="image-container">
			<IntersectionObserver once let:intersecting top={400}>
				{#if intersecting}
					<img src="{imageUrl}" alt="example screenshot" />
				{/if}
			</IntersectionObserver>
		</div>
	</div>
</Section>