
//var HDWalletProvider = require("truffle-hdwallet-provider");
//var mnemonic = "involve ethics bike script asset giraffe puppy place yard kite imitate action";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    },
  /*  rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/e280f0ae5dc74d738691f6916ee7c749")
      },
      network_id: 4
    } */
  }
};
