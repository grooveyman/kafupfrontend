import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

interface ModalProps {
  quickViewProduct: Product | null;
  onCloseModal: () => void;
}

export default function QuickViewModal({
  quickViewProduct,
  onCloseModal,
}: ModalProps) {
  const closeQuickView = () => {
    onCloseModal();
  };
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart(quickViewProduct);
    toast.success(`${quickViewProduct.name} added to cart!`);
  };
  useEffect(() => {
    if (quickViewProduct) {
      setActiveImage(quickViewProduct.image);
    }
  }, [quickViewProduct]);

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
        >
          <motion.div
            className="bg-white dark:bg-black/100 rounded-2xl w-full max-w-4xl p-6 flex flex-col md:flex-row gap-6"
            initial={{ scale: 0.95, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* LEFT: Images */}
            <div className="md:w-1/2">
              {/* Main Image */}
              <div className="relative aspect-[5/4] w-100 rounded-xl overflow-hidden mb-4  border-[1.1px] ">
                <Image
                  src={activeImage ?? quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Thumbnails */}
              {quickViewProduct.gallery && (
                <div className="flex gap-2">
                  {[quickViewProduct.image, ...quickViewProduct.gallery].map(
                    (img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(img)}
                        className={`relative h-20 w-16 rounded-lg overflow-hidden border 
                      ${
                        activeImage === img
                          ? "border-black"
                          : "border-transparent"
                      }`}
                      >
                        <Image
                          src={img}
                          alt="Thumbnail"
                          fill
                          className="object-cover"
                        />
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* RIGHT: Product Info */}
            <div className="md:w-1/2 flex flex-col">
              <h2 className="text-xl font-display font-bold mb-1">
                {quickViewProduct.name}
              </h2>

              <p className="text-lg font-semibold mb-4">
                ${quickViewProduct.price.toFixed(2)}
              </p>

              {/* Description */}
              {quickViewProduct.description && (
                <p className="text-sm text-muted-foreground mb-4">
                  {quickViewProduct.description}
                </p>
              )}

              {/* Variations */}
              {quickViewProduct.variations && (
                <div className="mb-5">
                  <p className="text-xs font-medium mb-2 uppercase">
                    Variations
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {quickViewProduct.variations.map((variant) => (
                      <button
                        key={variant}
                        className="border rounded-lg px-3 py-1 text-sm hover:border-black transition"
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-auto flex gap-3">
                <Link
                  href={`/product/${quickViewProduct.id}`}
                  className="flex-1 text-center border rounded-xl py-2 text-sm hover:bg-secondary"
                >
                  View Full Details
                </Link>

                <button
                  className="flex-1 bg-black dark:bg-white dark:text-black text-white rounded-xl py-2 text-sm hover:opacity-90"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
