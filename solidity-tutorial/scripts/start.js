async function main() {
  const [owner, somebodyElse] = await hre.ethers.getSigners();
  const keyboardsContractFactory = await hre.ethers.getContractFactory(
    "Keyboards"
  );
  const keyboardsContract = await keyboardsContractFactory.deploy();
  await keyboardsContract.deployed();

  console.log("Contract deployed to:", keyboardsContract.address);

  const keyboardTxn1 = await keyboardsContract.create(0, true, "sepia");
  await keyboardTxn1.wait();
  // const keyboardTxnReceipt = await keyboardTxn1.wait();
  // console.log(keyboardTxnReceipt.events);

  // const keyboardTxn2 = await keyboardsContract
  //   .connect(somebodyElse)
  //   .create(1, false, "grayscale");
  // await keyboardTxn2.wait();

  // const balanceBefore = await hre.ethers.provider.getBalance(
  //   somebodyElse.address
  // );
  // console.log(
  //   "somebodyElse balance before!",
  //   hre.ethers.utils.formatEther(balanceBefore)
  // );

  const tipTxn = await keyboardsContract.connect(somebodyElse).tip(0, {
    value: hre.ethers.utils.parseEther("100"),
  }); // tip the 2nd keyboard as owner!
  // await tipTxn.wait();
  const tipTxnReceipt = await tipTxn.wait();
  console.log(tipTxnReceipt.events);

  // const balanceAfter = await hre.ethers.provider.getBalance(
  //   somebodyElse.address
  // );
  // console.log(
  //   "somebodyElse balance after!",
  //   hre.ethers.utils.formatEther(balanceAfter)
  // );

  // let keyboards = await keyboardsContract.getKeyboards();
  // console.log("We got the keyboards!", keyboards);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
