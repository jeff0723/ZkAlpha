import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

type Props = {}

const frequecies = [
    'M',
    "D",
    "W"
]
const assetPairs = [
    'ETH/ USDX'
]
const CreateVaultPage = (props: Props) => {
    const [vaultName, setVaultName] = useState()
    const [frequency, setFrequency] = useState()
    const [assetPair, setAssetPair] = useState()
    const [modelHash, setModelHash] = useState()

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col gap-4'>
                <div className='text-center'>Create a vault</div>
                <div className='flex flex-col gap-3 rounded-md bg-[#121219] p-4 min-w-[600px]'>
                    <div>
                        Name
                    </div>

                    <input className='px-2 py-3 outline-0 bg-[#1b1b21] rounded-md'></input>
                    <div>
                        Frequency
                    </div>
                    <select id="frequency" name="frequency" className="block w-full px-2 py-3 outline-0 bg-[#1b1b21] rounded-md">
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>

                    <div>
                        Asset Pair
                    </div>
                    <select id="asset-pair" name="asset-pair" className="block w-full px-2 py-3 outline-0 bg-[#1b1b21] rounded-md">
                        <option value="WETH/USDC">WETH/USDC</option>
                        <option value="WBTC/USDC">WBTC/USDC</option>
                    </select>
                    <div>
                        Model Hash
                    </div>
                    <input className='px-2 py-3 outline-0 bg-[#1b1b21] rounded-md'></input>
                    <div className='pt-8 w-full'>
                        <button className='w-full p-4 rounded-md font-bold bg-white text-black hover:border-white hover:border-2 hover:bg-black hover:text-white'>
                            Create
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateVaultPage