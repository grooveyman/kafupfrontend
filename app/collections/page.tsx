"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, Calendar, Users, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "new" | "popular"
  >("all");

  const collections = [
    {
      id: 1,
      name: "Summer Escape",
      designer: "Aurora Designs",
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&h=300&fit=crop",
      description: "Light, breezy designs perfect for warm weather",
      items: 24,
      followers: 1234,
      releaseDate: "2025-01-15",
      featured: true,
      category: "Summer",
    },
    {
      id: 2,
      name: "Urban Nights",
      designer: "Studio Noir",
      image:
        "https://images.unsplash.com/photo-1595777707802-52317b38db6f?w=500&h=300&fit=crop",
      description:
        "Sleek and sophisticated designs for the modern city dweller",
      items: 18,
      followers: 892,
      releaseDate: "2025-01-10",
      featured: false,
      category: "Casual",
    },
    {
      id: 3,
      name: "Ethereal Dreams",
      designer: "Ethereal Creations",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
      description: "Whimsical and artistic pieces that inspire imagination",
      items: 32,
      followers: 2145,
      releaseDate: "2025-01-08",
      featured: true,
      category: "Evening Wear",
    },
    {
      id: 4,
      name: "Bohemian Wanderer",
      designer: "Boho Dreams",
      image:
        "https://images.unsplash.com/photo-1577720643272-265f434b8b6f?w=500&h=300&fit=crop",
      description: "Free-spirited designs inspired by global cultures",
      items: 28,
      followers: 1567,
      releaseDate: "2025-01-05",
      featured: false,
      category: "Bohemian",
    },
    {
      id: 5,
      name: "Timeless Classics",
      designer: "Timeless Couture",
      image:
        "https://images.unsplash.com/photo-1609965160028-60a5a0f59e87?w=500&h=300&fit=crop",
      description: "Enduring designs that transcend seasonal trends",
      items: 45,
      followers: 3421,
      releaseDate: "2024-12-20",
      featured: true,
      category: "Formal",
    },
    {
      id: 6,
      name: "Metro Vibes",
      designer: "Metro Vibes",
      image:
        "https://images.unsplash.com/photo-1551986782-d244d7d4e754?w=500&h=300&fit=crop",
      description: "Contemporary street style meets high fashion",
      items: 22,
      followers: 1089,
      releaseDate: "2024-12-18",
      featured: false,
      category: "Streetwear",
    },
    {
      id: 7,
      name: "Luxe Paradise",
      designer: "Luxe Studio",
      image:
        "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=500&h=300&fit=crop",
      description: "Premium collections featuring the finest materials",
      items: 16,
      followers: 2734,
      releaseDate: "2024-12-15",
      featured: true,
      category: "Luxury",
    },
    {
      id: 8,
      name: "Floral Essence",
      designer: "Floral Dreams",
      image:
        "https://images.unsplash.com/photo-1506629082632-6aa63b07b5e0?w=500&h=300&fit=crop",
      description: "Nature-inspired designs blooming with color",
      items: 19,
      followers: 945,
      releaseDate: "2024-12-12",
      featured: false,
      category: "Summer",
    },
  ];

  const filteredCollections = collections.filter((collection) => {
    const matchesSearch =
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.designer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "new") {
      return (
        matchesSearch &&
        new Date(collection.releaseDate) > new Date("2025-01-01")
      );
    }
    if (selectedFilter === "popular") {
      return matchesSearch && collection.followers > 1500;
    }
    return matchesSearch;
  });

  const featuredCollections = collections.filter((c) => c.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-balance text-4xl font-bold tracking-tight mb-3">
            Curated Collections
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore expertly curated fashion collections from the world's most
            talented designers
          </p>
        </div>

        {/* Featured Collections */}
        {featuredCollections.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredCollections.slice(0, 3).map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                >
                  <Card className="overflow-hidden border-2 border-accent/20 hover:border-accent/50 transition-all hover:shadow-lg cursor-pointer h-full group flex flex-col">
                    <div className="relative overflow-hidden bg-muted aspect-video">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                        Featured
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                        <h3 className="font-bold text-lg">{collection.name}</h3>
                        <p className="text-sm opacity-90">
                          {collection.designer}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {collection.description}
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-xs mt-auto">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <ShoppingBag className="h-3 w-3" />
                          {collection.items} items
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {collection.followers.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(collection.releaseDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search collections, designers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2 w-full"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            {(["all", "new", "popular"] as const).map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter)}
                className="capitalize"
              >
                {filter === "all"
                  ? "All Collections"
                  : filter === "new"
                    ? "New Releases"
                    : "Most Popular"}
              </Button>
            ))}
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.id}`}>
              <Card className="overflow-hidden border-border hover:border-accent/30 transition-all hover:shadow-lg cursor-pointer h-full group flex flex-col">
                <div className="relative overflow-hidden bg-muted aspect-video">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute top-2 right-2 bg-secondary px-3 py-1 rounded-full text-xs font-semibold">
                    {collection.category}
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <div className="mb-2">
                    <h3 className="font-bold text-lg">{collection.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {collection.designer}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
                    {collection.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-xs pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="font-bold">{collection.items}</div>
                      <div className="text-muted-foreground">Items</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">
                        {(collection.followers / 1000).toFixed(1)}K
                      </div>
                      <div className="text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">
                        {new Date(collection.releaseDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </div>
                      <div className="text-muted-foreground">Released</div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCollections.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No collections found matching your search.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
