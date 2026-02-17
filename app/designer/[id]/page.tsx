"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { designers, products, collections } from "@/lib/data";
import {
  Heart,
  Share2,
  Instagram,
  Globe,
  Mail,
  ChevronRight,
} from "lucide-react";
import Footer from "@/components/footer";

export default function DesignerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "collections" | "about" | "reviews"
  >("collections");
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const designer = designers.find((d) => d.id === "designer-1");
  console.log(designers);

  const designerCollections = collections.filter(
    (c) => c.designerId === "designer-1",
  );
  const designerProducts = products.filter(
    (p) => p.designerId === "designer-1",
  );
  const filteredProducts = designerProducts.filter((product) => {
    const matchesCollection =
      selectedCollection === "all" || product.id === selectedCollection;
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesCollection && matchesCategory;
  });

  if (!designer) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-24">
          <p className="font-display text-2xl text-foreground">
            Designer not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Cover Image */}
      {/* <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image
          src={designer.cover || "/placeholder.svg"}
          alt={designer.name}
          fill
          className="object-cover"
        />
      </div> */}

      {/* Main Content - Two Column Layout */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Designer Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Designer Profile Card */}
              <div className="rounded-2xl border border-border bg-secondary/30 p-6">
                {/* Designer Photo */}
                <div className=" aspect-auto rounded-xl overflow-hidden border-2 border-border bg-secondary mb-6">
                  <Image
                    src={designer.image || "/placeholder.svg"}
                    alt={designer.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-center"
                  />
                </div>

                {/* Designer Info */}
                <h1 className="font-display text-base font-bold text-foreground mb-2">
                  {designer.name}
                </h1>
                <p className="font-body text-sm text-muted-foreground font-semibold mb-2 uppercase tracking-wide">
                  {designer.location}
                </p>
                <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
                  {designer.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                  <div className="text-center">
                    <p className="font-display text-xl font-bold text-foreground">
                      {designerProducts.length}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      Products
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-xl font-bold text-foreground">
                      {designerCollections.length}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      Collections
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  <Button
                    onClick={() => setIsFollowed(!isFollowed)}
                    className={`w-full font-body ${
                      isFollowed
                        ? "bg-secondary text-foreground hover:bg-secondary/80"
                        : "bg-accent text-accent-foreground hover:bg-accent/90"
                    }`}
                  >
                    {isFollowed ? "✓ Following" : "Follow"}
                  </Button>
                  <Button
                    asChild
                    className="w-full font-body bg-foreground text-background hover:bg-foreground/90"
                  >
                    <a
                      href="/contact"
                      className="flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Contact Designer
                    </a>
                  </Button>
                </div>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="font-body border-border hover:bg-secondary bg-transparent"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    className="font-body border-border hover:bg-secondary bg-transparent"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Social Links */}
                {(designer.socialLinks.instagram ||
                  designer.socialLinks.website) && (
                  <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                    {designer.socialLinks.instagram && (
                      <a
                        href={designer.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-2 hover:bg-secondary rounded-lg transition-colors text-center"
                      >
                        <Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground mx-auto" />
                      </a>
                    )}
                    {designer.socialLinks.website && (
                      <a
                        href={designer.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-2 hover:bg-secondary rounded-lg transition-colors text-center"
                      >
                        <Globe className="w-5 h-5 text-muted-foreground hover:text-foreground mx-auto" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* About Section */}
              <div className="rounded-2xl border border-border bg-secondary/30 p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  About
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  {designer.story}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  Founded in {designer.founded}, {designer.name} continues the
                  tradition of artisanal craftsmanship while embracing
                  sustainable practices.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Portfolio & Featured Designs */}
          <div className="lg:col-span-2 space-y-12">
            {/* Featured Collections */}
            {designerCollections.length > 0 && (
              <div>
                <h2 className="font-display text-sm md:text-lg font-bold text-foreground mb-6">
                  Featured Collections
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {designerCollections.map((collection) => (
                    <div
                      key={collection.id}
                      className="group relative rounded-2xl overflow-hidden h-60 cursor-pointer"
                    >
                      <Image
                        src={collection.coverImage || "/placeholder.svg"}
                        alt={collection.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          {collection.isNew && (
                            <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                              NEW
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-base font-bold mb-2">
                          {collection.name}
                        </h3>
                        <p className="font-body text-xs text-white/90 mb-4">
                          {collection.description}
                        </p>
                        <button className="font-body text-sm font-semibold text-white group-hover:text-accent transition-colors flex items-center gap-2">
                          View Collection
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Designs */}
            {/* Featured Designs */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-sm md:text-lg font-bold text-foreground">
                  Portfolio
                </h2>
                {designerProducts.length > 6 && (
                  <Link
                    href={`/search?q=${designer.name}`}
                    className="font-body text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                  >
                    View All
                  </Link>
                )}
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1">
                  <label className="block font-body text-sm font-semibold text-foreground mb-2">
                    Filter by Collection
                  </label>
                  <select
                    value={selectedCollection}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  >
                    <option value="all">All Collections</option>
                    {designerCollections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block font-body text-sm font-semibold text-foreground mb-2">
                    Filter by Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  >
                    <option value="all">All Categories</option>
                    <option value="Ready-to-wear">Ready-to-wear</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Bridal">Bridal</option>
                    <option value="Streetwear">Streetwear</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      setSelectedCollection("all");
                      setSelectedCategory("all");
                    }}
                    variant="outline"
                    className="w-full md:w-auto font-body border-border hover:bg-secondary bg-transparent"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>

              {/* Results Count */}
              <p className="font-body text-sm text-muted-foreground mb-6">
                Showing {filteredProducts.length} design
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 6).map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`}>
                      <div className="group">
                        {/* Product Image */}
                        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-secondary mb-4">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:opacity-90 transition-opacity"
                          />
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <p className="text-white font-display text-sm font-bold">
                                Out of Stock
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <h3 className="font-display text-base font-bold text-foreground group-hover:text-accent transition-colors mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="font-body text-sm font-semibold text-foreground">
                            ${product.price.toFixed(2)}
                          </p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-xs">
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="font-body text-xs text-muted-foreground">
                          {product.reviews} reviews
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="font-body text-muted-foreground">
                      No designs found matching your filters. Try adjusting your
                      selection.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-2xl bg-gradient-to-r from-accent to-accent/80 p-8 text-accent-foreground">
              <h3 className="font-display text-2xl font-bold mb-2">
                Discover More
              </h3>
              <p className="font-body text-sm mb-6 opacity-90">
                Explore the full collection and find your next favorite piece
              </p>
              <Link href={`/search?q=${designer.name}`}>
                <Button className="bg-background text-foreground hover:bg-background/90">
                  Browse Full Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
