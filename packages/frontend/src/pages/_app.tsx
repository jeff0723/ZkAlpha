
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '@/state';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, aurora, gnosis } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Layout from '@/components/Layout';



const { chains, publicClient } = configureChains(
  [gnosis, aurora, mainnet, polygon, optimism, arbitrum],
  [
    publicProvider()
  ]
);

const projectId = 'd70627db8863f52dd98dafa4550cf646';

const { wallets } = getDefaultWallets({
  appName: 'ZKAlpha',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'ZKAlpha',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})
export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider theme={midnightTheme()} chains={chains} appInfo={demoAppInfo}>

          <Layout>
            <Component {...pageProps} />
          </Layout>

        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>)
}
