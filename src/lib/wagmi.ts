import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { baseSepolia } from 'wagmi/chains'
import { walletConnectWallet, coinbaseWallet, safeWallet } from '@rainbow-me/rainbowkit/wallets'

// Use environment variable for project ID, with fallback for development
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID'

const wallets = [
  {
    groupName: 'Popular',
    wallets: [
      walletConnectWallet,
      coinbaseWallet,
      safeWallet
    ]
  }
]

export const config = getDefaultConfig({
  appName: 'AIRA Finance',
  projectId,
  chains: [baseSepolia],
  wallets,
  ssr: true,
})
