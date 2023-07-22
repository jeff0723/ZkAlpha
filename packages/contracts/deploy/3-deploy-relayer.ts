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
		const getCoins = async () => {
			if (network.name === "hardhat") {
				const usdc = await get("MockUSDC");
				const weth = await get("MockWETH");
				return [usdc.address, weth.address];
			} else {
				return [
					deployConfig[network.name].usdcContractAddress,
					deployConfig[network.name].wethContractAddress,
				];
			}
		};
		const [usdcAddr, wethAddr] = await getCoins();

		const dVerifier = await get("DepositVerifier");
		const wVerifier = await get("WithdrawVerifier");
		const sVerifier = await get("SwapVerifier");
		const fVerifier = await get("FinalizeVerifier");
		const mHasher = await get("MockHasher");

		await deploy("Relayer", {
			from: deployer,
			args: [
				usdcAddr,
				wethAddr,
				dVerifier.address,
				wVerifier.address,
				sVerifier.address,
				fVerifier.address,
				mHasher.address,
			]
		})		
	}
};
export default func;