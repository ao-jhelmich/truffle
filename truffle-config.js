const PrivateKeyProvider = require("@truffle/hdwallet-provider");
const privateKey = "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
const privateKeyProvider = new PrivateKeyProvider(privateKey, "http://localhost:8545");

module.exports = {
  networks: {
    besuWallet: {
      provider: privateKeyProvider,
      network_id: "*"
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  }
};