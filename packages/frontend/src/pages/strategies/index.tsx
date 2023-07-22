import React, { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import StrategyCard from '@/components/StrategyCard'

type Props = {}

const StrategyHomePage = (props: Props) => {
    const [depositAmount, setDepositAmount] = useState(0)
    const [withDrawAmount, setWithdrawAmount] = useState(0)
    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <div className='flex gap-3'>
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-700 bg-opacity-40 px-4 py-3 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        Strategy
                        <ChevronDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >

                        <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-[#121219] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className='p-4 hover:bg-opacity-20 hover:bg-gray-700'>
                                <Menu.Item >
                                    {({ active }) => (
                                        <div
                                        >
                                            Delta neutral
                                        </div>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className='p-4 hover:bg-opacity-20 hover:bg-gray-700'>
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                        >
                                            Smart beta
                                        </div>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-700 bg-opacity-40 px-4 py-3 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        Asset class
                        <ChevronDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-[#121219] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className='p-4 hover:bg-opacity-20 hover:bg-gray-700'>
                                <Menu.Item >
                                    {({ active }) => (
                                        <div
                                        >
                                            ETH
                                        </div>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className='p-4 hover:bg-opacity-20 hover:bg-gray-700'>
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                        >
                                            BTC
                                        </div>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <div className='pt-[40px]'>
                <StrategyCard address='0x1234' name='MA-200' assetPair='ETH/USDC' frequency='Monthly' active={true} performance={0.23} tvl={500000} isTrader={false} />
            </div>
        </div>
    )
}

export default StrategyHomePage