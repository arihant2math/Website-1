<script lang="ts">
	import { getContributors } from "$data/community";
	import { dev } from "$app/env";
	import { links } from "$data/links";
	import { Contributor, HeaderChip, PageSection } from "$lib";
	import { Button, TextBlock } from "fluent-svelte";
	import Profile from "@fluentui/svg-icons/icons/person_32_filled.svg?raw";
	// Fetch contributors for the community section
	const contributorRows = [getContributors(1), getContributors(2), getContributors(3)]
</script>

<PageSection id="community-section">
	<div class="community-section-card">
		<div class="community-section-text">
			<HeaderChip>
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src="https://img.icons8.com/fluency/team">
			</HeaderChip>
			<h2>A thriving community</h2>
			<p>
				FluentHub is open-source and anyone can contribute to it. Made with C#, XAML and 💗, our app has no limits.
				Our community is what makes Fluenthub real - what point is there in an app that isn't influenced
				by it's users and community?
			</p>
			{#if dev}
			<TextBlock variant="caption">src/layout/OpenSection/OpenSection.svelte</TextBlock>
			<br/>
			{/if}
			<div class="buttons-spacer">
				<Button variant="hyperlink" href="https://discord.gg/{links.discord.server}">
					Join the discussion
				</Button>
				<Button variant="hyperlink" href="https://github.com/FluentHub/Fluenthub">
					Contribute to the project
				</Button>
			</div>
		</div>
		{#if contributorRows.every(it => it)}
		<div class="contributors-container">
			{#each contributorRows as contributorsPromise}
				<div class="contributors-row">
					{#await contributorsPromise then contributors}
						{#each contributors.sort(() => Math.random() - 0.5) as {
							html_url,
							avatar_url,
							login,
							contributions,
							type
						}}
							<Contributor
								{html_url}
								{avatar_url}
								{login}
								{contributions}
								{type}
							/>
						{/each}
					{:catch err}
						{#each Array(35) as _}
							<Contributor
								html_url="https://github.com/onein528"
								avatar_url="data:image/svg+xml;{encodeURIComponent(Profile)}"
								contributions={0}
							/>
						{/each}
					{/await}
				</div>
			{/each}
		</div>
	{/if}
		<div class="rainbow-background"></div>
	</div>
</PageSection>

<style lang="scss">@use "./OpenSection";
</style>
