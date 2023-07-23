import { Relayer__factory, ERC20__factory, Vault__factory } from "../typechain-types";
import { ethers } from "hardhat";
import {DEPLOY_CONFIG} from "../config/constants";
const { provider } = ethers;

type ArtifactMap = { [chainId: number]: string };

export const artifactMap: ArtifactMap = {
  1337: "../deployments/localhost/",
}

async function main() {
  const network = await provider.getNetwork();
  const chainId = network.chainId;
  const [signer] = await ethers.getSigners();
  const prefix = artifactMap[Number(chainId)];
  if (!prefix) {
    console.error("[ERROR] invalid network");
    return;
  }
  const artifactJson = prefix + 'Relayer.json';
  const deployment = require(artifactJson);
  if (!deployment) {
    console.error(`[ERROR] deployment not exists (${chainId})`);
    return;
  }
  console.log("contract address:", deployment.address);
  const relayer = Relayer__factory.connect(deployment.address, signer);
  const vault = Vault__factory.connect("0x61c36a8d610163660E21a8b7359e1Cac0C9133e1", signer);
  const vaultAddress = await vault.getAddress();
  const usdc = ERC20__factory.connect(DEPLOY_CONFIG.gnosis.usdcContractAddress);

  const whale = await ethers.getImpersonatedSigner("0xc66825c5c04b3c2ccd536d626934e16248a63f68");
  await (await usdc.connect(whale).transfer(signer.address, "10000000000")).wait();

  await (await usdc.approve(vaultAddress, "10000000000")).wait();
  await (await vault.userDeposit("100000000")).wait();
  // await (await vault.depositToRelayer(
  //   "0x1ecc984782311fed997a5a208cfdca1dfed06fb0b14ba6ce030612973115b06e",
  //   "0x", "0x"
  // )).wait();

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});