import React from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CartDrawer from "@/components/cart-drawer";
import { Toaster } from "sonner";
import Providers from "./providers/page";

const geist = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2",
  variable: "--font-geist",
  display: "swap",
});

const geistMono = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KafUP - Fashion Designer Marketplace",
  description:
    "Connect with fashion designers and discover unique collections. Shop and sell premium fashion designs.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.className} antialiased bg-background text-foreground`}
      >
        <Toaster richColors position="top-right" />
        <Providers>
          <CartDrawer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
