# 🕸️ FluentHub Website

###### The starting page for everything related to FluentHub — documentation and news included!

[![Alt text](https://img.shields.io/github/license/files-community/website?labelColor=17141f&color=6441a4&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjk2ODQgMi4zMjQ2NUMxMS41ODMgMS44NzYxNiAxMi40MTcgMS44NzYxNiAxMy4wMzE2IDIuMzI0NjVMMjAuNDUzNCA3Ljc0MDZDMjEuNDI5OSA4LjQ1MzE1IDIwLjkyNjggOS45OTgzNSAxOS43MTg5IDEwLjAwMDNINC4yODEwOEMzLjA3MzE4IDkuOTk4MzUgMi41NzAxMSA4LjQ1MzE1IDMuNTQ2NTcgNy43NDA2TDEwLjk2ODQgMi4zMjQ2NVpNMTMgNi4yNTAzNEMxMyA1LjY5ODA1IDEyLjU1MjMgNS4yNTAzNCAxMiA1LjI1MDM0QzExLjQ0NzcgNS4yNTAzNCAxMSA1LjY5ODA1IDExIDYuMjUwMzRDMTEgNi44MDI2MiAxMS40NDc3IDcuMjUwMzQgMTIgNy4yNTAzNEMxMi41NTIzIDcuMjUwMzQgMTMgNi44MDI2MiAxMyA2LjI1MDM0WiIgZmlsbD0iIzY0NDFhNCIvPgo8cGF0aCBkPSJNMTEuMjUgMTYuMDAwM0g5LjI1VjExLjAwMDNIMTEuMjVWMTYuMDAwM1oiIGZpbGw9IiM2NDQxYTQiLz4KPHBhdGggZD0iTTE0Ljc1IDE2LjAwMDNIMTIuNzVWMTEuMDAwM0gxNC43NVYxNi4wMDAzWiIgZmlsbD0iIzY0NDFhNCIvPgo8cGF0aCBkPSJNMTguNSAxNi4wMDAzSDE2LjI1VjExLjAwMDNIMTguNVYxNi4wMDAzWiIgZmlsbD0iIzY0NDFhNCIvPgo8cGF0aCBkPSJNMTguNzUgMTcuMDAwM0g1LjI1QzQuMDA3MzYgMTcuMDAwMyAzIDE4LjAwNzcgMyAxOS4yNTAzVjE5Ljc1MDNDMyAyMC4xNjQ1IDMuMzM1NzkgMjAuNTAwMyAzLjc1IDIwLjUwMDNIMjAuMjVDMjAuNjY0MiAyMC41MDAzIDIxIDIwLjE2NDUgMjEgMTkuNzUwM1YxOS4yNTAzQzIxIDE4LjAwNzcgMTkuOTkyNiAxNy4wMDAzIDE4Ljc1IDE3LjAwMDNaIiBmaWxsPSIjNjQ0MWE0Ii8+CjxwYXRoIGQ9Ik03Ljc1IDE2LjAwMDNINS41VjExLjAwMDNINy43NVYxNi4wMDAzWiIgZmlsbD0iIzY0NDFhNCIvPgo8L3N2Zz4KCQ==
)](https://github.com/DeveloperWOW64/FHWebsite/blob/main/static/LICENSE)

[Powered by Vercel ▲](https://vercel.com/?utm_source=FluentHub)

---

### Overview

This repository contains the source code for FluentHub's stylish website. The site is derived from [Codrex](https://codrex.dev) which in turn is derived from [Files.community](https://files.community) and is written using [Svelte](https://svelte.dev) or more specifically [Fluent-Svelte](https://fluent-svelte.vercel.app), [TypeScript](https://typescriptlang.org/) and [SCSS](https://sass-lang.com), and deployed with Vercel.

### Codebase Structure

```
.
├──static                 // Contains static assets including branding, images, fonts, etc...
|  ├──branding            // Branding media (logos, banners, etc...)
|  ├──fonts               // Static font files loaded by the website.
|  ├──preview-samples     // Sample files used in the preview pane in the features section.
|  ├──screenshots         // Screenshots and renders of the app used in the website.
|  └──ui                  // Images other than branding used in the website's user interface.
└──src                    // The website's source code.
   ├──lib                 // Re-usable Svelte components used within the website.
   ├──layout              // Components responsible for defining page layout, such as headers, footers, page sections, etc...
   ├──routes              // SvelteKit's filesystem-based routes. Anything in the folder is registered as a URL on build time.
   |  ├──docs             // Documentation and associated files.
   |  └──blog             // Blog page and associated files.
   |     └──posts         // Folder containing blog posts in MDSveX format (*.svx).
   ├──data                // Data storage used across various components and routes. NOT stores, just exported variables.
   └──styles              // SCSS styles that are NOT tied to components in /lib.
```

---

### Development

## Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) with `npm`.
- [`pnpm`](https://pnpm.io)
- Command line of your choice.

## Building

##### 1: Clone the repository.

```
git clone https://github.com/DeveloperWOW64/FHWebsite && cd Website
```

This will create a local copy of this repository and navigate you to the root folder of the repository.

##### 2: Install Dependencies

Run this command at the root folder to install dependencies:

```ps
pnpm i
```

##### 3: Run Build Script

To build the site in development mode, simply run the following command:

```ps
pnpm run dev
```

### Additional Scripts

##### Linting

This project uses [prettier](https://prettier.io) and [eslint](https://eslint.org/). Run this command to lint your changes:

```ps
pnpm run lint
```

##### Compiling & Distribution

We currently use [SvelteKit's vercel adapter](https://www.npmjs.com/package/@sveltejs/adapter-vercel) module, which allows us to deploy to vercel. To simply build a production bundle, use the following script:

```ps
pnpm run build
```

> Alternatively, to preview your changes in a production-like build, use `pnpm run preview`.

### Contributing to Documentation

Our documentation system uses [mdsvex](https://mdsvex.pngwn.io/), a superset of markdown designed to work with [Svelte](htts://svelte.dev).

### Editing Existing Pages

Documentation files are located at [`src/routes/docs`](https://github.com/DeveloperWOW64/FHWebsite/tree/main/src/routes/docs). SvelteKit uses a filesystem-based router, meaning that the layout of pages in the filesystem will reflect the URL path they are compiled to. To edit an existing page, find the corresponding `*.md` file in the [`docs`](<(https://github.com/DeveloperWOW64/FHWebsite/tree/main/src/routes/docs)>) directory, and edit it like a normal markdown file.

### Adding or Deleting a Page

Modifying the location or adding/deleting pages is slightly more complex. The sidebar used to naviagate documentation is not automatically generated. As such, a mapping of all pages rendered in the sidebar must be kept. If you plan to add, delete, or modify a page's position in the filesystem, this mapping _must_ be updated, or the associated page will either be missing from the sidebar or lead to a 404. The mapping is located at [`/src/data/docs.ts`](https://github.com/DeveloperWOW64/FHWebsite/tree/main/src/data/docs.ts) as a JSON-like format.

This is an example docs mapping:

#### src/routes/docs/

```
.
├──page-1.svx
├──page-2.svx
└──category
    ├──category-page-1.svx
    └──category-page-2.svx
```

#### src/data/docs.ts

```ts
[
	{
		name: "Page 1",
		path: "/page-1"
	},
	{
		name: "Page 2",
		path: "/page-2"
	},
	{
		type: "category",
		name: "Nested Category",
		pages: [
			{
				name: "Category Page 1",
				path: "/category/category-page-1"
			},
			{
				name: "Category Page 2",
				path: "/category/category-page-2"
			}
		]
	}
];
```

### Using the Blog

Similarly to docs pages, the blog also uses markdown. Blog posts are located at [`src/routes/blog/posts`](https://github.com/DeveloperWOW64/Website/tree/main/src/blog/posts) in `*.md` files. Unlike the docs, a mapping of blog posts doesn't need to be kept.

#### Publishing a Post

To publish a post, create a new `md` file in the [`posts`](https://github.com/DeveloperWOW64/FHWebsite/tree/main/src/blog/posts) folder. At the top of a the file, you'll need to include a few required things before typing the post.

```yml
---
title: Title of the Post
author: gh-username-author
description: Description of the post.
thumbnail: https://path-to-thumbnail-image.png
date: 2021-09-06
---
```

This metadata table is required for all posts, and gives the website some basic information about the post to work with. Below the table, you're free to use whatever markdown or components you want.

#### Removing or Editing a Post

Since we don't need any mapping to be updated, posts can simply be deleted from the folder or edited without any hassle or extra steps.

### Contributors

Want to contribute to this project? Feel free to open an [issue](/issues) or [pull request](/pulls).

<a href="https://github.com/FluentHub/Website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=FluentHub/Website" />
</a>
