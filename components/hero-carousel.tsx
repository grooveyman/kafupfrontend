"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
const heroImages = [
  "/assets/images/photo-1768212566108-4ce4f329e4d2.avif",
  "/assets/images/closet.webp",
  "/assets/images/sew.webp",
  "/assets/images/sew2.webp",
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-black">
      {/* Images */}
      {heroImages.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt="Hero background"
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ease-in-out
            ${index === current ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-medium text-white dark:text-white md:mb-12 mb-6">
          <Sparkles className="h-4 w-4" />
          The Future of Fashion
        </div>
        <h1 className="text-balance text-xl font-bold tracking-tight sm:text-lg lg:text-5xl md:mb-4 text-white dark:text-white">
          Discover Independent Designers
        </h1>
        <p className="mt-8 text-balance text-sm text-white dark:text-white max-w-2xl mx-auto md:mb-4 ">
          Shop curated collections from artisans in Ghana.{" "}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 md:mb-10 text-accent-orange">
          <Link href="/signup?role=client">
            <Button size="lg" className="w-full sm:w-auto rounded-xl">
              Explore Designers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/signup?role=designer">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-xl border border-white/30 bg-transparent text-white hover:bg-white hover:text-black dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Shop Collections
            </Button>
          </Link>
        </div>
      </div>

      {/* Optional indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-all
              ${i === current ? "bg-white w-6" : "bg-white/50"}
            `}
          />
        ))}
      </div>
    </section>
  );
}
