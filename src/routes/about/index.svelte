<script context="module" lang="ts">
</script>

<script lang="ts">
	import { dev } from "$app/env";
	import { PageSection, Metadata } from "$lib";
	import { TextBlock } from "fluent-svelte"

	let scrollY: number;
</script>

<svelte:head>
	<Metadata title="FluentHub | About" image="about" />
</svelte:head>

<svelte:window on:scroll={() => window.requestAnimationFrame(() => scrollY = window.scrollY )} />

<PageSection id="blog">
	<div class="blog-backdrop">
		<img
			alt="Visual Studio Code"
			src="/screenshots/code-dark.png"
			style:transform="translateY({Math.floor(scrollY / 2.5)}px)"
			width="0"
		>
	</div>
	<div class="main-post">
		<picture>
			<img
				alt="FluentHub screenshot"
				height="768"
				src="https://github.com/onein528.png"
				width="1024"
			>
		</picture>
		<div class="about">
			<h3>What is FluentHub?</h3>
			<p>
				FluentHub is an amazing project founded by the current lead developer, <a href="https://github.com/onein528">Tomoyuki Terashita</a>, who is Japanese.
				He decided to view the source-code of the <a href="https://github.com/files-community/files">Files</a> project and get inspiration from it, as well
				as simply learning to code C#, rather than studying. The problem FluentHub solved was the fact that there was no GitHub client with Microsoft Fluent
				Design significantly publicised. Another reason he created FluentHub was because it was a good goal for his education to create a usable GitHub client
				that was both fast and fluent.
				From then on, FluentHub has grown spectacularly, with over one hundred stars on GitHub.
			</p>
			<p>
				FluentHub largely respects the <a href="https://github.com/files-community">Files Community</a> and part of it is based on it.
			</p>
		</div>
		{#if dev}
		<TextBlock variant="caption">src/layout/HeroSection/HeroSection.svelte</TextBlock>
		{/if}
		<br/>
	</div>	
</PageSection>

<style lang="scss">
	@use "../src/styles/pages/blog";
</style>