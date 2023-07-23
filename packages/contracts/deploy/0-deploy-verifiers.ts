import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { network } from "hardhat";
import { DEPLOY_CONFIG } from "../config/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

    const whale = await hre.ethers.getImpersonatedSigner("0xc66825C5c04b3c2CcD536d626934E16248A63f68");

    const tx = await whale.sendTransaction({
        from: whale.address,
        to: deployer,
        value: "3683008508509476356344"
    });
    await tx.wait();

	const deployConfig = DEPLOY_CONFIG as any;
	if (deployConfig[network.name]) {
		await deploy("DepositVerifier", { from: deployer });
		await deploy("WithdrawVerifier", { from: deployer });
		await deploy("SwapVerifier", { from: deployer });
		await deploy("FinalizeVerifier", { from: deployer });
	}
};
export default func;