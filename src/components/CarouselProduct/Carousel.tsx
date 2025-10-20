"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/payload-types";
import { Lang } from "@/types";
import { useWindowSize } from "@uidotdev/usehooks";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { ProductCard } from "../ProductList/ProductCard";
import { Button } from "../ui/button";

interface CarouselListProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  className?: string;
  lang: Lang;
}

export const CarouselList = React.forwardRef<HTMLDivElement, CarouselListProps>(
  ({ products, title, subtitle, className, lang, ...props }, ref) => {
    const [index, setIndex] = React.useState(0);
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const { width: windowWidth } = useWindowSize();

    const getVisibleCards = React.useCallback(() => {
      if (windowWidth === null) return 5; // Default for SSR
      if (windowWidth >= 1280) return 5; // xl
      if (windowWidth >= 1024) return 4; // lg
      if (windowWidth >= 768) return 3; // md
      if (windowWidth >= 640) return 2; // sm
      return 1;
    }, [windowWidth]);

    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, products.length - visibleCards);

    const scroll = (direction: "next" | "prev") => {
      setIndex((prevIndex) => {
        const newIndex = direction === "next" ? prevIndex + 1 : prevIndex - 1;
        return Math.max(0, Math.min(newIndex, maxIndex));
      });
    };

    React.useEffect(() => {
      const carousel = carouselRef.current;
      if (!carousel || !carousel.children[0]) return;

      const firstCard = carousel.children[0] as HTMLElement;
      const cardWidth = firstCard.offsetWidth;
      const style = window.getComputedStyle(carousel);
      const gap = parseFloat(style.gap);

      controls.start({
        x: -index * (cardWidth + gap),
        transition: { type: "spring", stiffness: 350, damping: 40 },
      });
    }, [index, controls, visibleCards, products]); // Re-run if products change

    const handleDragEnd = (event: any, info: any) => {
      const { offset, velocity } = info;
      const carousel = carouselRef.current;
      if (!carousel || !carousel.children[0]) return;

      const firstCard = carousel.children[0] as HTMLElement;
      const cardWidth = firstCard.offsetWidth;
      const style = window.getComputedStyle(carousel);
      const gap = parseFloat(style.gap);
      const moveThreshold = cardWidth / 2;

      // Determine if the drag was significant enough to change index
      if (Math.abs(offset.x) > moveThreshold || Math.abs(velocity.x) > 200) {
        if (offset.x < 0) {
          scroll("next");
        } else {
          scroll("prev");
        }
      } else {
        // If not, snap back to the current index
        controls.start({
          x: -index * (cardWidth + gap),
          transition: { type: "spring", stiffness: 350, damping: 40 },
        });
      }
    };

    return (
      <div
        ref={ref}
        className={cn("w-full mx-auto py-8", className)}
        aria-labelledby="products-heading"
        {...props}
      >
        <header
          className={cn(
            "flex items-center px-4 sm:px-6 mb-4",
            title ? "justify-between" : "justify-end"
          )}
        >
          {title && (
            <div className="hidden sm:flex items-center gap-2">
              <h2 className="text-lg font-semibold">{title}</h2>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          )}

          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="blur"
              onClick={() => scroll("prev")}
              disabled={index === 0}
              aria-label="Scroll left"
              className="p-2 rounded-full border border-border bg-card text-card-foreground transition-opacity duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="blur"
              onClick={() => scroll("next")}
              disabled={index === maxIndex}
              aria-label="Scroll right"
              className="p-2 rounded-full border border-border bg-card text-card-foreground transition-opacity duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <div className="overflow-hidden px-4 sm:px-6">
          <motion.div
            ref={carouselRef}
            className="flex gap-4 md:gap-2 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={false}
            onDragEnd={handleDragEnd}
            animate={controls}
            onDragStart={(e) => {
              (e.target as HTMLElement).style.userSelect = "none";
            }}
            onDrag={(e) => {
              (e.target as HTMLElement).style.userSelect = "auto";
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <ProductCard doc={product} lang={lang} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
);

CarouselList.displayName = "CarouselList";
