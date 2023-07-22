import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
type Props = {
    address: string
    name: string
    frequency: string
    assetPair: string
    performance: number
    tvl: number
    active: boolean
    isTrader:boolean
}
const Card = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: rgb(18, 18, 24);
    width: 290px;
    position: relative;
    height: 100%;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(18, 18, 24);
    border-image: initial;
    border-radius: 8px;
    transition: box-shadow 0.25s ease-out 0s, border 0.25s ease-out 0s;
   
    &:hover {
        border:2px solid rgb(255, 255, 255);
        box-shadow: rgba(255, 255, 255, 0.4) 0px 0px 70px;
    }
   
`
function StrategyCard({ address, name, frequency, assetPair, tvl, performance, active,isTrader}: Props) {
    const router = useRouter()
    return (
        <Card onClick={() => {
            if(isTrader){
                router.push(`/trader/strategies/${address}`)
            }else{
                router.push(`/strategies/${address}`)
            }
        
        }}>
            <div className='flex flex-col'>
                <div className='px-[16px] py-[24px] rounded-t-[8px] flex justify-between bg-gray-700 bg-opacity-50'>
                    <div className='font-bold'> {name} </div>
                    {active ?
                        <div className='py-1 px-2 rounded-lg bg-teal-500 text-sm'>
                            Active
                        </div> :
                        <div className='py-1 px-2 rounded-lg bg-pink-500 text-sm'>
                            Closed
                        </div>
                    }

                </div>
                <div className='py-10 flex flex-col justify-center items-center'>
                    <div className='text-2xl font-bold'>25.96%</div>
                    <div className='text-sm text-gray-400'>Historical performance</div>
                </div>
                <div className='p-[16px]'>
                    <div className='pb-4 text-sm text-gray-400'>
                        Frequency:
                        {frequency}
                    </div>
                    <div className='pb-4 text-sm text-gray-400'>
                        Asset: {assetPair}
                    </div>
                    <div className='pb-4 text-sm text-gray-400'>
                        TVL: ${tvl}
                    </div>
                </div>
            </div>
        </Card>

    )
}

export default StrategyCard