'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

export default function CartPage() {
  const [cartItems] = useState([
    {
      id: 1,
      name: 'Emerald Dream Gown',
      price: 450,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=100&h=150&fit=crop',
      size: 'M',
      color: 'Emerald',
    },
    {
      id: 2,
      name: 'Midnight Elegance',
      price: 320,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1595777707802-52317b38db6f?w=100&h=150&fit=crop',
      size: 'S',
      color: 'Black',
    },
  ])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 50
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-balance text-4xl font-bold tracking-tight">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <Card className="p-12 text-center border-border">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-4">Your cart is empty</p>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-6 border-border">
                    <div className="flex gap-6">
                      {/* Image */}
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-24 w-24 object-cover rounded-lg" />

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Size: {item.size} • Color: {item.color}
                        </p>
                        <p className="text-xl font-bold text-accent mt-2">${item.price}</p>

                        {/* Quantity */}
                        <div className="flex items-center gap-3 mt-4">
                          <button className="p-1 border border-border rounded hover:bg-secondary transition-colors">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button className="p-1 border border-border rounded hover:bg-secondary transition-colors">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 border-border sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>${tax}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-accent">${total}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full mb-3">Proceed to Checkout</Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
