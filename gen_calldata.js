const { ethers } = require("ethers");
async function main() {
  let iface = new ethers.utils.Interface([
    "function preSaleState() public",
  ])
  let calldata = iface.encodeFunctionData("preSaleState", [])
  console.log("preSaleState", calldata)


  iface = new ethers.utils.Interface([
    "function saleState() public",
  ])
  calldata = iface.encodeFunctionData("saleState", [])
  console.log("saleState", calldata)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



