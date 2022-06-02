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
	<img src="https://img.icons8.com/fluency/speedometer">
	</HeaderChip>
	<h2>Fast and fluent</h2>
	<p>
		Coded with XAML and in-line with the Fluent design system, FluentHub's UI is truly perfect.
	</p>
	<div class="buttons-spacer">
		<Button
			href="/docs/get"
			{...externalLink}
			variant="accent"
		>
			Try it
		</Button>
		<Button
			href="https://www.microsoft.com/design/fluent/"
			{...externalLink}
			variant="hyperlink"
		>
			Design System
		</Button>
		
	</div>
	<div class="design-image">
		<picture>
			<source
				media="(prefers-color-scheme: dark)"
				srcset="/screenshots/hero-dark.png"
			>
			<source
				media="(prefers-color-scheme: light)"
				srcset="/screenshots/hero-light.png"
			>
			<img
				alt="FluentHub screenshot"
				class="files-screenshot"
				height="384"
				src="/screenshots/hero-dark.png"
				style:transform="translateY({Math.floor(scrollY / -10)}px)"
				width="512"
			>
		</picture>
		<picture>
			<source
				media="(prefers-color-scheme: dark)"
				srcset="/screenshots/desktop-dark.png"
			>
			<source
				media="(prefers-color-scheme: light)"
				srcset="/screenshots/desktop-light.png"
			>
			<img
				alt="Desktop wallpaper"
				class="files-wallpaper"
				height="900"
				src="/screenshots/desktop-dark.png"
				width="1440"
			>
		</picture>
	</div>
</PageSection>

<style lang="scss">
	@use "DesignSection";
</style>
