<script lang="ts">
	import { dev } from "$app/env";
	import { externalLink, PageSection } from "$lib";
	import { Button, TextBlock } from "fluent-svelte";
	import { links } from "$data/links";
	import Code from "@fluentui/svg-icons/icons/code_24_regular.svg?raw";
	import Download from "@fluentui/svg-icons/icons/arrow_download_24_regular.svg?raw";

</script>

<PageSection id="hero-section">
	<div class="hero-left">
		<h1>FluentHub</h1>
		<p>A stylish yet wonderfully powerful GitHub Oauth client</p>
		{#if dev}
			<TextBlock variant="caption">src/layout/HeroSection/HeroSection.svelte</TextBlock>
			<br/>
		{/if}
		<div class="buttons-spacer">
			<Button
				variant="accent"
				href="/docs/get"
				{...externalLink}
			>
				{@html Download}
				<div class="hero-button-inner">
					<h5>Install</h5>
					<span>Build FluentHub from source</span>
				</div>
			</Button>
			<Button
				href="https://github.com/{links.github.owner}/"
				{...externalLink}
			>
				{@html Code}
				<div class="hero-button-inner">
					<h5>View GitHub</h5>
					<span>FluentHub is free and open-source!</span>
				</div>
			</Button>
		</div>
	</div>
	<div class="hero-right">
		<div class="hero-image-container">
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
					height="768"
					src="/screenshots/hero-dark.png"
					width="1024"
				>
			</picture>
		</div>
	</div>
</PageSection>
<style lang="scss">
	@use "HeroSection";
</style>
