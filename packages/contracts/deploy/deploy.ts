import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers, network, run } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;

	const { deployer } = await getNamedAccounts();

    /**
     *  ERC20 _asset,
        string memory _name,
        string memory _symbol,
        address _strategist,
        address _relayer,
        uint _openDuration,
        uint _strategyDuration,
        uint _withdrawalDuration,
        bytes32 _modelHash,
        address _oneInchAddress;
     */

	

    const vaultargs = [, "vault", "VAL", 
    "0xfa04032c159aE60d53d34d3811406Fb53E5A3215", "0xfa04032c159aE60d53d34d3811406Fb53E5A3215", 
    3600, 3600, 3600, "0xfa04032c159aE60d53d34d3811406Fb53E5A3215", "0x1111111254EEB25477B68fb85Ed929f73A960582"]

	const Vault = await deploy('Vault', {
		from: deployer,
		args: vaultargs,
		log: true,
		autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
	});

	console.log(Vault.address)

    // const relayerargs = []

	// const Relayer = await deploy('Relayer', {
	// 	from: deployer,
	// 	args: ,
	// 	log: true,
	// 	autoMine: true,
	// })
	// // console.log('Verifying HashVerifier.... ')
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