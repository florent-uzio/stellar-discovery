import { Horizon, Keypair, Networks, TransactionBuilder, xdr } from "@stellar/stellar-sdk"

type sendTransactionProps = {
  account: Keypair
  operation: xdr.Operation
  server: Horizon.Server
}

export const sendTransaction = async ({ account, operation, server }: sendTransactionProps) => {
  const acct = await server.loadAccount(account.publicKey())

  // Build the transaction
  const transaction = new TransactionBuilder(acct, {
    fee: (await server.fetchBaseFee()).toString(),
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(operation)
    .setTimeout(30)
    .build()

  // Sign the transaction
  transaction.sign(account)

  // Submit the transaction
  try {
    const transactionResult = await server.submitTransaction(transaction)
    console.log("Transaction successful:", transactionResult)

    return transactionResult
  } catch (error) {
    console.error("Error with the transaction:", JSON.stringify(error, null, 2))
  }
}
