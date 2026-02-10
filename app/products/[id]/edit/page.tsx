'use client'

import React from "react"

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { role } = useAuth()
  const [formData, setFormData] = useState({
    name: 'Emerald Dream Gown',
    description: 'A stunning piece that combines elegance with modern sophistication.',
    price: '450',
    category: 'evening-wear',
    colors: 'Emerald, Sapphire, Ruby',
    sizes: 'XS, S, M, L, XL, XXL',
    status: 'published',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Product updated:', formData)
  }

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
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href={`/products/${params.id}`}>
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Button>
        </Link>

        {/* Form */}
        <Card className="p-8 border-border">
          <h1 className="text-3xl font-bold mb-2">Edit Collection</h1>
          <p className="text-muted-foreground mb-8">Update your product details</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div>
              <label className="text-sm font-semibold mb-3 block">Collection Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-semibold mb-3 block">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-semibold mb-3 block">Price ($)</label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-semibold mb-3 block">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="evening-wear">Evening Wear</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="summer">Summer</option>
                <option value="wedding">Wedding</option>
              </select>
            </div>

            {/* Colors */}
            <div>
              <label className="text-sm font-semibold mb-3 block">Available Colors</label>
              <Input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">Separate multiple colors with commas</p>
            </div>

            {/* Sizes */}
            <div>
              <label className="text-sm font-semibold mb-3 block">Available Sizes</label>
              <Input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">Separate multiple sizes with commas</p>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-semibold mb-3 block">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
              <Link href={`/products/${params.id}`} className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
