'use client'

import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, Globe, Users, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">About Vesture</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Empowering fashion designers to connect with global audiences and celebrate creativity through a modern, accessible marketplace.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg mb-4">
                Vesture is dedicated to revolutionizing the fashion industry by providing independent designers with a platform to showcase their talent and connect with customers who appreciate unique, carefully crafted designs.
              </p>
              <p className="text-muted-foreground text-lg">
                We believe in the power of creative expression and aim to make premium fashion accessible to everyone while supporting artisans globally.
              </p>
            </div>
            <Card className="p-8 border-border bg-accent/5">
              <div className="space-y-6">
                {[
                  { icon: Sparkles, title: 'Creative Freedom', desc: 'Design without limits' },
                  { icon: Globe, title: 'Global Reach', desc: 'Sell worldwide instantly' },
                  { icon: Users, title: 'Community', desc: 'Connect with fashion lovers' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex gap-3">
                      <Icon className="h-6 w-6 text-accent flex-shrink-0" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Authenticity',
                description: 'We celebrate genuine creative expression and unique perspectives from designers worldwide.',
              },
              {
                title: 'Accessibility',
                description: 'Fashion should be accessible. We make premium designs available at fair prices.',
              },
              {
                title: 'Innovation',
                description: 'We continuously improve our platform to provide the best experience for designers and customers.',
              },
              {
                title: 'Sustainability',
                description: 'We promote ethical fashion practices and support designers who prioritize sustainability.',
              },
            ].map((value, i) => (
              <Card key={i} className="p-6 border-border">
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '5K+', label: 'Designers' },
              { number: '50K+', label: 'Products' },
              { number: '100K+', label: 'Happy Customers' },
              { number: '150+', label: 'Countries' },
            ].map((stat, i) => (
              <Card key={i} className="p-6 border-border">
                <p className="text-4xl font-bold text-accent mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Vesture Community</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Whether you're a designer ready to showcase your talent or a customer looking for unique styles, Vesture is your platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=designer">
              <Button size="lg">Become a Designer</Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center text-sm text-muted-foreground">
          <p>© 2025 Vesture. All rights reserved. | Design your fashion legacy.</p>
        </div>
      </footer>
    </div>
  )
}
