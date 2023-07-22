import { useRouter } from 'next/router'
import path from 'path'
import React from 'react'
import { styled } from 'styled-components'

type Props = {}

const StartegyPage = (props: Props) => {
    const router = useRouter()
    const { pathname, query } = router
    return (
        <div className='w-full flex flex-col'>
            <div className='w-full h-[8px] bg-gradient-to-r from-white ' />
            <div className='flex justify-center items-center  py-[40px] px-[60px] w-1/2'>
                <div className='flex flex-col gap-4 w-full'>

                    <div className='text-[56px]'>MA-200</div>
                    <div className='flex'>
                        <div className='text-md text-gray-400'>
                            Frequency: Monthly
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='text-md text-gray-400'>
                            Current Vault Deposit
                        </div>
                        <div>100K ETH</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400 dark:bg-opacity-30">
                        <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='text-md text-gray-400'>
                            Max Vault Capacity
                        </div>
                        <div>100K ETH</div>
                    </div>

                </div>
            </div>
            <div className='w-full h-[8px] bg-gradient-to-l from-white ' />
            <div className='flex w-full py-[40px] px-[60px]'>
                <div className='flex w-1/2 '>
                    <div className='flex flex-col gap-[16px] text-[18px]'>
                        <div>
                            Vault strategy
                        </div>
                        <div className='text-gray-400'>
                            This strategy buy and sell ETH based on the 200-day moving average.
                            Rebalance every 30 days.
                        </div>

                    </div>
                </div>
                <div className='flex w-1/2 justify-center'>
                    <div className='flex flex-col w-[400px] bg-[#121219] rounded-lg'>
                        <div className='flex rounded-t-lg'>
                            <div className='flex w-1/2 justify-center cursor-pointer py-[24px]'>
                                Deposit
                            </div>
                            <div className='flex w-1/2 justify-center cursor-pointer py-[24px]'>
                                Withdraw
                            </div>
                        </div>
                        <div className='flex flex-col p-[24px] gap-5'>
                            <div className='text-sm text-gray-400'>
                                Amount
                            </div>
                            <input value={0} className='p-4 rounded-md outline-0 bg-[#1b1b21] focus:border-none'></input>
                            <div className='flex justify-between'>
                                <div className='text-sm text-gray-400'>
                                    Wallet Balance
                                </div>
                                <div className='text-sm'>
                                    0 ETH
                                </div>
                            </div>
                            <button className='p-4 rounded-md bg-gray-400'> Deposit</button>
                        </div>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default StartegyPage