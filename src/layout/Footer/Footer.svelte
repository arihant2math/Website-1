<script lang="ts">
	import { externalLink, PageSection } from "$lib";
	import { dev } from "$app/env";
	import { Button, IconButton, TextBlock, Flyout } from "fluent-svelte";
	import { links } from "$data/links";
	import Discord from "$static/ui/icons/discord.svg?raw";
	import Github from "$static/ui/icons/github.svg?raw";
	import Toolbox from "@fluentui/svg-icons/icons/toolbox_24_filled.svg?raw";
	import Test from "@fluentui/svg-icons/icons/wrench_24_filled.svg?raw";
	import Sanctuary from "@fluentui/svg-icons/icons/building_24_filled.svg?raw";
	import Info from "@fluentui/svg-icons/icons/info_24_filled.svg?raw";

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
			{#if dev}
			<picture>
				<img alt="FluentHub logo" height="32" src="/branding/dev.png" width="32">
			</picture>
			Developer
			{:else}
			<picture>
				<img alt="FluentHub logo" height="32" src="/branding/logo.png" width="32">
			</picture>
			FluentHub
			{/if}
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
			{#if dev}
			<IconButton
				href="https://fluent-svelte.vercel.app/docs"
				title="Fluent-Svelte Docs"
				aria-label="Fluent-Svelte Docs"
				{...externalLink}
			>
				{@html Toolbox}
			</IconButton>
			<IconButton
				href="https://fluent-svelte.vercel.app/test"
				title="Fluent-Svelte REPL"
				aria-label="Fluent-Svelte REPL"
				{...externalLink}
			>
				{@html Test}
			</IconButton>
			<Flyout>
				<IconButton
					title="src/routes/__layout.svelte"
					aria-label="src/routes/__layout.svelte"
				>
					{@html Info}
				</IconButton>
				<svelte:fragment slot="flyout">src/routes/__layout.svelte</svelte:fragment>
			</Flyout>
			{/if}
		</div>
		<br/>
		<a href="https://vercel.app/?utm-source=DeveloperWOW64&utm_campaign=oss" 
			{...externalLink}
		>
			<picture>
				<source media="(prefers-color-scheme: dark)" srcset="/branding/vercel-dark.svg">
				<source media="(prefers-color-scheme: light)" srcset="/branding/vercel-light.svg">
				<img alt= "Powered by Vercel" src="/branding/logo.png" width="192">
			</picture>
		</a>
		{#if dev}
		<p>You are using FluentHub in Dev mode.</p>
		<br/>
		<TextBlock variant="caption">src/layout/Footer/Footer.svelte</TextBlock>
		{/if}
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
