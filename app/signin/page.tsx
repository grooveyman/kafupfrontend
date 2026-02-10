"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { ArrowRight } from "lucide-react";

export default function SigninPage() {
  const router = useRouter();
  const { signin } = useAuth();

  const [role, setRole] = useState<"designer" | "client" | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (selectedRole: "designer" | "client") => {
    setRole(selectedRole);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select your role");
      return;
    }

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      await signin(formData.email, formData.password, role);
      router.push("/");
    } catch (err) {
      setError("Sign in failed. Please check your credentials and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header />
      <div className="flex items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md border-border">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              {role
                ? `Sign in as ${role === "designer" ? "Designer" : "Client"}`
                : "Select your role to sign in"}
            </p>

            {!role && (
              <div className="space-y-3 mb-8">
                <button
                  onClick={() => handleRoleSelect("designer")}
                  className="w-full p-4 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left font-medium"
                >
                  👗 Designer Account
                </button>
                <button
                  onClick={() => handleRoleSelect("client")}
                  className="w-full p-4 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left font-medium"
                >
                  🛍️ Customer Account
                </button>
              </div>
            )}

            {role && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 rounded text-destructive text-sm">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <button
                  type="button"
                  onClick={() => setRole(null)}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back to role selection
                </button>
              </form>
            )}

            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-accent hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
