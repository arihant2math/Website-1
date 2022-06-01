<script lang="ts">
	import { links } from "$data/links";
	import { externalLink, HeaderChip, PageSection } from "$lib";
	import { Button, Flyout } from "fluent-svelte";

	let scrollY: number;
</script>

<svelte:window on:scroll={() => window.requestAnimationFrame(() => scrollY = window.scrollY )} />

<PageSection id="design-section">
	<HeaderChip>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img src="https://img.icons8.com/fluency/link">
	</HeaderChip>
	<h2>Integration without the fuss</h2>
	<p>
		FluentHub integrates GitHub's features without fuss. All you need to do is <a href="https://github.com/{links.github.owner}/{links.github.repo}/blob/main/docs/build-from-source.md">authenticate</a> and FluentHub will do the rest.
	</p>
	<div class="design-image">
		<img
			alt="FluentHub word-map"
			class="files-wallpaper"
			height="-1024"
			src="/branding/map.png"
			style:transform="translateY({Math.floor(scrollY / -15)}px)"
			width="-1024"
			>
	</div>
</PageSection>

<style lang="scss">
	@use "IntegrationSection";
</style>
