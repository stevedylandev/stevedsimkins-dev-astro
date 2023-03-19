---
title: "How to Create 3D NFTs on Solana"
publishDate: "18 May 2022"
description: "Learn how to scan and mint real life objects on Solana"
tags: ["web3", "nfts", "tutorials"]
---

The growth and evolution of NFTs has come a long way from the early days. Some of the early NFT projects were simple .png files or a link to a YouTube video, but now they are an entire industry that consumes brand, utility, even augmented reality. Metaverses, 3D objects, and other virtual reality experiences are all the rage, and I firmly believe we will see more of this in the near future.

One unique tool that I stumbled upon was Polycam. Polycam is a mobile iOS app that utilizes the iPhone’s LiDAR scanner to map 3D objects and environments. 3D NFTs are certainly popular, but what about 3D NFTs of real life objects? Or even better: real life environments? I think this is an angle that not many people have thought about creating, and opens up a whole new realm of artistic expression in ways people have not seen before.

In this tutorial we’ll cover how to use Polycam to scan and create a 3D models and environments, and then we’ll cover how to make them into NFTs using Pinata and Solana.

## Scanning with Polycam

To get started you’ll want to download the Polycam app on the App Store. Be aware that this is only for iPhones, and scanning environments will be more effective if you have a LiDAR scanner on your iPhone. Having a LiDAR scanner is not necessary though! Once you download it you will need to make an account with them and start their 14 day free trial.

Once you do that Polycam will take you to the “captures” page where you can see all your scans. To learn how the scan process works, I would highly recommend their well done tutorials on their website and in the app.

