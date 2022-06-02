export type DocsMap = {
	name: string;
	path?: string;
	type?: "page" | "category" | "secret";
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
		name: "Contribution",
		pages: [
			{
				name: "Overview",
				path: "/contrib"
			},
			{
				type: "category",
				name: "Style",
				pages: [
					{
						name: "Code",
						path: "/contrib/style"
					},
					{
						name: "Markdown",
						path: "/contrib/style/md"
					}
				]
			},
			{
				name: "Translating",
				path: "/contrib/locale"
			}
		]
	},
];
