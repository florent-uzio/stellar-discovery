# Stellar

This repo is to interact with the Stellar network.

## Setup

`npm install` to install the dependencies.

## Usage

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
