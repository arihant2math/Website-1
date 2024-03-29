<script lang="ts">
	import { dev } from "$app/env";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	import { Footer, Navbar } from "$layout";
	import { links, NavbarItem } from "$data/links";
	import { docs } from "$data/docs";

	import "fluent-svelte/theme.css";

	import Code from "@fluentui/svg-icons/icons/code_24_regular.svg?raw";
	import Home from "@fluentui/svg-icons/icons/home_24_regular.svg?raw";
	import Book from "@fluentui/svg-icons/icons/book_24_regular.svg?raw";
	import News from "@fluentui/svg-icons/icons/news_24_regular.svg?raw";
	import Person from "@fluentui/svg-icons/icons/person_24_regular.svg?raw";
	import Chat from "@fluentui/svg-icons/icons/chat_24_regular.svg?raw";
	import Icons from "@fluentui/svg-icons/icons/icons_24_regular.svg?raw";
	import Toolbox from "@fluentui/svg-icons/icons/toolbox_24_regular.svg?raw";
	import Info from "@fluentui/svg-icons/icons/book_information_24_regular.svg?raw";

	const { github, discord } = links;

	let navbarItems: NavbarItem[] = [
		{
			name: "Home",
			path: "/",
			icon: Home
		},
		{
			name: "Docs",
			path: "/docs",
			sidebarTree: docs,
			icon: Book
		},
		{
			name: "About",
			path: "/about",
			icon: Person
		}
	];

	let navbarButtons = [
		{
			label: "Discord",
			href: `https://discord.gg/${ discord.server }`,
			icon: Chat
		},
		{
			label: "GitHub",
			href: `https://github.com/${ github.owner }/${ github.repo }`,
			icon: Code
		}
	];

	
	if (dev) {
		navbarButtons.push({
			label: "Icons",
			href: "https://fluenticons.co",
			icon: Icons
		},
		{
			label: "Fluent-Svelte Docs",
			href: "https://fluent-svelte.vercel.app",
			icon: Toolbox
		}
		);
		navbarButtons = navbarButtons
		navbarItems.push(
		{
			name: "src/routes/__layout.svelte",
			path: "/",
			icon: Info
		}
		);
		navbarItems = navbarItems
	}

	let theme: "light" | "dark" = "light";

	onMount(() => {
		theme = window?.matchMedia("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";

		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
			theme = e.matches ? "dark" : "light";
		});
	});

</script>

<svelte:head>
	<meta content="FluentHub" name="og:site_name">

	<meta content="website" name="og:type">

	{#if dev}
	<link
		href="/branding/dev.png"
		rel="icon"
		type="image/svg+xml"
	>
	{:else}
	<link
		href="/branding/logo.png"
		rel="icon"
		type="image/svg+xml"
	>
	{/if}
	<meta
		content="FluentHub, FH, Developer, Fluent, Svelte, computer, code, Codrex, XAML, C#, Fluent-Svelte, Files, onein528, Fluent Design, stylish, winui, GitHub"
		name="keywords"
	>

	<meta content="#084840" name="theme-color">

</svelte:head>

<Navbar buttons={navbarButtons} items={navbarItems} />
<slot />
<Footer />

<style global lang="scss">
	@use "src/styles/global";
	@use "src/styles/markdown";
</style>
