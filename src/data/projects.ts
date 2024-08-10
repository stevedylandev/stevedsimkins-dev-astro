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
			"I was tired of poor code sharing experiences like Pastebin that were littered with ads, and I really loved the experience of Ray.so for images. This led to the creation of Snippets.so, an open sourced and extensible code sharing solution that’s minimal and clean.",
		image: "https://www.snippets.so/og.png",
		link: "https://snippets.so",
		tags: ["developer tools", "ipfs", "productivity"],
	},
	{
		title: "Pinata SDK",
		description:
			"The original Pinata SDK was written for Node.js years ago, and as the developer ecosystem evolved a more flexible SDK was necessary. This project was a full typescript rewrite from scratch that includes a whole new developer experience that intuitive, with far more methods and capabilities than before.",
		image:
			"https://docs.mypinata.cloud/ipfs/bafkreidv5iptnieh6eijei7enqc4mdhxpte3ries23heqf7s2hu3gdu6ru",
		link: "https://docs.pinata.cloud/ipfs-sdk",
		tags: ["developer tools", "ipfs"],
	},
	{
		title: "SIGNETS",
		description:
			"In a world where it becomes harder to distinguish between AI and human generated content, authenticity will become paramount. This app is an experiment in that direction. It allows users to upload and sign content using cryptographic keys already present in crypto wallets. With Privy as the auth layer, anyone can make an account, upload and sign content, then share it with another party. The recipient can use the public address of the sender to verify that the content is actually made by them.",
		image: "https://www.signets.cloud/og.png",
		link: "https://signets.cloud",
		tags: ["cryptography", "ipfs"],
	},
	{
		title: "Raycaster Extension",
		description:
			"The fastest way to send a cast on Farcaster. A Raycast extension that allows you to sign into your Farcaster account and send casts with optional images via IPFS. ",
		image:
			"https://dweb.mypinata.cloud/ipfs/QmSsY6QnhdwbWunrgzTDkpvRd7oWx5nUp8v7UiMeGRFeZ1",
		link: "https://www.raycast.com/stevedylandev/raycaster",
		tags: ["raycast", "developer tools", "productivity"],
	},
	{
		title: "Photocaster",
		description:
			"IPFS can unlock for decentralized social media, and Photocaster was built to demonstrate just that. Using the Farcaster protocol the app allows users to scroll through a feed of just images from select photo centered channels, sign in with their account, and upload photos via IPFS. What makes it special is the photo’s full resolution is on IPFS, but a resized copy is put on the Farcaster network. This keeps apps light, but allows anyone on Photocaster to see the full resolution image.",
		image: "https://www.photocaster.xyz/og.png",
		link: "https://photocaster.xyz",
		tags: ["farcaster", "ipfs"],
	},
	{
		title: "Cosmic Cowboys",
		description:
			"This was a hackathon project that I worked on with two coworkers during EthOnline 2023. The goal was to build a blockchain game that used AI NPCs with ERC-6551. I handled all the smart contract work and bits and pieces of the web app. Overall we had a pretty unique experience and glimpse into the future of gaming, and it was chosen as a finalist project.",
		image:
			"https://assets-global.website-files.com/659ed44e11fabf4e65eb47eb/65a5616eb13e9f94a0f04806_img-open-graph-homepage.png",
		link: "https://ethglobal.com/showcase/cosmic-cowboys-3q0co",
		tags: ["blockchain", "ai", "ipfs"],
	},
	{
		title: "Pinata-go-cli",
		description:
			"A Go rewrite of the Node.js CLI for Pinata, allows fast and extensive uploads to Pinata. Also includes helpful features for listing files and other API functionalities. ",
		image:
			"https://dweb.mypinata.cloud/ipfs/QmasHAZJ2kb9k3AqkQP4yzYbZn8zxFGsrygNv6HBdMn1uE",
		link: "https://github.com/PinataCloud/pinata-go-cli",
		tags: ["developer tools", "ipfs"],
	},
	{
		title: "Diet-cast",
		description:
			"A minimal channel specific lite client for Farcaster. Change a few lines in the config file and have a fully functional client with the ability to view the channel feed and cast to it. ",
		image: "https://www.dietcast.xyz/og.png",
		link: "https://www.dietcast.xyz",
		tags: ["farcaster", "ipfs"],
	},
];
