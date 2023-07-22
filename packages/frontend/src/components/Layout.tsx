import React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Header'), { suspense: true });

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const router = useRouter()
    const isNotLandingPage = router.pathname !== '/'
    return (
        <>
            {isNotLandingPage && <Header />}
            {children}
        </>
    )
}

export default Layout