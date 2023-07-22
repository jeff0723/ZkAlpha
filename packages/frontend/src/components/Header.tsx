import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router'

type Props = {}

const Header = (props: Props) => {
    const router = useRouter()
    return (
        <div className='p-4 flex w-full justify-between'>
            <div className='font-bold text-[24px] cursor-pointer' onClick={() => {
                router.push('/')
            }}>ZKAlpha</div>
            <ConnectButton />
        </div>
    )
}

export default Header