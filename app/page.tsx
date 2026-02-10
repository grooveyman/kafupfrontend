"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  ChevronRight,
  Eye,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import HeroCarousel from "@/components/hero-carousel";
import { products, designers, collections } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";
import FilterBar from "@/components/filter-bar";
import QuickViewModal from "@/components/quick-view-modal";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Page() {
  const { user } = useAuth();
  const featuredDesigners = designers.slice(0, 3);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "new" | "popular"
  >("all");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const trendingCollections = collections.filter((c) => c.isNew);
  const trendingProducts = products.slice(0, 6);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );
  const date = new Date();
  const year = date.getFullYear();

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/20 ">
      <Header />
      <HeroCarousel />

      {/* Featured Designers */}
      <section id="designers" className="py-16 md:py-14 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
              Featured Designers
            </h2>
            <p className="font-body  text-sm text-muted-foreground">
              Meet the artisans crafting exceptional pieces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {featuredDesigners.map((designer) => (
              <Link key={designer.id} href={`/designer/${designer.id}`}>
                <div className="group cursor-pointer">
                  {/* Designer Photo */}
                  <div className="relative h-64 md:h-45 mb-6 rounded-2xl overflow-hidden">
                    <Image
                      src={designer.image || "/placeholder.svg"}
                      alt={designer.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Designer Info */}
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground mb-1">
                      {designer.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-2">
                      {designer.location}
                    </p>
                    <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-4">
                      {designer.bio}
                    </p>
                    <button className="font-body text-sm font-semibold text-accent group-hover:text-accent/80 transition-colors flex items-center gap-2">
                      View Collection
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section
        id="collection"
        className="py-16 md:py-14 px-4 md:px-8 border-t border-border"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
              Curated Colletions
            </h2>
            <p className="font-body text-sm text-muted-foreground ">
              Explore expertly curated fashion collections from the world's most
              talented designers{" "}
            </p>
          </div>

          {/* Search & Filters */}
          <FilterBar
            selectedFilter={selectedFilter}
            setSelectedFilter={() => setSelectedFilter("new")}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {trendingProducts.map((product) => (
              <div key={product.id} className="group relative">
                {/* IMAGE WRAPPER */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary mb-4 flip-box ">
                  {/* Primary Image */}
                  <div className="flip-box-inner">
                    <div className="flip-box-back">
                      <Image
                        src={product.gallery?.[0]}
                        alt={`${product.name} alternate`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flip-box-front">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Out of stock overlay */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                      <p className="text-white font-display text-lg">
                        Out of Stock
                      </p>
                    </div>
                  )}

                  {/* QUICK VIEW BUTTON */}
                  <div className="absolute inset-0  items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hidden md:flex">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        openQuickView(product);
                      }}
                      className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full shadow-md text-sm font-medium hover:scale-105 transition-transform"
                    >
                      <Eye size={16} />
                      Quick View
                    </button>
                  </div>
                </div>

                {/* PRODUCT INFO */}
                <Link href={`/product/${product.id}`}>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {product.designerId}
                  </p>

                  <h3 className="text-sm font-semibold mb-1 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-2">
                    ${product.price.toFixed(2)}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400 text-sm">
                      {"★★★★★"}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Why Choose Vesture?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Instantly showcase and discover the latest fashion designs with our optimized platform.",
              },
              {
                icon: Users,
                title: "Connect Globally",
                description:
                  "Build your audience and connect with fashion enthusiasts from around the world.",
              },
              {
                icon: Sparkles,
                title: "Premium Quality",
                description:
                  "Curated collections and designer verification ensure only the best designs are featured.",
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={i}
                  className="p-8 border-border hover:border-accent/30 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Product Showcase */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                New Arrivals
              </h2>
              <p className="font-body text-muted-foreground">
                Recently added pieces
              </p>
            </div>
            <Link
              href="/search"
              className="font-body font-semibold text-accent hover:text-accent/80 transition-colors flex items-center gap-2"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group">
                  {/* Product Image */}
                  <div
                    className="relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary mb-4"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <Image
                      src={
                        hoveredProduct === product.id && product.gallery[1]
                          ? product.gallery[1]
                          : product.image
                      }
                      alt={product.name}
                      fill
                      className="object-cover group-hover:opacity-95 transition-opacity"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <p className="text-white font-display text-lg">
                          Out of Stock
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {product.designerId}
                    </p>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-3">
                      ${product.price.toFixed(2)}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">
                            {"★"}
                          </span>
                        ))}
                      </div>
                      <span className="font-body text-xs text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="p-12 text-center border-border bg-card/50 backdrop-blur">
            <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Whether you're a designer or a fashion enthusiast, Vesture is your
              platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup?role=client">
                <Button size="lg" variant="outline">
                  Shop Now
                </Button>
              </Link>
              <Link href="/signup?role=designer">
                <Button size="lg">
                  Start Selling
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-display font-bold text-foreground mb-4">
                KafUP
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Curated designer fashion from independent artisans
              </p>
            </div>
            <div>
              <h4 className="font-body font-semibold text-foreground mb-4">
                Shop
              </h4>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Designers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Collections
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-body font-semibold text-foreground mb-4">
                Company
              </h4>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li>
                  <a
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-body font-semibold text-foreground mb-4">
                Customer Service
              </h4>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between font-body text-sm text-muted-foreground">
            <p>&copy; {year} KafUP. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              {/* <a href="#" className="hover:text-foreground transition-colors">
                Cookies
              </a> */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
      <QuickViewModal
        quickViewProduct={quickViewProduct}
        onCloseModal={() => setQuickViewProduct(null)}
      />
    </main>
  );
}
