import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { network } from "hardhat";
import { DEPLOY_CONFIG } from '../config/constants';
import { Relayer__factory } from '../typechain-types';
import { EventLog } from 'ethers';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
	const { deploy, get, run } = deployments;
	const { deployer } = await getNamedAccounts();
    const signer = await hre.ethers.getSigner(deployer);

	const deployConfig = DEPLOY_CONFIG as any;
	if (deployConfig[network.name]) {
        const relayerDeployment = await get("Relayer");
        console.log("Relayer:", relayerDeployment.address);
        const relayer = Relayer__factory.connect(relayerDeployment.address, signer);
        const tx = await relayer.uploadModel("0x9372c470eeadd5ecd9c3c74c2b3cb633f8e2f2fad799250a0f70d652b6b825e4");
        const receipt = await tx.wait();
        if (receipt) {
            const uploadModelEvent = receipt.logs[1] as EventLog;
            console.log("vault address:", uploadModelEvent.args[2]);
        }
    }
};
export default func;