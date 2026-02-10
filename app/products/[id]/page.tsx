"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import { useState } from "react";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data
  const product = {
    id: params.id,
    name: "Emerald Dream Gown",
    price: 450,
    rating: 4.8,
    reviews: 156,
    designer: "Aurora Designs",
    designerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=aurora",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=1000&fit=crop",
    description:
      "The Emerald Dream Gown is a stunning piece that combines elegance with modern sophistication. Hand-crafted with premium fabrics and attention to detail, this gown is perfect for any special occasion.",
    colors: ["Emerald", "Sapphire", "Ruby"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
    details: [
      "Premium silk blend material",
      "Hand-stitched details",
      "Adjustable waistband",
      "Full length design",
      "Dry clean only",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        {/* <Link href="/products">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link> */}

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <Card className="overflow-hidden border-border">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </Card>
          </div>

          {/* Details */}
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Premium Collection
            </p>
            <h1 className="text-4xl font-bold mt-2 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-yellow-500"
                        : "text-muted"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-5xl font-bold text-accent mb-6">
              ${product.price}
            </p>

            {/* Designer */}
            <Card className="p-4 mb-6 border-border">
              <div className="flex items-center gap-3">
                <img
                  src={product.designerImage || "/placeholder.svg"}
                  alt={product.designer}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-sm text-muted-foreground">Designed by</p>
                  <p className="font-semibold">{product.designer}</p>
                </div>
              </div>
            </Card>

            {/* Colors */}
            <div className="mb-6">
              <p className="font-semibold mb-3">Color</p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className="px-4 py-2 border-2 border-border rounded-lg hover:border-accent transition-colors font-medium text-sm"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <p className="font-semibold mb-3">Size</p>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="py-2 border-2 border-border rounded-lg hover:border-accent transition-colors font-medium text-sm"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button size="lg" className="flex-1">
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? "text-accent" : ""}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Details */}
            <div>
              <p className="font-semibold mb-4">Product Details</p>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-accent mt-0.5">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
