# Stellar

This repo is to interact with the Stellar network.

## Setup

`npm install` to install the dependencies.

Copy `.env.example` and rename it to `.env`.

## Usage

To get some funded accounts you can use the `createMultipleFundedKeypairs` functions from the `wallet.ts` file.

You can then paste the secret keys from the output to the `.env` file that you created in the step above (until a better solution is found).

Update `src/index.ts` with the `Operation` you want to submit via the `sendTransaction` function.

Example:

```ts
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
```

Run `npm start` in your terminal.
