# Test GM Bridge - Implementation Engineer Interview

Welcome to the Smart Contracts Engineer technical interview!

## Overview

This repository contains the Test GM Bridge system - a LayerZero-based cross-chain token bridge. Your task is to write deployment and verification scripts for this system.

## System Architecture

The bridge consists of the following contracts:

### Core Contracts

1. **Inspector** - Handles pause/unpause functionality for the bridge
2. **RateLimiter** - Enforces rate limits on token transfers
3. **Messenger** - The central OApp that routes LayerZero messages between chains
4. **Owner** - Admin hub with role-based access control
5. **OFT** - The OFT (Omnichain Fungible Token) for each registered token

### Key Relationships

```
                      ┌─────────────────┐
                      │    Owner  │
                      │  (role-based    │
                      │     admin)      │
                      └────────┬────────┘
                               │ owns
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
  ┌───────────┐          ┌───────────┐          ┌─────────────┐
  │ Inspector │◄─module──│ Messenger │──module─►│ RateLimiter │
  └───────────┘          |  (OApp)   |          └─────────────┘
                         └─────┬─────┘          
                               │
                               │ registerToken()
                   ┌───────────┼───────────┐
                   ▼           ▼           ▼
             ┌──────────┐ ┌──────────┐ ┌──────────┐
             │OFT │ │OFT │ │OFT │ ◄── Created when tokens are registered
             └────┬─────┘ └────┬─────┘ └────┬─────┘
                  │            │            │
                  ▼            ▼            ▼
             ┌──────────┐ ┌──────────┐ ┌──────────┐
             │  Token   │ │  Token   │ │  Token   │
             └──────────┘ └──────────┘ └──────────┘
```

### Contract Dependencies

- **Messenger** depends on:
  - Inspector address
  - RateLimiter address
  - LayerZero EndpointV2 address
  - Owner/delegate address

- **RateLimiter** needs:
  - Messenger address set after deployment (via `setMessenger`)

- **Owner** depends on:
  - Inspector address
  - Messenger address
  - RateLimiter address

## Setup

```bash
# Install dependencies
npm install

# Copy environment file and add your private key
cp .env.example .env

# Compile contracts
npm run compile
```

## Your Tasks

You have **two tasks** to complete. Task 1 is required, Task 2 is a bonus if time permits.

---

### Task 1: Deployment Script (Required)

**File:** `scripts/deploy.ts`

Write a Hardhat script that deploys the complete Test GM Bridge system and registers 3 tokens:

1. Deploy the core bridge contracts:
   - Inspector
   - RateLimiter
   - Messenger
   - Owner

2. Wire up the contracts:
   - Set the Messenger address on the RateLimiter
   - Transfer ownership of Inspector, RateLimiter, and Messenger to Owner

3. Deploy 3 mock ERC20 tokens (using `MockERC20MintableBurnable`)

4. Register all 3 tokens with the Messenger (this creates OFT contracts)

**Expected Output:**
The script should log the deployed addresses for all contracts.

**Hints:**
- The LayerZero EndpointV2 is available as an external deployment via `deployments.get('EndpointV2')`
- Token registration uses `Messenger.registerToken(tokenId, tokenAddress)` and returns the OFT address
- A `tokenId` is a `bytes32` identifier - you can use `ethers.utils.formatBytes32String("TOKEN_NAME")`

---

### Task 2: Verification Script (Bonus)

**File:** `scripts/verify.ts`

Write a script that verifies the deployed contracts are correctly wired:

1. Verify RateLimiter

2. Verify Messenger

3. Verify token registrations

4. Verify ownership

---

## Running Your Scripts

```bash
# Run deployment on local hardhat network (for testing)
npx hardhat run scripts/deploy.ts

# Run deployment on Sepolia testnet
npx hardhat run scripts/deploy.ts --network sepolia

# Run verification (after deployment)
npx hardhat run scripts/verify.ts --network sepolia
```

## Contract Reference

Key contract functions you'll need:

```solidity
// RateLimiter
function setMessenger(address _messenger) external;
function messenger() external view returns (address);

// Messenger
function registerToken(bytes32 tokenId, address tokenAddress) external returns (address oftAddress);
function rateLimiter() external view returns (address);
function inspector() external view returns (address);
function idToOft(bytes32 tokenId) external view returns (address);
function idToToken(bytes32 tokenId) external view returns (address);

// Owner (constructed with all addresses, has AccessControl roles)
constructor(
    address _inspector,
    address _messenger,
    address _rateLimiter,
    address _inspectorAdmin,
    address _messengerAdmin,
    address _rateLimiterAdmin,
    address _owner
);

// Ownable (on Inspector, RateLimiter, Messenger)
function owner() external view returns (address);
function transferOwnership(address newOwner) external;
```

## Evaluation Criteria

- **Correctness**: Does the script deploy and wire all contracts correctly?
- **Code Quality**: Is the code clean, well-organized, and readable?
- **Error Handling**: Does the script handle potential errors gracefully?
- **Completeness**: Are all requirements addressed?

Good luck!
