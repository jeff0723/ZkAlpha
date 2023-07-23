
import { RELAYER_ABI } from '@/constant/abis';
import { RELAYER_ADDRESS } from '@/constant/address';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
export const createVault = async (modelCommitmentHash: string): Promise<TransactionReceipt> => {

    // Prepare the transaction data
    const { request } = await prepareWriteContract({
        address: RELAYER_ADDRESS,
        abi: RELAYER_ABI,
        functionName: 'uploadModel',
        args: [modelCommitmentHash]
    });

    // Execute the transaction
    const { hash, } = await writeContract(request)


    // Wait for the transaction block to be mined
    const data = await waitForTransaction({
        hash,
    })
    //@ts-ignore
    return data;
}