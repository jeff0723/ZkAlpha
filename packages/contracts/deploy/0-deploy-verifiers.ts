import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { network } from "hardhat";
import { DEPLOY_CONFIG } from "../config/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	const deployConfig = DEPLOY_CONFIG as any;
	if (deployConfig[network.name]) {
		await deploy("DepositVerifier", { from: deployer });
		await deploy("WithdrawVerifier", { from: deployer });
		await deploy("SwapVerifier", { from: deployer });
		await deploy("FinalizeVerifier", { from: deployer });
	}
};
export default func;