[Using LiDAR Mode to Capture Large Spaces](https://learn.poly.cam/capturing-large-spaces)

[Using Photo Mode to Capture 3D Objects](https://learn.poly.cam/building-a-studio-for-photo-mode-captures)

In short, you will want to use the LiDAR mode when you are trying to scan environments or large spaces, and for 3D objects you will want to use the photo mode!

For this tutorial I’m going to scan my desk space using the LiDAR method, and for the 3D objects we’ll use an old book, and of course Pinnie!

With the video below you can get glimpse of how the LiDAR scanner maps over surfaces. Taking it real slow and covering every angle really helps with scanning environments.

>>INSERT VIMEO

After you’re done scanning there will be a processing step that will take all the data and map it into a 3D environment!

>>INSERT VIMEO

Once it’s processed you can go ahead and view the 3D model/environment! Polycam really is first class; you can create videos, you can view the model in Augmented Reality, it just has so many awesome features! My model isn’t the cleanest since I have so many small detailed objects on my desk, but for something a bit simpler this feature is amazing.

>>INSERT VIMEO

Now that we got our model, we can upload it to the cloud and look at it through our web browser! Just click on the little cloud icon on the top of the screen when viewing your model and it will be uploaded to your cloud storage with Polycam.

Once viewing it in the web browser, we can download the model by clicking “export.”

>>SCREENSHOT

From there we want to select the GLTF format and start the download!

>>SCREENSHOT

Ok so we got our 3D file for our environment, now lets do some 3D objects as well! The process is pretty similar, except for 3D objects we’ll switch to the “photo” mode instead of the LiDAR mode. The photo mode will take a bunch of different pictures and put them together to make a 3D model! In the video below you can see what the process looks like as I scan one of my prized possessions, a 1930's edition of Moby Dick illustrated by Rockwell Kent.

>>INSERT VIMEO

Once we finish scanning the book, I like to select the higher end of the quality allowance, and I like to use the object masking to get all the fine details. These photo mode objects are a bit more work, so when you take one Polycam sends it off to a server for higher powered processing. Due to how intense the work is, you can only take 150 of these a month, but I don’t think that will be an issue for most people. Once they finish processing it, the model looks like this!

>>INSERT VIMEO

The download process looks exactly the same as we did the desk, very easy! Also while you’re still in Polycam, you can edit, adjust, crop, etc. your model all inside their app or website, so that way when the model is exported it’s ready to be turned into an NFT!

Last but not least, we got a model of Pinnie too 😉

[Pinata Polycam Capture](https://poly.cam/capture/FAE73483-C416-49D6-B92C-33260BF924E1)

## Creating 1/1 NFTs on Solana

Alright alright alright, we got our models from Polycam, now lets turn them into 1/1 NFTs on Solana!

First thing you’ll want to do is get a [Pinata account](https://pinat.cloud). I would recommend getting the professional account so you can use a Dedicated Gateway, you’ll see why as we go further!

There’s a lot of great benefits of using IPFS for NFTs, such as [content addressability](https://docs.ipfs.io/concepts/content-addressing/) and [portability](https://medium.com/pinata/web3-data-portability-through-ipfs-saved-hicetnunc-724e3df2948d), but especially speed using a dedicated gateway. Since Solana is still adopting IPFS, not all the wallets and marketplaces have their own gateway solutions to resolve links like “ipfs://CID.” However with our own dedicated gateway we can use a standard “https://” link and deliver it with speed. You’ll see how we’ll do this in a bit!

Let’s log into Pinata and upload our file. Really simple, just click on the upload button in the top left, give it a name, and upload!

>>SCREENSHOT

Then we just need to choose a subdomain and make sure its available. If it is, click next!

If we just clicked on this file to preview it, it’s gonna take us straight to download since the browser doesn’t know what to do. That’s ok! We’re gonna format the link for our NFT metadata. It will look something like this.

```
https://{your-subdomain}.mypinata.cloud/ipfs/{your-3d-file-cid}?filename={file-name-and-extension}
```

For our particular CID the link will look like this!

```
https://pinnieblog.mypinata.cloud/ipfs/QmWmcX9ikvNTJtCmuX9oWiUvTABQZ6tC6UARqa7ozBh2Ry?filename=Pinnie.glb
```

Ok our 3D file is on IPFS, the next step is to create a metadata file that will point to that 3D file. Open up your terminal and run:

```bash
mkdir 3d-nfts && cd 3d-nfts && touch pinnie.json
```

Then open up that pinnie.json file in your text editor of choice. Since we’re using Solana we will want to use [Metaplex Token Metadata Standard](https://docs.metaplex.com/token-metadata/Versions/v1.0.0/nft-standard#json-structure) which you will definitely want to save as a reference, but we’ll be simplifying ours just a little bit.

```json
{
  "name": "3D Pinnie",
  "symbol": "PIN",
  "description": "A 3D scan of Pinnie taken with Polycam",
  "seller_fee_basis_points": 0,
  "image": "null",
  "animation_url": "https://pinnieblog.mypinata.cloud/ipfs/QmWmcX9ikvNTJtCmuX9oWiUvTABQZ6tC6UARqa7ozBh2Ry?filename=Pinnie.glb",
  "external_url": "https://pinata.cloud",
  "collection": {
     "name": "Pinnie's 3D NFTs",
     "family": "3D NFTs"
  },
  "properties": {
    "files": [
      {
        "uri": "null",
        "type": "image/png"
      },
      {
        "uri": "https://pinnieblog.mypinata.cloud/ipfs/QmWmcX9ikvNTJtCmuX9oWiUvTABQZ6tC6UARqa7ozBh2Ry?filename=Pinnie.glb",
        "type": "vr/glb"
      }
    ],
    "category": "3D",
    "creators": [
      {
        "address": "D8KLFUfnRwGsMt6n56FzkyRYmVUQXiRnJWFV7rZYCYdd",
        "share": 100
      }
    ]
  }
}
```

Couple of things you’ll want to take note here. We could use an image URL if you wanted a backup, just make sure you upload a separate file to Pinata. For our example I’ve left it as null. The key thing to notice is the “animation_url” which I have set to our link we created earlier. Under properties and files, we left the image null again, and created another one that includes:

```json
{
  "uri": "https://pinnieblog.mypinata.cloud/ipfs/QmWmcX9ikvNTJtCmuX9oWiUvTABQZ6tC6UARqa7ozBh2Ry?filename=Pinnie.glb",
  "type": "vr/glb"
}
```

The uri is the link to our content, and the type defines the kind of file we want to use, which in this case is virtual reality (vr) and the file format (glb). Once you get familiar with the metadata standard it’s pretty straight forward. Now that we created this metadata file, save it and upload it to Pinata as well. Once it’s uploaded take note of the CID and save the link to it, should look something like this:

```
https://pinnieblog.mypinata.cloud/ipfs/QmYTQDE2ur5Lo4z76cNjwMAq6H3oNyDb1xuCQfdxMBnmon
```

We’re really close to minting this NFT! [Solana](https://solana.com/) is an up and coming blockchain that is capable of incredible speeds and low transactions fees. Before we go any further you’ll want to make sure you have a couple of things installed on your computer:

- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Metaboss](https://github.com/samuelvanderwaal/metaboss)

Be sure to follow the instructions for installing each very carefully! The Solana CLI is the tool that will let us interact with the Solana blockchain, and Metaboss is nicknamed “The Solana Metaplex NFT ‘Swiss Army Knife’” and rightly so. It is packed with features, including the minting NFTs!

Once you’ve installed both, let’s make sure the Solana CLI is setup properly by running the following command.

```bash
solana --version
```

If that returns the version then we are good to go! Next thing we’ll do is create a wallet, set our network to devnet, and get some fake sol. To create a new wallet run the command below.

```bash
solana-keygen new --outfile ~/.config/solana/devnet.json
```

This will create a file on your computer and is the code version of a new Solana wallet! Next we want to set our Solana config to use this wallet by default.

```bash
solana config set --keypair ~/.config/solana/devnet.json
```

Last but not least, we’ll set our Solana config to use the devnet environment so we can use fake money and have room to mess around.

```bash
solana config set --url https://api.devnet.solana.com
```

Now we can make sure all is good by running:

```bash
solana config get
```

This will return what wallet we’re using and what network we’re on! Last step is to get some test SOL, which is so easy! Just run the command below. Once it’s done it should return a balance!

```bash
solana airdrop 2
```

As far as Metaboss goes, it’s pretty simple to install after installing Solana. Once you have installed it, run the following command to make sure it’s ready to go.

```bash
metaboss --version
```

To mint our NFT, Metaboss makes it so easy! We just gotta run this command:

```bash
metaboss mint one --external-metadata-uri https://pinnieblog.mypinata.cloud/ipfs/QmYTQDE2ur5Lo4z76cNjwMAq6H3oNyDb1xuCQfdxMBnmon --keypair ~/.config/solana/devnet.json
```

Let’s break down what’s happening here. Metaboss is going to mint one token for us, and we set the “external-metadata-uri” to the url we created a little while ago that points to our uploaded metadata. Then we just set the keypair or wallet to authorize the transaction, and that’s it! If it worked you should get a result with the transaction ID and the mint account!

Ok but we want to see it right? All we gotta do is open our ~/.config/solana/devnet.json file, and copy the numbers in it (this is your private key, keep it safe and do not share it!)

Then using a wallet like Phantom, click on “Add / Connect wallet, select “import private key,” then paste in our keypair from earlier. Once it’s in your wallet you will want to click on the settings icon in the bottom right, scroll down to “change network” and set it to “Devnet.” Once you do that, go back to your NFTs page and you should see it!!

>>SCREENSHOT

## Conclusion

Polycam really introduces a whole new way of how content can be created using modern tech. You can imagine how this might be used for journalism, where instead of just looking at a photo of a story, you can view it as a 3D object with augmented reality. Someone who explores caves can share their experience as a 3D environment! Paired with Solana as a much faster and affordable layer one solution, and [Pinata](https://pinata.cloud) to deliver IPFS content quickly, the possibilities are endless!
