export type DocsMap = {
	name: string;
	path?: string;
	type?: "page" | "category";
	pages?: DocsMap[];
};

export const docs: DocsMap[] = [
	{
		name: "Overview",
		path: ""
	},
	{
		type: "category",
		name: "Installation",
		pages: [
			{
				name: "Building from Source",
				path: "/get"
			}
		]
	},
	{
		type: "category",
		name: "Configuration",
		pages: [
			{
				name: "Overview",
				path: "/config"
			}
		]
	},
	{
		type: "category",
		name: "Contribution",
		pages: [
			{
				name: "Overview",
				path: "/contrib"
			},
			{
				name: "Code Style",
				path: "/contrib/style"
			},
			{
				name: "ULMDF",
				path: "/contrib/style/md"
			}
		]
	},
];
