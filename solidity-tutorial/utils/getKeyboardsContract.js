import { ethers } from "ethers";

import abi from "../utils/Keyboards.json";

const contractAddress = "0x9fF96dc4d3B5B1B6251786Cd85d41e533B6b36aD";
const contractABI = abi.abi;

export default function getKeyboardsContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
