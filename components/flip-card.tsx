import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  Plus,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
interface FlipCardProps {
  product: Product;
  openQuickView: (product: Product) => void;
}

export default function Flipcard({ product, openQuickView }: FlipCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div key={product.id} className="group relative">
      {/* IMAGE WRAPPER */}
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary mb-4 flip-box ">
        {/* Primary Image */}
        <div className="flip-box-inner">
          <div className="flip-box-back cursor-pointer">
            <Link href={`/products/${product.id}`}>
              {" "}
              <Image
                src={product.gallery?.[0]}
                alt={`${product.name} alternate`}
                fill
                className="object-cover"
              />
            </Link>
          </div>
          <div className="flip-box-front cursor-pointer">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </Link>
          </div>
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <p className="text-white font-display text-lg">Out of Stock</p>
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
      {/* <Link href={`/products/${product.id}`}> */}
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
        {product.designerId}
      </p>
      <h3 className="text-sm font-semibold mb-1 group-hover:text-muted-foreground transition-colors">
        {product.name}
      </h3>
      <div className="flex justify-between">
        {" "}
        <p className="text-sm text-muted-foreground mb-2">
          ${product.price.toFixed(2)}
        </p>
        <div className="relative   opacity-0 group-hover:opacity-100 transition cursor-pointer">
          <ShoppingCart size={22} onClick={handleAddToCart} />

          {/* Plus Badge */}
          <Plus
            size={12}
            className="absolute -top-1 -right-1 bg-black text-white 
      rounded-full p-[2px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400 text-sm">{"★★★★★"}</div>
        <span className="text-xs text-muted-foreground">
          {product.rating} ({product.reviews})
        </span>
      </div>
      {/* </Link> */}
    </div>
  );
}
