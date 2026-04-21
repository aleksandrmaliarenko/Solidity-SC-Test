import { ethers, deployments, getNamedAccounts } from 'hardhat'

/**
 * TASK 1: Deployment Script
 *
 * Deploy the Ondo bridge system, register 3 mock tokens, and wire everything up.
 * Study the contracts to understand their constructor dependencies and required
 * post-deployment configuration.
 *
 * Contract Architecture:
 *
 *                     ┌─────────────────┐
 *                     │    OndoOwner    │
 *                     │  (role-based    │
 *                     │     admin)      │
 *                     └────────┬────────┘
 *                              │ owns
 *        ┌─────────────────────┼─────────────────────┐
 *        ▼                     ▼                     ▼
 * ┌───────────┐          ┌───────────┐          ┌─────────────┐
 * │ Inspector │◄─module──│ Messenger │──module─►│ RateLimiter │
 * └───────────┘          |  (OApp)   |          └─────────────┘
 *                        └─────┬─────┘          
 *                              │
 *                              │ registerToken()
 *                  ┌───────────┼───────────┐
 *                  ▼           ▼           ▼
 *            ┌──────────┐ ┌──────────┐ ┌──────────┐
 *            │ OndoOFT  │ │ OndoOFT  │ │ OndoOFT  │ ◄── Created when tokens are registered
 *            └────┬─────┘ └────┬─────┘ └────┬─────┘
 *                 │            │            │
 *                 ▼            ▼            ▼
 *             ┌──────────┐ ┌──────────┐ ┌──────────┐
 *             │  Token   │ │  Token   │ │  Token   │
 *             └──────────┘ └──────────┘ └──────────┘
 *
 * See README.md for additional context.
 */

async function main() {
    const { deployer } = await getNamedAccounts()
    console.log('Deploying contracts with account:', deployer)

    // Get the LayerZero EndpointV2 deployment
    // This is provided by @layerzerolabs/toolbox-hardhat
    const endpointV2 = await deployments.get('EndpointV2')
    console.log('Using LayerZero EndpointV2 at:', endpointV2.address)

    // TODO: Implement your deployment logic here
    //
    // Requirements:
    // - Deploy all 4 core contracts (Inspector, RateLimiter, Messenger, OndoOwner)
    // - Wire up the contracts so they can communicate
    // - Transfer ownership to OndoOwner
    // - Deploy 3 mock ERC20 tokens (use MockERC20MintableBurnable, 18 decimals)
    // - Register each token with the Messenger

    console.log('\n=== Deployment Complete ===')
    // TODO: Log all deployed addresses
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
