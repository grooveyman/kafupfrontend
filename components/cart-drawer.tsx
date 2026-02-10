"use client";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, X } from "lucide-react";
// import { createCheckoutSession } from "@/app/actions/stripe";
import { useState } from "react";
import Link from "next/link";

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    total,
    clearCart,
    isOpen,
    setIsOpen,
  } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 "
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-lg z-[70] transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X size={20} className="cursor-pointer" />
          </Button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-secondary rounded-lg p-3 border border-border"
                >
                  {/* Cover */}
                  <img
                    src={
                      item.coverImage
                        ? `data:image/jpeg;base64,${item.coverImage}`
                        : "/placeholder.svg"
                    }
                    alt={item.title}
                    className="w-16 h-24 object-cover rounded-lg"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-7 w-7 p-0 cursor-pointer"
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-7 w-7 p-0 cursor-pointer"
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive hover:text-destructive h-8 w-8 p-0 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-4 sm:p-6 space-y-4">
              <div className="space-y-2 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link href={"/checkout"}>
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full cursor-pointer"
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </Button>
              </Link>
              {/* <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Processing..." : "Checkout"}
              </Button> */}

              <Button
                variant="ghost"
                className="w-full text-destructive text-xs"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
