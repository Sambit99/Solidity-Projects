import web3 from "./web3";

const address = "0x1Cb17F65cefeAa8d09908a068642A84b7b3664e3";
const abi = [
  {
    constant: true,
    inputs: [],
    name: "manager",
    outputs: [[Object]],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x481c6a75",
  },
  {
    constant: false,
    inputs: [],
    name: "pickWinner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x5d495aea",
  },
  {
    constant: true,
    inputs: [],
    name: "random",
    outputs: [[Object]],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x5ec01e4d",
  },
  {
    constant: true,
    inputs: [],
    name: "getLotteryBalance",
    outputs: [[Object]],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x60654e47",
  },
  {
    constant: false,
    inputs: [],
    name: "enter",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
    signature: "0xe97dcb62",
  },
  {
    constant: true,
    inputs: [],
    name: "getAllPlayers",
    outputs: [[Object]],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xefa1c482",
  },
  {
    constant: true,
    inputs: [[Object]],
    name: "players",
    outputs: [[Object]],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xf71d96cb",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
    constant: undefined,
    signature: "constructor",
  },
];

const lottery = new web3.eth.Contract(abi, address);
(async () => {
  const accounts = await web3.eth.getAccounts();
  const manager = await lottery.methods.manager().call({ from: accounts[0] });
})();
// console.log(contract);

export default lottery;
