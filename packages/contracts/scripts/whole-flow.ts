import { Relayer__factory, ERC20__factory, Vault__factory } from "../typechain-types";
import { ethers } from "hardhat";
import {DEPLOY_CONFIG} from "../config/constants";
import { EventLog } from "ethers";
import fetch from 'node-fetch';
const { provider } = ethers;

async function main() {
  const network = await provider.getNetwork();
  const [signer] = await ethers.getSigners();
  const relayer = Relayer__factory.connect("0x976fcd02f7c4773dd89c309fbf55d5923b4c98a1", signer);
  const tx = await relayer.uploadModel("0x9372c470eeadd5ecd9c3c74c2b3cb633f8e2f2fad799250a0f70d652b6b825e4");
  const receipt = await tx.wait();
  if (!receipt) return;
  const uploadModelEvent = receipt.logs[1] as EventLog;
  console.log("vault address:", uploadModelEvent.args[2]);

  const vault = Vault__factory.connect(uploadModelEvent.args[2], signer);
  const vaultAddress = await vault.getAddress();
  const usdc = ERC20__factory.connect(DEPLOY_CONFIG.gnosis.usdcContractAddress);

  const whale = await ethers.getImpersonatedSigner("0xc66825c5c04b3c2ccd536d626934e16248a63f68");
  await (await usdc.connect(whale).transfer(signer.address, "10000000000")).wait();

  await (await usdc.connect(signer).approve(vaultAddress, "10000000000")).wait();
  await (await vault.connect(signer).userDeposit("100000000")).wait();
  const data = await getOneInchData(vaultAddress,100000000)
  console.log(data)
  // await (await vault.depositToRelayer(
  //   "0x1ecc984782311fed997a5a208cfdca1dfed06fb0b14ba6ce030612973115b06e",
  //   "0x", "0x"
  // )).wait();

}

const getOneInchData = async (address:string, amount:number) => {
    const url = 'https://api.1inch.dev/swap/v5.2/1/swap';
    const srcAddress = '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83';
    const dstAddress = '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1';
    const fromAddress = address
    const slippage = '50';
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${process.env.ONE_INCH_API_KEY}`
    };
    const queryString = new URLSearchParams({
        src: srcAddress,
        dst: dstAddress,
        amount: amount.toString(),
        from: fromAddress,
        slippage: slippage,
        disableEstimate: 'true'
    }).toString();
    const fetchOptions = {
        method: 'GET',
        headers: headers
    };
    const apiUrl = `${url}?${queryString}`;
    const response = await fetch(apiUrl, fetchOptions)
    console.log(response.status)
    const { tx } = await response.json();
    return tx.data
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});