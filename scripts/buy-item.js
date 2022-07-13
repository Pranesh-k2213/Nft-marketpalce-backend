const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const TOKEN_ID = 2

async function buyItem() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const basicNft = await ethers.getContract("BasicNft")
    const listing = await nftMarketplace.getListing(basicNft.address, TOKEN_ID)
    const price = listing.price.toString()
    const buyItemTx = await nftMarketplace.buyItem(basicNft.address, TOKEN_ID, { value: price })
    await buyItemTx.wait(1)

    console.log("NFT bought")
    if (network.name == "localhost") {
        await moveBlocks(4, (sleepAmount = 500))
    }
}

buyItem()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
