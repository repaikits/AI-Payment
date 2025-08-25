'use client'

import { useState } from 'react'
import { useAppStore, Transaction } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Send, 
  DollarSign, 
  Globe, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Plane,
  Car
} from 'lucide-react'

export default function PaymentsPage() {
  const { transactions, addTransaction, user } = useAppStore()
  const [isSending, setIsSending] = useState(false)
  
  const [formData, setFormData] = useState({
    recipientAddress: '',
    amount: '',
    currency: 'USDC',
    description: '',
    category: 'business'
  })

  const handleSendPayment = async () => {
    if (!formData.recipientAddress || !formData.amount || !user) return
    
    setIsSending(true)
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'transfer',
      amount: parseFloat(formData.amount),
      from: user.address,
      to: formData.recipientAddress,
      status: 'success',
      hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`,
      timestamp: new Date()
    }
    
    addTransaction(newTransaction)
    
    setFormData({
      recipientAddress: '',
      amount: '',
      currency: 'USDC',
      description: '',
      category: 'business'
    })
    
    setIsSending(false)
  }

  const stats = [
    {
      title: 'Total Sent',
      value: '$2.5M',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: ArrowUpRight,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Received',
      value: '$1.8M',
      change: '+8.7%',
      changeType: 'positive' as const,
      icon: ArrowDownRight,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Success Rate',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Avg. Fee',
      value: '$2.50',
      change: '-12%',
      changeType: 'negative' as const,
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ]

  const sovicoServices = [
    {
      name: 'Vietnam Airlines',
      icon: Plane,
      description: 'International flight payments',
      volume: '$850K',
      transactions: 1250
    },
    {
      name: 'Sovico Real Estate',
      icon: Building2,
      description: 'Property investment payments',
      volume: '$1.2M',
      transactions: 890
    },
    {
      name: 'Sovico Automotive',
      icon: Car,
      description: 'Vehicle import/export payments',
      volume: '$450K',
      transactions: 567
    }
  ]

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Global Payments
          </h1>
          <p className="text-gray-600 mt-2">
            Cross-border payments for Sovico Group ecosystem (40+ million users)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Globe className="h-3 w-3 mr-1" />
            Base Sepolia
          </Badge>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Send Payment Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recipientAddress">Recipient Address</Label>
                <Input
                  id="recipientAddress"
                  value={formData.recipientAddress}
                  onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                  placeholder="0x..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="ARWA">ARWA</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Payment description..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Network Fee:</span>
                  <span>$2.50</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span>~2 minutes</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${formData.amount ? (parseFloat(formData.amount) + 2.50).toFixed(2) : '0.00'}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleSendPayment} 
                disabled={isSending || !formData.recipientAddress || !formData.amount}
                className="w-full"
              >
                {isSending ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Payment
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sovico Services & Transactions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sovico Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Sovico Group Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sovicoServices.map((service) => (
                  <div key={service.name} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <service.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Volume:</span>
                        <span className="font-semibold">{service.volume}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transactions:</span>
                        <span className="font-semibold">{service.transactions}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>From/To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.slice(0, 10).map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(tx.status)}
                            <span className="capitalize">{tx.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${tx.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-mono text-xs">
                              {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                            </div>
                            <div className="text-gray-500">→</div>
                            <div className="font-mono text-xs">
                              {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(tx.status)}>
                            {tx.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{tx.timestamp.toLocaleDateString()}</div>
                            <div className="text-gray-500">{tx.timestamp.toLocaleTimeString()}</div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Send className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No transactions yet</p>
                  <p className="text-sm">Send your first payment to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* KYC Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Compliance & KYC Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Identity Verified</h3>
              <p className="text-sm text-gray-600">Your identity has been verified for international payments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Global Access</h3>
              <p className="text-sm text-gray-600">Send payments to 150+ countries worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Sovico Integration</h3>
              <p className="text-sm text-gray-600">Seamless integration with Sovico Group services</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
