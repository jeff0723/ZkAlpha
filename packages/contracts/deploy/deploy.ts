import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { network, run } from "hardhat";
import { ethers } from "ethers"
import { erc20abi } from "../abis/erc20-abi.js"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;

	const { deployer } = await getNamedAccounts();

	console.log(network.name)

	// get the RPC URL for that network
	const provider = ethers.getDefaultProvider()
	console.log(provider)

	/**
	 *  ERC20 _tokenA,
        ERC20 _tokenB,
        IDepositVerifier _depositVerifier,
        IWithdrawVerifier _withdrawVerifier,
        ISwapVerifier _swapVerifier,
        IFinalizeVerifier _finalizeVerifier,
        IHasher _hasher
	 */


	const vaultargs = []

	const Vault = await deploy('Vault', {
		from: deployer,
		args: vaultargs,
		log: true,
		autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
	});

	console.log(Vault.address)

   console.log('Verifying Relayer.... ')
	await run(`verify:verify`, {
		address: Vault.address,
		constructorArguments: vaultargs,
	});
	// console.log('Verifying HashVerifier.... ')
	// await run(`verify:verify`, {
	// 	address: Relayer.address,
	// 	constructorArguments: relayerargs,
	// });

};
export default func;