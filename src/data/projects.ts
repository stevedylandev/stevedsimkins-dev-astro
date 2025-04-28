export type ProjectItem = {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
};

export const projects: ProjectItem[] = [
  {
    title: "Orbiter",
    description: "In a world full of complicated CI/CD pipelines there's a desire for a simpler solution for hosting static websites. Orbiter is a service that does just that, letting people upload and create a static site in 30 seconds. It's currently being built by Steve along side Justin Hunter and feautes an open platform approach using IPFS and blockchain.",
    image: "https://orbiter.host/og.png",
    link: "https://orbiter.host",
    tags: ["ipfs", "blockchain", "developer tools"]
  },
  {
    title: "bhvr",
    description: "I stopped using Next.js and Vercel a while ago due to the amount of vendor lock-in the stack introduced. As an alternative I started using a combination of a Vite + React frontend with a Hono backend. I was setting up separate repos so many times I decided to turn it into a monorepo using Bun. bhvr is a simple barebones template that helps people setup their own project with the same stack, featuring a shared package folder for types that can be used in both server and client. More importantly, each piece can easily be pulled out from one hosting provider and used in another, making it portable and independent.",
    image: "https://bhvr.dev/og.png",
    link: "https://bhvr.dev",
    tags: ["developer tools", "web frameworks"]
  },
  {
    title: "IPCM",
    description: "IPCM (InterPlanetary CID Mapping) is a blockchain approach to solving the problem of dynamic IPFS data. Instead of using a slower solution like IPNS to point to new content, IPCM is a smart contract that is used as the source of truth for a piece of dynamic content. It features a simple state that can only be updated by the owner of the contract but read by anyone, as well as a public version history through Solidity events.",
    image: "https://dweb.mypinata.cloud/ipfs/bafkreigsap637s5qtmp2cqomi3tkjlz62pet35x3cfbjqzh7mmbioiooei",
    link: "https://ipcm.dev",
    tags: ["blockchain", "ipfs", "developer tools"]
  },
  {
    title: "GitCast",
    description: "A Farcaster Mini App that merges the GitHub event feed into the Farcaster social graph. Warpcast created an API that exposed the GitHub verifications made by all users and I thought it would be fun to see a feed GitHub events for all the people I follow that have the verification. Only problem was the number was in the 40K+ range which was too many to filter through. To solve this I built a fairly complex backend that indexes for each user that wants to see their feed and stores the users who have the verifications as well as their events. This was a great exercise in optimizing data pipelines and uses a mix of Cloudflare workers, KVs, D1 database, and queues.",
    image: "https://gitcast.dev/og.png",
    link: "https://gitcast.dev",
    tags: ["farcaster", "social"]
  },
  {
    title: "Mast",
    description:
      "A simple TUI used for sending casts on Farcaster written in Go. I wanted a project to try out the Bubbletea TUI framework from Charm.sh and this fit the bill perfectly. It's authorized using your own custody signers (can be created through castkeys.xyz) and allows the user to set their own Farcaster hub.",
    image:
      "https://cdn.stevedylan.dev/files/bafkreicb5ravot4fg6cvjmasp7l4n3c5x26lpejefx5mx6byubcq4oib4y",
    link: "https://github.com/stevedylandev/mast-cli",
    tags: ["farcaster", "developer tools"],
  },
  {
    title: "Cast Keys",
    description:
      "A tool and example for Farcaster developers that need to create signers for their account. Signers are ED25519 keypair that are signed by the primary wallet of a user, and they operate like API keys that can be revoked down the road. They are crucial to the Farcaster ecosystem as they allow users to 'sign-in' to other Farcaster apps and interact with the protocol. This small web app makes it easy to generate a signer for your account, but the code is also FOSS as an educational tool for new Farcaster devs.",
    image: "https://castkeys.xyz/og.png",
    link: "https://castkeys.xyz",
    tags: ["farcaster", "developer tools"],
  },
  {
    title: "Pi-Widget",
    description:
      "A small server written in Go that you can run on your Raspberry Pi to display vitals in real time. For my particular Pi it displays IPFS repo stats and system stats, with more updates on the way",
    image: "https://stevedylan.dev/pi.png",
    link: "https://pi.stevedylan.dev",
    tags: ["hardware", "ipfs", "raspberry pi"],
  },
  {
    title: "Radicalize",
    description:
      "A CLI written in Go that can help migrate existing local or remote git repos to Radicle.xyz",
    image:
      "https://dweb.mypinata.cloud/ipfs/QmUFwBiweWHtGBxftQ7xNpiS5xSBHJyZJgsHXXGRy2qyLH?img-format=webp",
    link: "https://github.com/stevedylandev/radicalize",
    tags: ["developer tools", "radicle", "git"],
  },
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
    link: "https://docs.pinata.cloud/pinata",
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
      "IPFS can unlock content for decentralized social media, and Photocaster was built to demonstrate just that. Using the Farcaster protocol the app allows users to scroll through a feed of just images from select photo centered channels, sign in with their account, and upload photos via IPFS. What makes it special is the photo’s full resolution is on IPFS, but a resized copy is put on the Farcaster network. This keeps apps light, but allows anyone on Photocaster to see the full resolution image.",
    image: "https://www.photocaster.xyz/og.png",
    link: "https://github.com/PinataCloud/PhotoCaster",
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
    title: "Pinata IPFS CLI",
    description:
      "A Go rewrite of the Node.js CLI for Pinata, allows fast and extensive uploads to Pinata. Also includes helpful features for listing files and other API functionalities. ",
    image:
      "https://dweb.mypinata.cloud/ipfs/QmNcdx9t48z7RQUXUZZHmuc4zBfyBxKLjDfEgmfhiop7j7?img-format=webp",
    link: "https://github.com/PinataCloud/ipfs-cli",
    tags: ["developer tools", "ipfs"],
  },
];
