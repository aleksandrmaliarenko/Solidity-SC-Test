import { ethers } from 'hardhat'

/**
 * TASK 2: Verification Script (Bonus)
 *
 * Write a script that verifies the deployed contracts are correctly wired:
 * 1. RateLimiter.messenger() returns correct Messenger address
 * 2. Messenger.rateLimiter() returns correct RateLimiter address
 * 3. Messenger.inspector() returns correct Inspector address
 * 4. Token registrations are correct (idToOft, idToToken)
 * 5. Ownership is transferred to OndoOwner
 *
 * See README.md for detailed requirements.
 */

// TODO: Update these addresses after deployment
const DEPLOYED_ADDRESSES = {
    inspector: '',
    rateLimiter: '',
    messenger: '',
    ondoOwner: '',
    tokens: [
        { name: 'TOKEN_A', address: '', tokenId: '' },
        { name: 'TOKEN_B', address: '', tokenId: '' },
        { name: 'TOKEN_C', address: '', tokenId: '' },
    ],
}

async function main() {
    console.log('=== Verifying Deployment ===\n')

    let allPassed = true

    // TODO: Implement verification logic here

    // Verification 1: RateLimiter.messenger() == Messenger address

    // Verification 2: Messenger.rateLimiter() == RateLimiter address

    // Verification 3: Messenger.inspector() == Inspector address

    // Verification 4: Token registrations
    // For each token:
    //   - Check idToOft(tokenId) != address(0)
    //   - Check idToToken(tokenId) == token address

    // Verification 5: Ownership
    // Inspector, RateLimiter, Messenger should be owned by OndoOwner

    console.log('\n=== Verification Complete ===')
    if (allPassed) {
        console.log('All checks PASSED!')
    } else {
        console.log('Some checks FAILED!')
        process.exit(1)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
