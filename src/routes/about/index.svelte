<script context="module" lang="ts">
</script>

<script lang="ts">
	import { PageSection, Metadata } from "$lib";


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
		<div class="about">
			<h3>What is FluentHub?</h3>
			<p>
				FluentHub is an amazing project founded by <a href="https://github.com/onein528">@onein528</a>, a Japanese developer.
				FluentHub largely respects the <a href="https://github.com/files-community">Files Community</a> and part of it is based on it.
			</p>
		</div>
	</div>	
</PageSection>

<style lang="scss">
	@use "../src/styles/pages/blog";
</style>