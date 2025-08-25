'use client'

import { useState } from 'react'
import { useAppStore, Order } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  Eye,
  DollarSign,
  Coins,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function MarketplacePage() {
  const { orders, addOrder, marketPrice, user } = useAppStore()
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false)
  const [isSellDialogOpen, setIsSellDialogOpen] = useState(false)
  const [buyAmount, setBuyAmount] = useState('')
  const [sellAmount, setSellAmount] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [sellPrice, setSellPrice] = useState('')

  const handleBuyOrder = () => {
    if (!buyAmount || !buyPrice || !user) return
    
    const newOrder: Order = {
      id: Date.now().toString(),
      type: 'buy',
      tokenAmount: parseFloat(buyAmount),
      price: parseFloat(buyPrice),
      total: parseFloat(buyAmount) * parseFloat(buyPrice),
      status: 'pending',
      createdAt: new Date(),
      user: user.address
    }
    
    addOrder(newOrder)
    setBuyAmount('')
    setBuyPrice('')
    setIsBuyDialogOpen(false)
  }

  const handleSellOrder = () => {
    if (!sellAmount || !sellPrice || !user) return
    
    const newOrder: Order = {
      id: Date.now().toString(),
      type: 'sell',
      tokenAmount: parseFloat(sellAmount),
      price: parseFloat(sellPrice),
      total: parseFloat(sellAmount) * parseFloat(sellPrice),
      status: 'pending',
      createdAt: new Date(),
      user: user.address
    }
    
    addOrder(newOrder)
    setSellAmount('')
    setSellPrice('')
    setIsSellDialogOpen(false)
  }

  const buyOrders = orders.filter(order => order.type === 'buy' && order.status === 'pending')
  const sellOrders = orders.filter(order => order.type === 'sell' && order.status === 'pending')
  const userOrders = orders.filter(order => order.user === user?.address)

  const stats = [
    {
      title: 'Market Price',
      value: `$${marketPrice.toFixed(2)}`,
      change: '+2.5%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: '24h Volume',
      value: '$125,000',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Orders',
      value: orders.filter(o => o.status === 'pending').length,
      change: '+8',
      changeType: 'positive' as const,
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Total Trades',
      value: orders.filter(o => o.status === 'filled').length,
      change: '+12',
      changeType: 'positive' as const,
      icon: Coins,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            P2P Marketplace
          </h1>
          <p className="text-gray-600 mt-2">
            Trade RWA tokens with other investors in a decentralized marketplace
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isBuyDialogOpen} onOpenChange={setIsBuyDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Buy Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Place Buy Order</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="buyAmount">Amount (ARWA)</Label>
                  <Input
                    id="buyAmount"
                    type="number"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label htmlFor="buyPrice">Price per Token (USD)</Label>
                  <Input
                    id="buyPrice"
                    type="number"
                    step="0.01"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    placeholder="1.25"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p>Total: ${buyAmount && buyPrice ? (parseFloat(buyAmount) * parseFloat(buyPrice)).toFixed(2) : '0'}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleBuyOrder} className="flex-1 bg-green-600 hover:bg-green-700">
                    Place Buy Order
                  </Button>
                  <Button variant="outline" onClick={() => setIsBuyDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isSellDialogOpen} onOpenChange={setIsSellDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                <Plus className="h-4 w-4 mr-2" />
                Sell Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Place Sell Order</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sellAmount">Amount (ARWA)</Label>
                  <Input
                    id="sellAmount"
                    type="number"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label htmlFor="sellPrice">Price per Token (USD)</Label>
                  <Input
                    id="sellPrice"
                    type="number"
                    step="0.01"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    placeholder="1.30"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p>Total: ${sellAmount && sellPrice ? (parseFloat(sellAmount) * parseFloat(sellPrice)).toFixed(2) : '0'}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSellOrder} className="flex-1 bg-red-600 hover:bg-red-700">
                    Place Sell Order
                  </Button>
                  <Button variant="outline" onClick={() => setIsSellDialogOpen(false)}>
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
                <span className="text-sm text-gray-600 ml-1">from last 24h</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="orderbook" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orderbook">Order Book</TabsTrigger>
          <TabsTrigger value="trades">Recent Trades</TabsTrigger>
          <TabsTrigger value="my-orders">My Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="orderbook" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sell Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <TrendingDown className="h-5 w-5" />
                  Sell Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sellOrders.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Price (USD)</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sellOrders.slice(0, 10).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium text-red-600">
                            ${order.price.toFixed(2)}
                          </TableCell>
                          <TableCell>{order.tokenAmount.toLocaleString()}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Buy
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <TrendingDown className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p>No sell orders</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Buy Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="h-5 w-5" />
                  Buy Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {buyOrders.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Price (USD)</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {buyOrders.slice(0, 10).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium text-green-600">
                            ${order.price.toFixed(2)}
                          </TableCell>
                          <TableCell>{order.tokenAmount.toLocaleString()}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                              Sell
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p>No buy orders</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trades" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Recent Trades
              </CardTitle>
            </CardHeader>
            <CardContent>
              {orders.filter(o => o.status === 'filled').length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.filter(o => o.status === 'filled').slice(0, 20).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Badge variant={order.type === 'buy' ? 'default' : 'secondary'}>
                            {order.type.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>${order.price.toFixed(2)}</TableCell>
                        <TableCell>{order.tokenAmount.toLocaleString()}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>{order.createdAt.toLocaleTimeString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent trades</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                My Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userOrders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Badge variant={order.type === 'buy' ? 'default' : 'secondary'}>
                            {order.type.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>${order.price.toFixed(2)}</TableCell>
                        <TableCell>{order.tokenAmount.toLocaleString()}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={order.status === 'filled' ? 'default' : 'secondary'}
                            className={order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                          >
                            {order.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.createdAt.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No orders yet</p>
                  <div className="flex gap-2 justify-center mt-4">
                    <Button onClick={() => setIsBuyDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                      Place Buy Order
                    </Button>
                    <Button onClick={() => setIsSellDialogOpen(true)} variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                      Place Sell Order
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
