"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const filters = [
  "all",
  "new",
  "popular",
  "featured",
  "trending",
  "ready-to-wear",
  "bridal",
  "streetwear",
  "accessories",
  "afrocentric",
] as const;

export default function FilterBar({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mb-8">
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow p-2"
      >
        <ChevronLeft className="h-5 w-5 text-black " />
      </button>

      {/* Scrollable Filters */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-smooth px-10 scrollbar-hide"
      >
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            onClick={() => setSelectedFilter(filter)}
            className="capitalize whitespace-nowrap rounded-xl text-sm"
          >
            {filter.replace("-", " ")}
          </Button>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow p-2"
      >
        <ChevronRight className="h-5 w-5 text-black" />
      </button>
    </div>
  );
}
