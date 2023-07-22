import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { network } from "hardhat";
import { DEPLOY_CONFIG } from "../config/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	console.log("network:", network.name);
	console.log("deployer:", deployer);
    if (network.name === "hardhat") {
		await deploy("MockUSDC", { from: deployer });
		await deploy("MockWETH", { from: deployer });
    }
};
export default func;