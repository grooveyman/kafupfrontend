'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { Plus, TrendingUp, ShoppingBag, Users } from 'lucide-react'
import { useState } from 'react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, role } = useAuth()
  const [products] = useState([
    { id: 1, name: 'Summer Collection 2025', price: 299, status: 'Published', sales: 45 },
    { id: 2, name: 'Minimalist Basics', price: 149, status: 'Draft', sales: 0 },
    { id: 3, name: 'Evening Wear', price: 599, status: 'Published', sales: 12 },
  ])

  if (role !== 'designer') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Card className="text-center p-8">
            <p className="text-lg font-medium mb-4">This page is for designers only</p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-balance text-4xl font-bold tracking-tight">Designer Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage your collections and track your sales</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: ShoppingBag, label: 'Total Products', value: '12' },
            { icon: TrendingUp, label: 'Total Sales', value: '$4,829' },
            { icon: Users, label: 'Followers', value: '234' },
            { icon: ShoppingBag, label: 'Orders', value: '47' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="p-6 border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Products Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Collections</h2>
            <Link href="/products/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Collection
              </Button>
            </Link>
          </div>

          <div className="grid gap-6">
            {products.map((product) => (
              <Card key={product.id} className="p-6 border-border hover:border-accent/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Price: ${product.price}</span>
                      <span>
                        Status:{' '}
                        <span
                          className={`font-medium ${
                            product.status === 'Published'
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-yellow-600 dark:text-yellow-400'
                          }`}
                        >
                          {product.status}
                        </span>
                      </span>
                      <span>Sales: {product.sales}</span>
                    </div>
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
