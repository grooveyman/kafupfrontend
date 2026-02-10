'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { Package, ArrowRight } from 'lucide-react'

export default function OrdersPage() {
  const { user } = useAuth()

  const orders = [
    {
      id: 'ORD-001',
      date: '2025-01-15',
      items: 'Emerald Dream Gown',
      total: 450,
      status: 'Delivered',
    },
    {
      id: 'ORD-002',
      date: '2025-01-10',
      items: 'Midnight Elegance, Classic Elegance',
      total: 720,
      status: 'Shipped',
    },
    {
      id: 'ORD-003',
      date: '2024-12-28',
      items: 'Sunset Silhouette',
      total: 380,
      status: 'Delivered',
    },
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Card className="text-center p-8">
            <p className="text-lg font-medium mb-4">Please sign in to view your orders</p>
            <Link href="/signin">
              <Button>Sign In</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-balance text-4xl font-bold tracking-tight">Your Orders</h1>
          <p className="mt-2 text-muted-foreground">Track and manage all your purchases</p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-6 border-border hover:border-accent/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Package className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.items}</p>
                    <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">${order.total}</p>
                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No orders yet</p>
            <Link href="/shop">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
