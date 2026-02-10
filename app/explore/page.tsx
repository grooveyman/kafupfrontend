"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, Filter, Zap, TrendingUp, Heart, Eye } from "lucide-react";
import { useState } from "react";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"trending" | "new" | "featured">(
    "trending",
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    "Evening Wear",
    "Casual",
    "Summer",
    "Formal",
    "Bohemian",
    "Streetwear",
  ];

  const exploreSections = [
    {
      id: "trending",
      label: "Trending Now",
      products: [
        {
          id: 1,
          name: "Emerald Dream Gown",
          image:
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=500&fit=crop",
          price: 450,
          designer: "Aurora Designs",
          views: 5234,
          likes: 892,
          category: "Evening Wear",
        },
        {
          id: 2,
          name: "Midnight Elegance",
          image:
            "https://images.unsplash.com/photo-1595777707802-52317b38db6f?w=400&h=500&fit=crop",
          price: 320,
          designer: "Luxe Studio",
          views: 4156,
          likes: 734,
          category: "Casual",
        },
        {
          id: 3,
          name: "Sunset Silhouette",
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop",
          price: 380,
          designer: "Ethereal Creations",
          views: 3821,
          likes: 612,
          category: "Evening Wear",
        },
        {
          id: 4,
          name: "Urban Edge",
          image:
            "https://images.unsplash.com/photo-1551986782-d244d7d4e754?w=400&h=500&fit=crop",
          price: 220,
          designer: "Metro Vibes",
          views: 4923,
          likes: 856,
          category: "Casual",
        },
        {
          id: 5,
          name: "Minimalist Chic",
          image:
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
          price: 250,
          designer: "Studio Noir",
          views: 3456,
          likes: 521,
          category: "Casual",
        },
        {
          id: 6,
          name: "Bohemian Rhapsody",
          image:
            "https://images.unsplash.com/photo-1577720643272-265f434b8b6f?w=400&h=500&fit=crop",
          price: 290,
          designer: "Boho Dreams",
          views: 5612,
          likes: 978,
          category: "Summer",
        },
      ],
    },
    {
      id: "new",
      label: "New Arrivals",
      products: [
        {
          id: 7,
          name: "Garden Romance",
          image:
            "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=400&h=500&fit=crop",
          price: 350,
          designer: "Floral Dreams",
          views: 1234,
          likes: 245,
          category: "Summer",
        },
        {
          id: 8,
          name: "Classic Elegance",
          image:
            "https://images.unsplash.com/photo-1609965160028-60a5a0f59e87?w=400&h=500&fit=crop",
          price: 400,
          designer: "Timeless Couture",
          views: 892,
          likes: 156,
          category: "Evening Wear",
        },
      ],
    },
    {
      id: "featured",
      label: "Featured Collections",
      products: [
        {
          id: 9,
          name: "Cosmic Dreams",
          image:
            "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=500&fit=crop",
          price: 520,
          designer: "Stellar Couture",
          views: 6234,
          likes: 1124,
          category: "Evening Wear",
        },
        {
          id: 10,
          name: "Tropical Paradise",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
          price: 280,
          designer: "Paradise Fashion",
          views: 4567,
          likes: 834,
          category: "Summer",
        },
      ],
    },
  ];

  const currentProducts =
    exploreSections.find((section) => section.id === activeTab)?.products || [];

  const filteredProducts = currentProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.designer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1 text-sm font-medium text-accent mb-6">
            <Zap className="h-4 w-4" />
            Discover What's Trending
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight mb-3">
            Explore Fashion
          </h1>
          <p className="text-muted-foreground text-lg">
            Dive into curated collections and discover emerging trends from
            talented designers worldwide
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          {exploreSections.map((section) => (
            <button
              key={section.id}
              onClick={() =>
                setActiveTab(section.id as "trending" | "new" | "featured")
              }
              className={`px-4 py-3 font-medium text-sm transition-all border-b-2 ${
                activeTab === section.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-8 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search designs, designers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2 w-full"
            />
          </div>
          <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <Card className="p-6 mb-8 border-border">
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategories.includes(category)
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-foreground hover:bg-secondary/70"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="overflow-hidden border-border hover:border-accent/30 transition-all hover:shadow-lg cursor-pointer h-full group flex flex-col">
                <div className="relative overflow-hidden bg-muted aspect-video">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-2 right-2 bg-accent/90 text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <p className="text-xs text-muted-foreground font-medium">
                    {product.designer}
                  </p>
                  <h3 className="font-semibold text-base mt-1 line-clamp-2 mb-3">
                    {product.name}
                  </h3>

                  {/* Stats */}
                  <div className="flex gap-3 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {product.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {product.likes.toLocaleString()}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-lg font-bold text-accent">
                      ${product.price}
                    </p>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
