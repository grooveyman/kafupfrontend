'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

export default function ProductsPage() {
  const { role } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')

  const products = [
    {
      id: 1,
      name: 'Emerald Dream Gown',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=500&fit=crop',
      price: 450,
      designer: 'Aurora Designs',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Midnight Elegance',
      image: 'https://images.unsplash.com/photo-1595777707802-52317b38db6f?w=400&h=500&fit=crop',
      price: 320,
      designer: 'Luxe Studio',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Sunset Silhouette',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      price: 380,
      designer: 'Ethereal Creations',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Minimalist Chic',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
      price: 250,
      designer: 'Studio Noir',
      rating: 4.6,
    },
    {
      id: 5,
      name: 'Bohemian Rhapsody',
      image: 'https://images.unsplash.com/photo-1577720643272-265f434b8b6f?w=400&h=500&fit=crop',
      price: 290,
      designer: 'Boho Dreams',
      rating: 4.8,
    },
    {
      id: 6,
      name: 'Classic Elegance',
      image: 'https://images.unsplash.com/photo-1609965160028-60a5a0f59e87?w=400&h=500&fit=crop',
      price: 400,
      designer: 'Timeless Couture',
      rating: 4.9,
    },
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.designer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-balance text-4xl font-bold tracking-tight">Designer Collections</h1>
          <p className="mt-2 text-muted-foreground">Browse curated fashion designs from talented designers worldwide</p>
        </div>

        {role === 'designer' && (
          <div className="mb-8">
            <Link href="/products/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </Link>
          </div>
        )}

        {/* Search */}
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or designer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2 w-full"
          />
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="overflow-hidden border-border hover:border-accent/30 transition-all hover:shadow-lg cursor-pointer h-full group">
                <div className="relative overflow-hidden bg-muted aspect-video">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground font-medium">{product.designer}</p>
                  <h3 className="font-semibold text-lg mt-1 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold text-accent">${product.price}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
