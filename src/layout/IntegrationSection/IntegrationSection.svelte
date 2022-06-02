<script lang="ts">
	import { links } from "$data/links";
	import { externalLink, HeaderChip, PageSection } from "$lib";
	import { Button, Flyout } from "fluent-svelte";

	let innerWidth = 649; // Don't render the mobile layout before hydrationlet sidebarVisible = false;
	let sidebarVisible = false;
	let sidebar: HTMLElement;
	let sidebarButton: HTMLButtonElement;

	let scrollY: number;

	const toggleSidebar = () => {
		sidebarVisible = !sidebarVisible;
	};

	const handleOuterClick = (e: MouseEvent) => {
		if (!(
			!sidebarVisible ||
			e.target === sidebarButton ||
			sidebarButton.contains(e.target as Node) ||
			e.target === sidebar ||
			sidebar.contains(e.target as Node)
		)) {
			toggleSidebar();
		}
	}
</script>

<svelte:window bind:innerWidth on:click={handleOuterClick} />

<PageSection id="design-section">
	<HeaderChip>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img src="https://img.icons8.com/fluency/link">
	</HeaderChip>
	<h2>Integration without the fuss</h2>
	<p>
		FluentHub integrates GitHub's features without fuss. No faff, no unnecessary scripting.
	</p>
	{#if innerWidth < 648}
	<div></div>
	{:else}
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
	{/if}
</PageSection>

<style lang="scss">
	@use "IntegrationSection";
</style>
