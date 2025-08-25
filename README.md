# AIRA Finance - Blockchain for Finance

A comprehensive DeFi application built for **Sovico Group** that combines **Real-World Asset (RWA) Tokenization** with **Global Cross-Border Payments**. Built with Next.js, TypeScript, Wagmi, and Viem on Base Sepolia testnet.

## 🚀 Features

### 1. RWA Tokenization (OLYM3DAO Style)
- **Asset Tokenization**: Tokenize real-world assets (real estate, gold, bonds)
- **Fractional Ownership**: Enable fractional ownership of high-value assets
- **KYC Integration**: Built-in KYC verification for compliance
- **Asset Management**: Complete lifecycle management of tokenized assets

### 2. Staking & Lending
- **Staking Rewards**: Stake RWA tokens to earn APY (12.5% default)
- **Lending Platform**: Borrow against your tokenized assets
- **LTV Management**: 75% Loan-to-Value ratio with liquidation protection
- **Auto Settlement**: Automatic reward distribution and settlement

### 3. P2P Marketplace
- **Order Book**: DEX-style order book for RWA token trading
- **P2P Trading**: Direct peer-to-peer trading between investors
- **Market Analytics**: Real-time price feeds and trading volume
- **Order Management**: Complete order lifecycle management

### 4. Global Payments (Sovico Integration)
- **Cross-Border Payments**: Send payments to 150+ countries
- **Sovico Services**: Integration with Vietnam Airlines, Real Estate, Automotive
- **Multi-Currency**: Support for USDC, USDT, ARWA, ETH
- **Low Fees**: $2.50 average transaction fee
- **Fast Settlement**: ~2 minute processing time

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **UI Components**: ShadCN UI, Lucide React Icons
- **Blockchain**: Wagmi, Viem, RainbowKit
- **State Management**: Zustand with persistence
- **Network**: Base Sepolia testnet
- **Wallets**: WalletConnect, Coinbase Wallet, Safe Wallet

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Dashboard
│   ├── rwa/               # RWA Tokenization
│   ├── staking/           # Staking & Lending
│   ├── marketplace/       # P2P Trading
│   ├── payments/          # Global Payments
│   └── providers.tsx      # Wagmi & RainbowKit providers
├── components/
│   ├── ui/               # ShadCN UI components
│   ├── Layout.tsx        # Main layout with navigation
│   ├── WalletConnect.tsx # Wallet connection component
│   └── TokenCard.tsx     # RWA token display card
└── lib/
    ├── wagmi.ts          # Wagmi configuration
    ├── contracts.ts      # Smart contract ABIs & addresses
    ├── store.ts          # Zustand state management
    └── utils.ts          # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask or other Web3 wallet
- Base Sepolia testnet configured

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd aira-finance
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env.local` file:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

**Important**: You must get a WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/) for the wallet connection to work properly. The build will show a 403 error if this is not configured correctly.

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### WalletConnect Setup (Required)
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy your Project ID
4. Add it to your `.env.local` file as `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id`

**Note**: Without a valid WalletConnect Project ID, the wallet connection features will not work and you'll see 403 errors in the console.

### Base Sepolia Testnet
- **Network Name**: Base Sepolia
- **RPC URL**: https://sepolia.base.org
- **Chain ID**: 84532
- **Currency Symbol**: ETH
- **Block Explorer**: https://sepolia.basescan.org

### Smart Contracts
The application includes placeholder contract addresses. For production:
1. Deploy RWA Token contract (ERC20)
2. Deploy Staking contract
3. Deploy Marketplace contract
4. Update addresses in `src/lib/contracts.ts`

## 📱 Usage Guide

### 1. Connect Wallet
- Click "Connect Wallet" in the header
- Choose from WalletConnect, Coinbase Wallet, or Safe Wallet
- Ensure you're connected to Base Sepolia testnet

### 2. RWA Tokenization
- Navigate to "RWA Tokenization"
- Click "Tokenize Asset" to create new asset
- Fill in asset details (name, description, value, type)
- Submit for approval (KYC required)

### 3. Staking & Lending
- Go to "Staking & Lending"
- Stake your RWA tokens to earn rewards
- Borrow against your assets (75% LTV)
- Monitor your positions and rewards

### 4. P2P Trading
- Visit "Marketplace"
- Place buy/sell orders
- View order book and recent trades
- Execute trades with other users

### 5. Global Payments
- Navigate to "Global Payments"
- Send cross-border payments
- Choose currency and recipient
- Monitor transaction status

## 🎯 Key Features for Sovico Group

### Aviation Integration
- Vietnam Airlines payment processing
- International flight booking payments
- Multi-currency settlement

### Real Estate
- Property investment tokenization
- Fractional ownership of high-value properties
- Cross-border property payments

### Automotive
- Vehicle import/export payments
- Supply chain financing
- Trade finance solutions

## 🔒 Security & Compliance

- **KYC/AML**: Built-in identity verification
- **Multi-Sig**: Safe Wallet integration for corporate accounts
- **Audit Trail**: Complete transaction history
- **Regulatory Compliance**: Designed for financial regulations

## 🚀 Deployment

### Vercel Deployment
```bash
npm run build
npm run start
```

### Environment Variables for Production
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_production_project_id
NEXT_PUBLIC_BASE_MAINNET_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_CONTRACT_ADDRESSES={"RWA_TOKEN":"0x...","STAKING":"0x..."}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Roadmap

- [ ] Smart contract deployment scripts
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Additional blockchain networks
- [ ] AI-powered risk assessment
- [ ] Institutional features

---

**Built for Sovico Group - Blockchain for Finance: Digital Assets & Global Payments**
