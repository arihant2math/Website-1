import type { DocsMap } from "$data/docs";

export const links = {
	discord: {
		server: "PRfcdBCNRW",
		sanctuary: "714581497222398064/957368985647743036"
	},
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
