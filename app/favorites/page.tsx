'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'

export default function FavoritesPage() {
  const { user } = useAuth()

  const favorites = [
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
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Card className="text-center p-8">
            <p className="text-lg font-medium mb-4">Please sign in to view your favorites</p>
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-balance text-4xl font-bold tracking-tight">Your Favorites</h1>
          <p className="mt-2 text-muted-foreground">Save your favorite designs for later</p>
        </div>

        {/* Favorites Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {favorites.map((product) => (
            <Card key={product.id} className="overflow-hidden border-border hover:border-accent/30 transition-all hover:shadow-lg group">
              <div className="relative overflow-hidden bg-muted aspect-video">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-2 right-2 bg-white/90 dark:bg-black/90 p-2 rounded-full hover:bg-white dark:hover:bg-black transition-colors">
                  <Heart className="h-5 w-5 text-red-500 fill-current" />
                </button>
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
                <Button className="w-full mt-4 gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {favorites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No favorites yet</p>
            <Link href="/shop">
              <Button>Browse Collections</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
