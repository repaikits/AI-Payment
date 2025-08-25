'use client'

import { useState } from 'react'
import { useAppStore, StakingPosition } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Plus,
  Minus,
  Coins,
  Calendar,
  Percent,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function StakingPage() {
  const { 
    stakingPositions, 
    totalStaked, 
    totalRewards, 
    apy, 
    addStakingPosition,
    updateStakingPosition,
    user 
  } = useAppStore()
  
  const [isStakeDialogOpen, setIsStakeDialogOpen] = useState(false)
  const [isUnstakeDialogOpen, setIsUnstakeDialogOpen] = useState(false)
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [selectedPosition, setSelectedPosition] = useState<StakingPosition | null>(null)

  const handleStake = () => {
    if (!stakeAmount || !user) return
    
    const newPosition: StakingPosition = {
      id: Date.now().toString(),
      tokenAmount: parseFloat(stakeAmount),
      stakedAmount: parseFloat(stakeAmount),
      rewards: 0,
      startDate: new Date(),
      apy: apy
    }
    
    addStakingPosition(newPosition)
    setStakeAmount('')
    setIsStakeDialogOpen(false)
  }

  const handleUnstake = () => {
    if (!unstakeAmount || !selectedPosition) return
    
    const unstakeValue = parseFloat(unstakeAmount)
    const newStakedAmount = selectedPosition.stakedAmount - unstakeValue
    
    updateStakingPosition(selectedPosition.id, {
      stakedAmount: newStakedAmount,
      rewards: selectedPosition.rewards + (unstakeValue * 0.1) // 10% reward
    })
    
    setUnstakeAmount('')
    setSelectedPosition(null)
    setIsUnstakeDialogOpen(false)
  }

  const stats = [
    {
      title: 'Total Staked',
      value: `$${totalStaked.toLocaleString()}`,
      change: '+8.5%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Rewards',
      value: `$${totalRewards.toLocaleString()}`,
      change: '+15.2%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Current APY',
      value: `${apy}%`,
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: Percent,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Positions',
      value: stakingPositions.length,
      change: '+3',
      changeType: 'positive' as const,
      icon: Coins,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const lendingStats = [
    {
      title: 'Total Borrowed',
      value: '$125,000',
      change: '+12.3%',
      changeType: 'positive' as const,
      icon: ArrowUpRight,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Available Credit',
      value: '$375,000',
      change: '+5.7%',
      changeType: 'positive' as const,
      icon: ArrowDownRight,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Interest Rate',
      value: '8.5%',
      change: '-0.5%',
      changeType: 'negative' as const,
      icon: Percent,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'LTV Ratio',
      value: '75%',
      change: '+2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Staking & Lending
          </h1>
          <p className="text-gray-600 mt-2">
            Stake your RWA tokens to earn rewards and borrow against your assets
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isStakeDialogOpen} onOpenChange={setIsStakeDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Stake Tokens
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Stake RWA Tokens</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="stakeAmount">Amount to Stake (ARWA)</Label>
                  <Input
                    id="stakeAmount"
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="1000"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p>Current APY: {apy}%</p>
                  <p>Estimated monthly reward: ${stakeAmount ? (parseFloat(stakeAmount) * apy / 100 / 12).toFixed(2) : '0'}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleStake} className="flex-1">
                    Stake Tokens
                  </Button>
                  <Button variant="outline" onClick={() => setIsStakeDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="staking" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="lending">Lending</TabsTrigger>
        </TabsList>

        <TabsContent value="staking" className="space-y-6">
          {/* Staking Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Staking Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {apy}%
                  </div>
                  <div className="text-sm text-gray-600">Current APY</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    ${totalStaked.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Staked</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">
                    ${totalRewards.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Rewards</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Staking Progress</span>
                  <span className="font-medium">
                    {totalStaked > 0 ? Math.round((totalStaked / 100000) * 100) : 0}%
                  </span>
                </div>
                <Progress 
                  value={totalStaked > 0 ? Math.round((totalStaked / 100000) * 100) : 0} 
                  className="h-2" 
                />
              </div>
            </CardContent>
          </Card>

          {/* Staking Positions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  Active Staking Positions
                </div>
                <Badge variant="secondary">
                  {stakingPositions.length} positions
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stakingPositions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position ID</TableHead>
                      <TableHead>Staked Amount</TableHead>
                      <TableHead>Rewards</TableHead>
                      <TableHead>APY</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stakingPositions.map((position) => (
                      <TableRow key={position.id}>
                        <TableCell className="font-mono text-sm">
                          #{position.id.slice(-6)}
                        </TableCell>
                        <TableCell>
                          ${position.stakedAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-green-600">
                          ${position.rewards.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{position.apy}%</Badge>
                        </TableCell>
                        <TableCell>
                          {position.startDate.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Dialog open={isUnstakeDialogOpen} onOpenChange={setIsUnstakeDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedPosition(position)}
                              >
                                <Minus className="h-4 w-4 mr-1" />
                                Unstake
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Unstake Tokens</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="unstakeAmount">Amount to Unstake (ARWA)</Label>
                                  <Input
                                    id="unstakeAmount"
                                    type="number"
                                    value={unstakeAmount}
                                    onChange={(e) => setUnstakeAmount(e.target.value)}
                                    placeholder="1000"
                                    max={selectedPosition?.stakedAmount.toString()}
                                  />
                                </div>
                                <div className="text-sm text-gray-600">
                                  <p>Available to unstake: ${selectedPosition?.stakedAmount.toLocaleString()}</p>
                                  <p>Current rewards: ${selectedPosition?.rewards.toFixed(2)}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button onClick={handleUnstake} className="flex-1">
                                    Unstake Tokens
                                  </Button>
                                  <Button variant="outline" onClick={() => setIsUnstakeDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No active staking positions</p>
                  <Button className="mt-4" onClick={() => setIsStakeDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Start Staking
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lending" className="space-y-6">
          {/* Lending Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lendingStats.map((stat) => (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-600 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Lending Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Lending Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Borrow Against Your Assets</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Collateral Value</span>
                      <span className="font-medium">$500,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Borrowing Power (75% LTV)</span>
                      <span className="font-medium text-green-600">$375,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Currently Borrowed</span>
                      <span className="font-medium text-red-600">$125,000</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Available to Borrow</span>
                      <span className="text-green-600">$250,000</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Borrow Funds
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Lending Terms</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Interest Rate</span>
                      <span className="font-medium">8.5% APR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loan-to-Value (LTV)</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minimum Loan</span>
                      <span className="font-medium">$1,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maximum Loan</span>
                      <span className="font-medium">$250,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Liquidation Threshold</span>
                      <span className="font-medium text-red-600">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Loans */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Active Loans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No active loans</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Apply for Loan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
