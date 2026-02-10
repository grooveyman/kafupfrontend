"use client";

import { useTheme } from "next-themes";
import { Monitor, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const themes = [
  { key: "system", icon: Monitor },
  { key: "light", icon: Sun },
  { key: "dark", icon: Moon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative flex items-center rounded-full bg-muted p-1 border border-white/30 -mt-2">
      {/* Sliding background */}
      <motion.div
        layout
        className="absolute h-8 w-8 rounded-full bg-background shadow"
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          left: theme === "system" ? 4 : theme === "light" ? 36 : 68,
        }}
      />

      {themes.map(({ key, icon: Icon }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
          aria-label={`Switch to ${key} theme`}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
