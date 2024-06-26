import { Asset, Horizon, Operation } from "@stellar/stellar-sdk"
import * as dotenv from "dotenv"
import { sendTransaction } from "./transactions"
import { WALLET_1, WALLET_2, WALLET_3 } from "./wallets"

dotenv.config()

// Define the Stellar testnet server
const server = new Horizon.Server("https://horizon-testnet.stellar.org")

// Issued Currency that you want to use in your TrustSet or Payment transactions for example.
// Create a TOKEN field in your .env file. If TOKEN is not present, it will default to "ABC".
const { TOKEN = "ABC" } = process.env

const main = async () => {
  const assetIssuer = WALLET_1.publicKey()

  const asset = new Asset(TOKEN, assetIssuer)

  const operation = Operation.payment({
    destination: WALLET_3.publicKey(),
    amount: "0.5",
    asset,
  })

  await sendTransaction({
    server,
    account: WALLET_2,
    operation,
  })
}

main()
