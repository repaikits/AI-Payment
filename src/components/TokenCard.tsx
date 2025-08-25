'use client'

import { Asset } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Building2, 
  Coins, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Eye,
  Share2
} from 'lucide-react'

interface TokenCardProps {
  asset: Asset
  onView?: (asset: Asset) => void
  onStake?: (asset: Asset) => void
  onTrade?: (asset: Asset) => void
}

const getAssetIcon = (type: Asset['type']) => {
  switch (type) {
    case 'real_estate':
      return <Building2 className="h-5 w-5" />
    case 'gold':
      return <Coins className="h-5 w-5" />
    case 'bonds':
      return <TrendingUp className="h-5 w-5" />
    default:
      return <DollarSign className="h-5 w-5" />
  }
}

const getStatusColor = (status: Asset['status']) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-yellow-100 text-yellow-800'
  }
}

export function TokenCard({ asset, onView, onStake, onTrade }: TokenCardProps) {
  const tokenizationProgress = asset.status === 'approved' ? 100 : 
                              asset.status === 'pending' ? 60 : 0

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getAssetIcon(asset.type)}
            <CardTitle className="text-lg">{asset.name}</CardTitle>
          </div>
          <Badge className={getStatusColor(asset.status)}>
            {asset.status.toUpperCase()}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {asset.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Tokenization Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Tokenization Progress</span>
            <span className="font-medium">{tokenizationProgress}%</span>
          </div>
          <Progress value={tokenizationProgress} className="h-2" />
        </div>

        {/* Asset Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              <span>Estimated Value</span>
            </div>
            <div className="font-semibold">
              ${asset.estimatedValue.toLocaleString()}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Coins className="h-3 w-3" />
              <span>Token Amount</span>
            </div>
            <div className="font-semibold">
              {asset.tokenAmount.toLocaleString()} ARWA
            </div>
          </div>
        </div>

        {/* Token ID */}
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Calendar className="h-3 w-3" />
            <span>Token ID</span>
          </div>
          <code className="text-xs bg-muted px-2 py-1 rounded block truncate">
            {asset.tokenId}
          </code>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {onView && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onView(asset)}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          )}
          
          {asset.status === 'approved' && onStake && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStake(asset)}
              className="flex-1"
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Stake
            </Button>
          )}
          
          {asset.status === 'approved' && onTrade && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onTrade(asset)}
              className="flex-1"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Trade
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
