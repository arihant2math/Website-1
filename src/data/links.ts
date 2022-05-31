import type { DocsMap } from "$data/docs";

export const links = {
	discord: "PRfcdBCNRW",
	github: {
		owner: "FluentHub",
		repo: "FluentHub"
	}
};

export type NavbarItem = {
	name: string;
	path: string;
	external?: boolean;
	icon: any;
	type?: string;
	sidebarTree?: DocsMap[];
};
