import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className='flex flex-col justify-center items-center max-w-[800px] text-center'>
        <div>
          <h1 className='text-[100px] font-bold leading-none'>Alpha model on ZK.</h1>
          <p className='pt-4 text-[24px] font-thin'>
            Our platform is tailer-made for investors and traders, maximising DeFi returns.
          </p>
          <p className='pt-4 text-[24px] font-bold'>
            Unlock the potential of DeFi.
          </p>
        </div>
        <div className='flex gap-10 pt-10'>
          <button onClick={() => {
            router.push('/strategies')
          }} className='p-4 bg-white text-black rounded-lg font-bold hover:bg-opacity-30'>{"I'm an investor"}</button>
          <button 
           onClick={() => {
            router.push('/trader')
          }}
          className='p-4 border-2 bg-black border-white font-bold rounded-lg hover:bg-opacity-30 hover:bg-white'>{"I'm a trader"}</button>
        </div>
      </div>
    </main>
  )
}
