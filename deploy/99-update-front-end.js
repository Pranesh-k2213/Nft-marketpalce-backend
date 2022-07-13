const { ethers, getChainId } = require("hardhat")
const fs = require("fs")

const frontendContractFile = "../nftmarketplace-frontend/src/constants/networkMapping.json"
const frontendAbiLocation = "../nftmarketplace-frontend/src/constants/"

module.exports = async function () {
    if (process.env.UPDATE_FRONTEND) {
        console.log("Updating Front end")
        await updateContractAddress()
        await updateAbi()
    }
}

async function updateContractAddress() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const chainId = (await getChainId()).toString()
    const contractAddress = JSON.parse(fs.readFileSync(frontendContractFile), "utf8")
    console.warn(contractAddress)
    //console.warn(contractAddress[chainId]["NftMarketplace"], "line 2")
    // if (chainId in contractAddress) {
    //     if (!contractAddress[chainId]["NftMarketplace"].includes(nftMarketplace.address)) {
    //         contractAddress[chainId]["NftMarketplace"].push(nftMarketplace.address)
    //     }
    // } else {
    contractAddress[chainId] = { NtfMarketplace: nftMarketplace.address }
    //}
    fs.writeFileSync(frontendContractFile, JSON.stringify(contractAddress))
}

async function updateAbi() {
    console.log("updating abi")
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    fs.writeFileSync(
        `${frontendAbiLocation}nftMarketplace.json`,
        nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
    )
    const basicNft = await ethers.getContract("BasicNft")
    fs.writeFileSync(
        `${frontendAbiLocation}basicNft.json`,
        basicNft.interface.format(ethers.utils.FormatTypes.json)
    )
    console.log("Updated")
}

module.exports.tags = ["all", "frontend"]
