'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect } from 'wagmi'
import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, LogOut, User, Shield } from 'lucide-react'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { user, setUser, setConnected } = useAppStore()

  useEffect(() => {
    setConnected(isConnected)
    
    if (isConnected && address && !user) {
      // Mock user data - in real app, this would come from backend
      setUser({
        address,
        kycStatus: 'pending',
        totalAssets: 0,
        totalStaked: 0,
        totalRewards: 0
      })
    }
  }, [isConnected, address, user, setUser, setConnected])

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Wallet className="h-6 w-6" />
            Connect Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            Connect your wallet to access AIRA Finance
          </p>
          <ConnectButton />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Connected Wallet
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => disconnect()}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Disconnect
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Address:</span>
          <code className="text-xs bg-muted px-2 py-1 rounded">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </code>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">KYC Status:</span>
          <Badge 
            variant={user?.kycStatus === 'approved' ? 'default' : 'secondary'}
            className="flex items-center gap-1"
          >
            <Shield className="h-3 w-3" />
            {user?.kycStatus?.toUpperCase() || 'PENDING'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {user?.totalAssets || 0}
            </div>
            <div className="text-xs text-muted-foreground">Total Assets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {user?.totalStaked || 0}
            </div>
            <div className="text-xs text-muted-foreground">Staked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {user?.totalRewards || 0}
            </div>
            <div className="text-xs text-muted-foreground">Rewards</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
