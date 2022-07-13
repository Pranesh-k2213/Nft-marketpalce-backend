const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

async function mintItem() {
    const basicNft = await ethers.getContract("BasicNft")
    console.log("Minting...")
    const mintTx = await basicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.events[0].args.tokenId
    console.log(tokenId)

    if (network.name == "localhost") {
        await moveBlocks(4, (sleepAmount = 500))
    }
}

mintItem()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
