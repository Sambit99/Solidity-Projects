const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");
const fs = require("fs");
const path = require("path");

const provider = new HDWalletProvider({
  mnemonic: {
    phrase:
      "elite dinner drink faint mango heavy sunny sword hollow quarter tourist great",
  },
  providerOrUrl:
    "https://rinkeby.infura.io/v3/1c8335fa9f824378a61d33ecc2d032b0",
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "1000000" });

  console.log(abi);
  console.log(`Contract deployed to ${result.options.address}`);

  provider.engine.stop();
};

deploy();
