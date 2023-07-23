
import { VAULT_ABI } from '@/constant/abis';
import { VAULT_ADDRESS } from '@/constant/address';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
export const deposit = async (amount: number): Promise<TransactionReceipt> => {

    // Prepare the transaction data
    const { request } = await prepareWriteContract({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: 'deposit',
        args: [amount]
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
export const withdraw = async (amount: number): Promise<TransactionReceipt> => {

    // Prepare the transaction data
    const { request } = await prepareWriteContract({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: 'withdraw',
        args: [amount]
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



