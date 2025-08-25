'use client'

import { useAppStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Building2, 
  TrendingUp, 
  ShoppingCart, 
  Send, 
  DollarSign,
  Users,
  Globe,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { user, assets, totalStaked, totalRewards, apy, orders, transactions } = useAppStore()

  const stats = [
    {
      title: 'Total Assets',
      value: assets.length,
      change: '+12%',
      changeType: 'positive' as const,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
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
      title: 'Active Orders',
      value: orders.filter(o => o.status === 'pending').length,
      change: '-3%',
      changeType: 'negative' as const,
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const recentAssets = assets.slice(0, 3)
  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to AIRA Finance
          </h1>
          <p className="text-gray-600 mt-2">
            Blockchain for Finance: Digital Assets & Global Payments
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/rwa">
              <Building2 className="h-4 w-4 mr-2" />
              Tokenize Asset
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/payments">
              <Send className="h-4 w-4 mr-2" />
              Send Payment
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Staking Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Staking Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current APY</span>
                <Badge variant="secondary" className="text-lg font-bold">
                  {apy}%
                </Badge>
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
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Total Staked</div>
                  <div className="font-semibold">${totalStaked.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-600">Total Rewards</div>
                  <div className="font-semibold text-green-600">${totalRewards.toLocaleString()}</div>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="/staking">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Manage Staking
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Assets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Recent Assets
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/rwa">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentAssets.length > 0 ? (
                <div className="space-y-4">
                  {recentAssets.map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-sm text-gray-600">
                            ${asset.estimatedValue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Badge variant={asset.status === 'approved' ? 'default' : 'secondary'}>
                        {asset.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No assets tokenized yet</p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link href="/rwa">Tokenize Your First Asset</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Network Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Network Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Base Sepolia</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Block Height</span>
                <span className="text-sm font-mono">#12,345,678</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Gas Price</span>
                <span className="text-sm">0.001 ETH</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentTransactions.length > 0 ? (
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between text-sm">
                      <div>
                        <div className="font-medium capitalize">{tx.type}</div>
                        <div className="text-gray-600">
                          {tx.amount.toLocaleString()} ARWA
                        </div>
                      </div>
                      <Badge 
                        variant={tx.status === 'success' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {tx.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <Send className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No recent transactions</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Platform Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Users</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Volume</span>
                <span className="font-semibold">$2.5M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Orders</span>
                <span className="font-semibold">{orders.filter(o => o.status === 'pending').length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
