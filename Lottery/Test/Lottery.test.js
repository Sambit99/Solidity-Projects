const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { abi, evm } = require("./../compile");
const web3 = new Web3(ganache.provider());

let accounts;
let lottery;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery", () => {
  it("deploys a contract", () => {
    assert.ok(lottery.options.address);
  });

  it("shows who is the manager", async () => {
    const manager = await lottery.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });

  it("enters the contest", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });

    const players = await lottery.methods.getAllPlayers().call({
      from: accounts[0],
    });

    assert.equal(players[players.length - 1], accounts[0]);
  });

  it("enters the contest with different ID", async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether"),
    });

    const players = await lottery.methods.getAllPlayers().call({
      from: accounts[1],
    });

    assert.equal(players[players.length - 1], accounts[1]);
  });

  it("requires a minimum amount of ether to enter", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 0,
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("only Manager can pick winner", async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1],
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("sends money to winner and resets the player array", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei("2", "ether"),
      });

      const initialBalance = await web3.eth.getBalance(accounts[0]);

      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });

      const finalBalance = await web3.eth.getBalance(accounts[0]);

      const diffrence = finalBalance - initialBalance;

      assert(diffrence > web3.utils.toWei("1.8", "ether"));
    } catch (error) {
      assert(error);
    }
  });

  it("resets the player array after pick winner", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei("2", "ether"),
      });

      const initialBalance = await web3.eth.getBalance(accounts[0]);

      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });

      const finalBalance = await web3.eth.getBalance(accounts[0]);

      const diffrence = finalBalance - initialBalance;

      const players = await lottery.methods
        .getAllPlayers()
        .call({ from: accounts[0] });

      assert(players.length == 0);
    } catch (error) {
      assert(error);
    }
  });

  it("makes lottery balance 0 after picking a winner by Manager", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei("2", "ether"),
      });

      const initialBalance = await web3.eth.getBalance(accounts[0]);

      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });

      const balance = await lottery.methods
        .getLotteryBalance()
        .call({ from: accounts[0] });

      assert(balance == 0);
    } catch (error) {
      assert(error);
    }
  });
});
