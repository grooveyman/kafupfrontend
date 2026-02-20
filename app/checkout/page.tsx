"use client";

import React from "react";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/footer";
import { api } from "@/config/config";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api";
import { useCart } from "@/lib/cart-context";

export interface CartType {
  quantity: number;
  cartItems: CartItemType[];
}
export interface OrderType {
  total: number;
  quantity: number;
  customer: CustomerType;
  cart: CartType;
}
export interface CartVariation {
  size: string;
  color: string;
  price: number;
  quantity: number;
}
export interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  previmg: string;
  variations?: CartVariation[];
}

export interface CustomerType {
  fullname: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
}
export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">(
    "shipping",
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });
  const { items: cartItems, total } = useCart();
  // const defaultTotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [customerInfo, setCustomerInfo] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: "",
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const order = {
      total: 301,
      quantity: 200,
      customer: {
        email: "customer@example.com",
        fullname: "Kofi Adjoa",
        phoneNumber: "+233245678901",
        deliveryAddress: "123 Main Street",
        city: "Accra",
        region: "Greater Accra",
      },
      cart: {
        quantity: cartQuantity,
        cartItems: [
          {
            id: "e30bbcca-5a86-47b0-aefc-010dbd669833",
            name: "Some design",
            previmg: "https://res.cloudinary.com/dzcmadjlq/image/upload/v1702054417/kafup/products/design-uuid-123.png",
            quantity: 2,
            size: "M",
            color: "red",
            price: 150.5,
            total: 301,
            variations: [{
              color: "red",
              quantity: 2,
              size: "L",
            }],
            designer:{
              code: "DES208636",
              name: "John Doe",
              profileImg: "https://res.cloudinary.com/dzcmadjlq/image/upload/v1702054417/kafup/designers/designer-uuid-123.png",
            }
          },
        ],
      }
    };
    console.log(order);
    mutation.mutate(order);
  };

  const mutation = useApiMutation<{
    message: string;
    access_code: string;
    status: boolean;
    error?: string;
    reference: string;
  }>("/orders/processOrder", "POST", {
    onSuccess: (data: any) => {
      //create payment popup
      console.log("response from order");
      console.log(data);
      if (data.status) {
        import("@paystack/inline-js")
          .then((m) => {
            const PaystackPop = m?.default || m;
            const popup = new PaystackPop();
            popup.resumeTransaction(data.access_code, {
              onSuccess: () => {
                console.log(`payment successful: reference:${data.reference}`);
                setStep("confirmation");
              },
              onCancel: () => {
                toast.error("Payment cancelled");
              },
            });
          })
          .catch((err) => {
            console.error("Failed to load Paystack library:", err);
            toast.error("Payment initialization failed");
          });
      } else {
        toast.error(data.error);
      }
    },

    onError: (error: any) => {
      console.log("FULL ERROR:", error);
      console.log("SERVER RESPONSE:", error?.response?.data);
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
        <Header />
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center">
          <Card className="p-12 border-border text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Your order has been successfully placed. Order #ORD-12345
            </p>
            <div className="bg-secondary/20 rounded-lg p-6 mb-8 text-left">
              <p className="text-sm text-muted-foreground mb-2">
                Estimated Delivery
              </p>
              <p className="font-semibold">5-7 Business Days</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/orders" className="flex-1">
                <Button className="w-full">View Order</Button>
              </Link>
              <Link href="/shop" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/cart">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-border">
              <h1 className="text-xl font-bold mb-2">
                {step === "shipping"
                  ? "Shipping Information"
                  : "Payment Details"}
              </h1>
              <p className="text-muted-foreground text-xs mb-8">
                {step === "shipping"
                  ? "Where should we deliver your order?"
                  : "How would you like to pay?"}
              </p>

              {step === "shipping" && (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        First Name
                      </label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Address
                    </label>
                    <Input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>

                  {/* City, State, Zip */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        City
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        State
                      </label>
                      <Input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Zip Code
                      </label>
                      <Input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-8">
                    Continue to Payment
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 border-border sticky top-24">
              <h2 className="font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span> GH₵ {item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>
                    GH₵
                    {cartItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span> GH₵ 50</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Tax</span>
                  <span> GH₵ 77</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="">
                    GH₵{" "}
                    {cartItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0,
                    )}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
