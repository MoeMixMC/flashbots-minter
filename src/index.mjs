import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle";
import { BigNumber, providers, Wallet } from "ethers";

const provider = new providers.InfuraProvider(5)

async function main(){
    const flashbotsProvider = await FlashbotsBundleProvider.create(provider, new Wallet.createRandom(), "https://relay-goerli.flashbots.net")
    provider.on('block', (blockNumber) => {
        console.log(blockNumber)
        flashbotsProvider.sendBundle(
            [
                {
                    transaction: {
                        chainId: 5,
                        type: 2,
                        value: BigNumber.from(0),
                        gasLimit: 50000,
                        data: "0x",
                        maxFeePerGas: BigNumber.from(10).pow(9).mul(3),
                        maxPriorityFeePerGas: BigNumber.from(10).pow(9).mul(2),
                        to: "0x957B500673A4919C9394349E6bbD1A66Dc7E5939"
                    },
                    signer: new Wallet(process.env.WALLET_PRIVATE_KEY)
                }
            ], blockNumber + 1
        )
    })
}

main()