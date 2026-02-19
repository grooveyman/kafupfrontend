"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import HeroCarousel from "@/components/hero-carousel";
import { products, designers, collections } from "@/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import FilterBar from "@/components/filter-bar";
import QuickViewModal from "@/components/quick-view-modal";
import { Product } from "@/lib/data";
import Footer from "@/components/footer";
import Flipcard from "@/components/flip-card";
import { api } from "@/config/config";
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

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };
  const fetchProducts = async () => {
    const res = await api.get(`/designs/popularProducts`, {});

    console.log("Products data:", res.data);
  };
  useEffect(() => {
    fetchProducts();
  });
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
              <Flipcard
                key={product.id}
                product={product}
                openQuickView={openQuickView}
              />
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
              <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
                New Arrivals
              </h2>
              <p className="font-body  text-sm text-muted-foreground">
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

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
                    {/* PRODUCT INFO */}
                    <Link href={`/product/${product.designerId}`}>
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8">
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
      </section> */}
      {/* Kafup Feature Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Brand Story */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xs md:text-lg font-bold text-foreground mb-6 md:mb-8">
                  Kafup
                </h2>
                <p className="font-display text-2xl md:text-4xl lg:text-5xl leading-tight md:leading-[1.1] lg:leading-[1.3] tracking-wide font-bold text-foreground mb-6 md:mb-8">
                  Dress to Influence, Not to Impress!
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  The ultimate place for your African apparel. Celebrate your
                  heritage with our premium collection of authentic,
                  culturally-inspired designs that make a statement.
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-body w-fit"
              >
                <Link href="/">Shop Kafup Collection</Link>
              </Button>
            </div>

            {/* Right Side - Featured Product Card */}
            <div className="group">
              <div className="rounded-2xl border-2 border-border overflow-hidden bg-secondary/50 hover:border-accent transition-colors duration-300">
                {/* Product Image */}
                <div className="relative h-40 md:h-60 overflow-hidden bg-secondary">
                  <Image
                    src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=600&fit=crop"
                    alt="Kafup Featured Design"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <p className="font-body text-xs text-foreground font-normal uppercase tracking-wider mb-2">
                    Featured Collection
                  </p>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    Premium African Heritage
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    Hand-crafted authentic pieces celebrating African culture
                    and contemporary style.
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                    <span className="font-display text-2xl font-bold text-foreground">
                      GHS 400.33
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body"
                  >
                    <Link href="/">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <QuickViewModal
        quickViewProduct={quickViewProduct}
        onCloseModal={() => setQuickViewProduct(null)}
      />
    </main>
  );
}
