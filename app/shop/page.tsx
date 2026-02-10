'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Search, Filter } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)

  const products = [
    {
      id: 1,
      name: 'Emerald Dream Gown',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=500&fit=crop',
      price: 450,
      designer: 'Aurora Designs',
      rating: 4.8,
      category: 'Evening Wear',
    },
    {
      id: 2,
      name: 'Midnight Elegance',
      image: 'https://images.unsplash.com/photo-1595777707802-52317b38db6f?w=400&h=500&fit=crop',
      price: 320,
      designer: 'Luxe Studio',
      rating: 4.9,
      category: 'Casual',
    },
    {
      id: 3,
      name: 'Sunset Silhouette',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      price: 380,
      designer: 'Ethereal Creations',
      rating: 4.7,
      category: 'Evening Wear',
    },
    {
      id: 4,
      name: 'Minimalist Chic',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
      price: 250,
      designer: 'Studio Noir',
      rating: 4.6,
      category: 'Casual',
    },
    {
      id: 5,
      name: 'Bohemian Rhapsody',
      image: 'https://images.unsplash.com/photo-1577720643272-265f434b8b6f?w=400&h=500&fit=crop',
      price: 290,
      designer: 'Boho Dreams',
      rating: 4.8,
      category: 'Summer',
    },
    {
      id: 6,
      name: 'Classic Elegance',
      image: 'https://images.unsplash.com/photo-1609965160028-60a5a0f59e87?w=400&h=500&fit=crop',
      price: 400,
      designer: 'Timeless Couture',
      rating: 4.9,
      category: 'Evening Wear',
    },
    {
      id: 7,
      name: 'Urban Edge',
      image: 'https://images.unsplash.com/photo-1551986782-d244d7d4e754?w=400&h=500&fit=crop',
      price: 220,
      designer: 'Metro Vibes',
      rating: 4.5,
      category: 'Casual',
    },
    {
      id: 8,
      name: 'Garden Romance',
      image: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=400&h=500&fit=crop',
      price: 350,
      designer: 'Floral Dreams',
      rating: 4.7,
      category: 'Summer',
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
          <h1 className="text-balance text-4xl font-bold tracking-tight">Shop Premium Collections</h1>
          <p className="mt-2 text-muted-foreground">Discover fashion designed by the most talented creators</p>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-8 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search designs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2 w-full"
            />
          </div>
          <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <Card className="p-6 mb-8 border-border">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  label: 'Category',
                  options: ['Evening Wear', 'Casual', 'Summer', 'Formal'],
                },
                {
                  label: 'Price Range',
                  options: ['Under $200', '$200-$400', '$400-$600', 'Over $600'],
                },
                {
                  label: 'Rating',
                  options: ['4.9+', '4.7+', '4.5+', 'All'],
                },
              ].map((filter, i) => (
                <div key={i}>
                  <p className="font-semibold mb-3">{filter.label}</p>
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="overflow-hidden border-border hover:border-accent/30 transition-all hover:shadow-lg cursor-pointer h-full group">
                <div className="relative overflow-hidden bg-muted aspect-video">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-accent/90 text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground font-medium">{product.designer}</p>
                  <h3 className="font-semibold text-base mt-1 line-clamp-2">{product.name}</h3>
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
