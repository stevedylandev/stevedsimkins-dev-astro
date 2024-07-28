export type ProjectItem = {
	title: string;
	description: string;
	image: string;
	link: string;
	tags: string[];
};

export const projects: ProjectItem[] = [
	{
		title: "Snippets",
		description:
			"I wanted something clean and simple to share code with people, and things like pastebin were too bloated. So I made my own!",
		image: "https://www.snippets.so/og.png",
		link: "https://snippets.so",
		tags: ["developer-tools", "ipfs"],
	},
];
