async function main() {
  const keyboardsContractFactory = await hre.ethers.getContractFactory(
    "Keyboards"
  );
  const keyboardsContract = await keyboardsContractFactory.deploy();
  await keyboardsContract.deployed();

  console.log(
    `The keyboards contract is deployed to ${keyboardsContract.address}`
  );

  const keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//  0xD08D3e40342e03AD457491d13DBEe19B104F00E1
// 0xfa11d2E35F7d0cA7C4390bB3BbbEa54c8604Ab6b NEW CONTRACT
// 0x7FBCB777f932394bF9eAefC5327B040536548d41 Brand New
// 0x9fF96dc4d3B5B1B6251786Cd85d41e533B6b36aD Brand Brand New
