import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers, network, run } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;

	const { deployer } = await getNamedAccounts();

    const vaultargs = []

	const Vault = await deploy('Vault', {
		from: deployer,
		args: [],
		log: true,
		autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
	});

	console.log(hashverifier.address)

    const relayerargs = []

	const Relayer = await deploy('Relayer', {
		from: deployer,
		args: ,
		log: true,
		autoMine: true,
	})
	// console.log('Verifying HashVerifier.... ')
	await run(`verify:verify`, {
		address: Vault.address,
		constructorArguments: vaultargs,
	});
	// console.log('Verifying HashVerifier.... ')
	await run(`verify:verify`, {
		address: Relayer.address,
		constructorArguments: relayerargs,
	});

};
export default func;
func.tags = ['HashiVerifier'];