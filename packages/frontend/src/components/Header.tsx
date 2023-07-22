import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';

type Props = {}

const Header = (props: Props) => {
    return (
        <div className='p-4 flex w-full justify-between'>
            <div className='font-bold'>ZKAlpha</div>
            <ConnectButton />
        </div>
    )
}

export default Header