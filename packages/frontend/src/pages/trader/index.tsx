import StrategyCard from '@/components/StrategyCard'
import React from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import styled from 'styled-components'
import { useRouter } from 'next/router'

type Props = {}
const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    flex-wrap: wrap;
    background-color: rgb(18, 18, 24);
    width: 290px;
    height:352px;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(18, 18, 24);
    border-image: initial;
    border-radius: 8px;
    padding:16px;
`
const TraderHomePage = (props: Props) => {
    const router = useRouter()
    return (
        <div className='flex justify-center items-center gap-10'>
            <StrategyCard address='0x1234' name='MA-200' assetPair='ETH/USDC' frequency='Monthly' active={true} performance={0.23} tvl={500000} isTrader={true} />
            <Card>
                <div className='flex flex-col gap-[12px]'>
                    <PlusIcon
                        className="h-14 w-14 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                    />
                    <div className='text-[16px] font-bold'>Create Alpha Vault</div>
                    <div className='text-sm text-gray-400'> Upload your alpha model and create a vault to earn commission</div>
                </div>
                <button
                    onClick={() => {
                        router.push('/trader/create')
                    }}
                    className='mt-14 w-full p-4 rounded-md font-bold bg-white text-black hover:border-white hover:border-2 hover:bg-black hover:text-white'>
                    Create
                </button>


            </Card>
        </div>
    )
}

export default TraderHomePage