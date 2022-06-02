<script lang="ts">
	import { externalLink, PageSection } from "$lib";
	import { Button, IconButton } from "fluent-svelte";
	import { links } from "$data/links";
	import Discord from "$static/ui/icons/discord.svg?raw";
	import Github from "$static/ui/icons/github.svg?raw";
	import Twitter from "$static/ui/icons/twitter.svg?raw";
	import Sanctuary from "@fluentui/svg-icons/icons/building_24_filled.svg?raw";

	let innerWidth = 649; // Don't render the mobile layout before hydrationlet sidebarVisible = false;
	let sidebarVisible = false;
	let sidebar: HTMLElement;
	let sidebarButton: HTMLButtonElement;

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

<PageSection type="footer" id="page-footer">
	<div class="column">
		<a class="logo" href="/" sveltekit:prefetch>
			<picture>
				<source media="(prefers-color-scheme: dark)" srcset="/branding/logo.png">
				<source media="(prefers-color-scheme: light)" srcset="/branding/logo.png">
				<img alt="FluentHub logo" height="32" src="/branding/logo.png" width="32">
			</picture>
			FluentHub
		</a>
		<div class="social-links">
			<IconButton
				href="https://github.com/{links.github.owner}/"
				title="GitHub"
				aria-label="GitHub"
				{...externalLink}
			>
				{@html Github}
			</IconButton>
			<IconButton
				href="https://discord.gg/{links.discord.server}/"
				title="Discord Server"
				aria-label="Discord Server"
				{...externalLink}
			>
				{@html Discord}
			</IconButton>
			<IconButton
				href="https://discord.gg/{links.discord.sanctuary}/"
				title="Developer Sanctuary"
				aria-label="Developer Sanctuary"
				{...externalLink}
			>
				{@html Sanctuary}
			</IconButton>
		</div>
		<p></p>
		<a href="https://vercel.app/?utm-source=DeveloperWOW64&utm_campaign=oss" 
			{...externalLink}
		>
			<picture>
				<source media="(prefers-color-scheme: dark)" srcset="/branding/vercel-dark.svg">
				<source media="(prefers-color-scheme: light)" srcset="/branding/vercel-light.svg">
				<img alt= "Powered by Vercel" src="/branding/logo.png" width="192">
			</picture>
		</a>
	</div>
	{#if innerWidth < 648}
	<div></div>
	{:else}
	<div class="column">
		<br/>
		<br/>
		<br/>
		<picture>
			<source
				media="(prefers-color-scheme: dark)"
				srcset="https://github-readme-stats.vercel.app/api/pin/?username=FluentHub&repo=FluentHub&theme=dark&hide_border=true"
				
			>
			<source
				media="(prefers-color-scheme: light)"
				srcset="https://github-readme-stats.vercel.app/api/pin/?username=FluentHub&repo=FluentHub&theme=light&hide_border=true"
				
			>
			<img
				alt="GitHub Status"
				class="logo-image"
				src="https://github-readme-stats.vercel.app/api/pin/?username=FluentHub&repo=FluentHub&theme=dark&hide_border=true"
				width="424"
			>
		</picture>
	</div>
	<div class="column">
		<p>FluentHub Team</p>
		<Button variant="hyperlink" sveltekit:prefetch href="https://github.com/onein528">
			U+5BFA
		</Button>
		<Button variant="hyperlink" sveltekit:prefetch href="https://github.com/DeveloperWOW64">
			DeveloperWOW64
		</Button>
		<Button variant="hyperlink" sveltekit:prefetch href="https://github.com/BobbyESP">
			Gabriel Fontan
		</Button>
		<Button variant="hyperlink" sveltekit:prefetch href="https://github.com/luandersonn">
			Luandersonn Airton
		</Button>
	</div>
	<div class="column">
		<p>Pages</p>
		<Button variant="hyperlink" sveltekit:prefetch href="/">
			Home
		</Button>
		<Button variant="hyperlink" sveltekit:prefetch href="/docs">
			Documentation
		</Button>
		<Button variant="hyperlink" sveltekit:prefetch href="/blog">
			Blog
		</Button>
		<Button variant="hyperlink" sveltekit:prefetch href="/about">
			About
		</Button>
	</div>
	{/if}
</PageSection>

<style lang="scss">
	@use "./Footer";
</style>
