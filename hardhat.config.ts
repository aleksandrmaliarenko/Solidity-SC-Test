import 'dotenv/config'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import '@layerzerolabs/toolbox-hardhat'

import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'
import { EndpointId } from '@layerzerolabs/lz-definitions'

// Set your preferred authentication method
const MNEMONIC = process.env.MNEMONIC
const PRIVATE_KEY = process.env.PRIVATE_KEY

let accounts: HttpNetworkAccountsUserConfig | undefined

if (MNEMONIC) {
    accounts = { mnemonic: MNEMONIC }
} else if (PRIVATE_KEY) {
    accounts = [PRIVATE_KEY]
}

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions.'
    )
}

const config: HardhatUserConfig = {
    paths: {
        cache: 'cache/hardhat',
    },
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        // Local hardhat network for testing
        hardhat: {
            accounts: {
                count: 10,
                accountsBalance: '1000000000000000000000000',
            },
            chainId: 1337,
        },
        // Sepolia testnet - use this for interview testing
        sepolia: {
            eid: EndpointId.SEPOLIA_V2_TESTNET,
            url: process.env.RPC_URL_SEPOLIA || 'https://rpc.sepolia.org',
            accounts,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
}

export default config
