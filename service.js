const { Wallet, Chain, Network } = require('mintbase');

// Connect and fetch details
async function connectMintBase() {
  const { data: walletData, error } = await new Wallet().init({
    networkName: Network.testnet,
    chain: Chain.near,
    apiKey: '7280e9e3-3bf0-4339-8773-a7048b24fc78',
  })

  const { wallet, isConnected } = walletData
  console.log("Is connected: ", isConnected);
  if (isConnected) {
    const { data: details } = await wallet.details()
    console.log(details)
    /*
      accountId: "qwerty.testnet"
      allowance: "0.25"
      balance: "365.77"
      contractName: "mintbase13.testnet"
    */
  }
}

// connect()

module.exports = connectMintBase;