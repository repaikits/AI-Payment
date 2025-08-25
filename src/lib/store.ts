import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Asset {
  id: string
  name: string
  description: string
  estimatedValue: number
  tokenAmount: number
  tokenId: string
  owner: string
  createdAt: Date
  type: 'real_estate' | 'gold' | 'bonds' | 'other'
  status: 'pending' | 'approved' | 'rejected'
}

export interface StakingPosition {
  id: string
  tokenAmount: number
  stakedAmount: number
  rewards: number
  startDate: Date
  apy: number
}

export interface Order {
  id: string
  type: 'buy' | 'sell'
  tokenAmount: number
  price: number
  total: number
  status: 'pending' | 'filled' | 'cancelled'
  createdAt: Date
  user: string
}

export interface Transaction {
  id: string
  type: 'transfer' | 'stake' | 'unstake' | 'buy' | 'sell'
  amount: number
  from: string
  to: string
  status: 'pending' | 'success' | 'failed'
  hash: string
  timestamp: Date
}

export interface User {
  address: string
  kycStatus: 'pending' | 'approved' | 'rejected'
  totalAssets: number
  totalStaked: number
  totalRewards: number
}

interface AppState {
  // User state
  user: User | null
  isConnected: boolean
  
  // Assets
  assets: Asset[]
  selectedAsset: Asset | null
  
  // Staking
  stakingPositions: StakingPosition[]
  totalStaked: number
  totalRewards: number
  apy: number
  
  // Marketplace
  orders: Order[]
  marketPrice: number
  
  // Transactions
  transactions: Transaction[]
  
  // Actions
  setUser: (user: User | null) => void
  setConnected: (connected: boolean) => void
  addAsset: (asset: Asset) => void
  updateAsset: (id: string, updates: Partial<Asset>) => void
  setSelectedAsset: (asset: Asset | null) => void
  addStakingPosition: (position: StakingPosition) => void
  updateStakingPosition: (id: string, updates: Partial<StakingPosition>) => void
  setTotalStaked: (amount: number) => void
  setTotalRewards: (amount: number) => void
  setApy: (apy: number) => void
  addOrder: (order: Order) => void
  updateOrder: (id: string, updates: Partial<Order>) => void
  setMarketPrice: (price: number) => void
  addTransaction: (transaction: Transaction) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  clearState: () => void
}

const initialState = {
  user: null,
  isConnected: false,
  assets: [],
  selectedAsset: null,
  stakingPositions: [],
  totalStaked: 0,
  totalRewards: 0,
  apy: 12.5, // Default APY 12.5%
  orders: [],
  marketPrice: 1.0,
  transactions: []
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setUser: (user) => set({ user }),
      setConnected: (connected) => set({ isConnected: connected }),
      
      addAsset: (asset) => set((state) => ({ 
        assets: [...state.assets, asset] 
      })),
      
      updateAsset: (id, updates) => set((state) => ({
        assets: state.assets.map(asset => 
          asset.id === id ? { ...asset, ...updates } : asset
        )
      })),
      
      setSelectedAsset: (asset) => set({ selectedAsset: asset }),
      
      addStakingPosition: (position) => set((state) => ({
        stakingPositions: [...state.stakingPositions, position]
      })),
      
      updateStakingPosition: (id, updates) => set((state) => ({
        stakingPositions: state.stakingPositions.map(position =>
          position.id === id ? { ...position, ...updates } : position
        )
      })),
      
      setTotalStaked: (amount) => set({ totalStaked: amount }),
      setTotalRewards: (amount) => set({ totalRewards: amount }),
      setApy: (apy) => set({ apy }),
      
      addOrder: (order) => set((state) => ({
        orders: [...state.orders, order]
      })),
      
      updateOrder: (id, updates) => set((state) => ({
        orders: state.orders.map(order =>
          order.id === id ? { ...order, ...updates } : order
        )
      })),
      
      setMarketPrice: (price) => set({ marketPrice: price }),
      
      addTransaction: (transaction) => set((state) => ({
        transactions: [...state.transactions, transaction]
      })),
      
      updateTransaction: (id, updates) => set((state) => ({
        transactions: state.transactions.map(transaction =>
          transaction.id === id ? { ...transaction, ...updates } : transaction
        )
      })),
      
      clearState: () => set(initialState)
    }),
    {
      name: 'aira-finance-storage',
      partialize: (state) => ({
        user: state.user,
        assets: state.assets,
        stakingPositions: state.stakingPositions,
        orders: state.orders,
        transactions: state.transactions
      })
    }
  )
)
