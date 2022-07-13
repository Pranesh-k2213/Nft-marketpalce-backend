const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const TOKEN_ID = 1

async function cancelItem() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const basicNft = await ethers.getContract("BasicNft")
    const cancelTx = await nftMarketplace.cancelListing(basicNft.address, TOKEN_ID)
    await cancelTx.wait(1)

    console.log("NFT cancelled")
    if (network.name == "localhost") {
        await moveBlocks(4, (sleepAmount = 500))
    }
}

cancelItem()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
