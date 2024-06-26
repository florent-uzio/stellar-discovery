import { Keypair } from "@stellar/stellar-sdk"
import axios from "axios"
import * as dotenv from "dotenv"

dotenv.config()

// Testnet default accounts, if you forget to create a .env file in the root directory of this project. Check the README for more information.
const DEFAULT_WALLET_1_SEED = "sEd7HTHJVuaEF3kNRiDBHgyPMSidAq6" // rJWdrBE4GXsdBq3e2HPFG6QJvwYgKMg5zp
const DEFAULT_WALLET_2_SEED = "sEdVJX6VNa5CnyLHjj3E6iUV2iiJDHX" // rNLTsHmWobFCtpTEcUjYcLLfLpvqXguosJ
const DEFAULT_WALLET_3_SEED = "sEd7wTQYsS5NQTajXPcAJQFLwkeVxay" // rGJ5aiiZP41qbszhWRVrXiZQpw1tM42w59

// https://xrpl.org/xrp-testnet-faucet.html
const WALLET_1_SEED = process.env.WALLET_1_SEED ?? DEFAULT_WALLET_1_SEED // Edit/create a .env file with a WALLET_1_SEED key
const WALLET_2_SEED = process.env.WALLET_2_SEED ?? DEFAULT_WALLET_2_SEED // Edit/create a .env file with a WALLET_2_SEED key
const WALLET_3_SEED = process.env.WALLET_3_SEED ?? DEFAULT_WALLET_3_SEED // Edit/create a .env file with a WALLET_3_SEED key

export const WALLET_1 = Keypair.fromSecret(WALLET_1_SEED)
export const WALLET_2 = Keypair.fromSecret(WALLET_2_SEED)
export const WALLET_3 = Keypair.fromSecret(WALLET_3_SEED)

// Function to create and fund a new keypair using Friendbot
export const createFundedKeypair = async (): Promise<Keypair> => {
  const pair = Keypair.random()
  const publicKey = pair.publicKey()

  try {
    // Use Friendbot to fund the new account
    const response = await axios.get(`https://friendbot.stellar.org?addr=${publicKey}`)
    console.log(`Friendbot response: ${response.data}`)
  } catch (error) {
    console.error(`Error funding account: ${error}`)
    throw error
  }

  console.log(`Created and funded new keypair:
      Public Key: ${publicKey}
      Secret Key: ${pair.secret()}
    `)

  return pair
}

// Function to create and fund multiple keypairs
export const createMultipleFundedKeypairs = async (count: number): Promise<Keypair[]> => {
  const keypairs: Keypair[] = []
  for (let i = 0; i < count; i++) {
    const pair = await createFundedKeypair()
    keypairs.push(pair)
  }
  return keypairs
}
