"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { MapPin, Users, ShoppingBag } from "lucide-react";

export default function DesignersPage() {
  const designers = [
    {
      id: 1,
      name: "Aurora Designs",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=aurora",
      location: "Milan, Italy",
      followers: 2847,
      products: 34,
      description: "Luxury evening wear and sophisticated gowns",
      tags: ["Evening Wear", "Luxury", "Elegant"],
    },
    {
      id: 2,
      name: "Luxe Studio",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=luxe",
      location: "Paris, France",
      followers: 3521,
      products: 48,
      description: "Premium contemporary fashion designs",
      tags: ["Contemporary", "Premium", "Chic"],
    },
    {
      id: 3,
      name: "Ethereal Creations",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ethereal",
      location: "London, UK",
      followers: 1923,
      products: 27,
      description: "Dreamy and artistic fashion pieces",
      tags: ["Artistic", "Dreamy", "Unique"],
    },
    {
      id: 4,
      name: "Studio Noir",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=noir",
      location: "New York, USA",
      followers: 4156,
      products: 56,
      description: "Bold minimalist designs with edge",
      tags: ["Minimalist", "Bold", "Urban"],
    },
    {
      id: 5,
      name: "Boho Dreams",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=boho",
      location: "Barcelona, Spain",
      followers: 2134,
      products: 31,
      description: "Bohemian and free-spirited collections",
      tags: ["Bohemian", "Artisan", "Free-spirited"],
    },
    {
      id: 6,
      name: "Timeless Couture",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=timeless",
      location: "Tokyo, Japan",
      followers: 3478,
      products: 42,
      description: "Classic designs meeting modern innovation",
      tags: ["Classic", "Timeless", "Innovative"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-balance text-lg md:text-2xl font-bold tracking-tight">
            Discover Designers
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Connect with talented fashion creators from around the world
          </p>
        </div>

        {/* Designers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designers.map((designer) => (
            <Card
              key={designer.id}
              className="p-8 border-border hover:border-accent/30 transition-all hover:shadow-lg text-center flex flex-col h-full"
            >
              {/* Avatar */}
              <img
                src={designer.image || "/placeholder.svg"}
                alt={designer.name}
                className="h-24 w-24 rounded-full mx-auto mb-4 border-4 border-accent/20"
              />

              {/* Name & Location */}
              <h3 className="text-2xl font-bold mb-1">{designer.name}</h3>
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-3 text-sm">
                <MapPin className="h-4 w-4" />
                {designer.location}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-4 flex-grow">
                {designer.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-border">
                <div>
                  <div className="flex items-center justify-center gap-1 text-accent font-bold mb-1">
                    <Users className="h-4 w-4" />
                    {designer.followers.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-accent font-bold mb-1">
                    <ShoppingBag className="h-4 w-4" />
                    {designer.products}
                  </div>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {designer.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Button */}
              <Button className="w-full">View Collection</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
