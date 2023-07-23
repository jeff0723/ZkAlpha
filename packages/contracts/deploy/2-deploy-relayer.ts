import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { network } from "hardhat";
import { DEPLOY_CONFIG } from '../config/constants';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
	const { deploy, get } = deployments;
	const { deployer } = await getNamedAccounts();

	const deployConfig = DEPLOY_CONFIG as any;
	if (deployConfig[network.name]) {
		const dVerifier = await get("DepositVerifier");
		const wVerifier = await get("WithdrawVerifier");
		const sVerifier = await get("SwapVerifier");
		const fVerifier = await get("FinalizeVerifier");
		const mHasher = await get("MockHasher");

		await deploy("Relayer", {
			from: deployer,
			args: [
				deployConfig[network.name].usdcContractAddress,
				deployConfig[network.name].wethContractAddress,
				dVerifier.address,
				wVerifier.address,
				sVerifier.address,
				fVerifier.address,
				mHasher.address,
				deployConfig[network.name].genericRouter,
				deployConfig[network.name].genericExecutor,
			]
		});
	}
};
export default func;