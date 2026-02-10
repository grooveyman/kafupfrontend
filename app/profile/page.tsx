'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { Mail, MapPin, Edit2 } from 'lucide-react'

export default function ProfilePage() {
  const { user, role } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Card className="text-center p-8">
            <p className="text-lg font-medium mb-4">Please sign in to view your profile</p>
            <Link href="/signin">
              <Button>Sign In</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <Card className="p-8 border-border mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-24 w-24 rounded-full border-4 border-accent/20" />
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground capitalize mt-1">{role} Account</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Global
                  </div>
                </div>
              </div>
            </div>
            <Button className="gap-2">
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Account Stats */}
        {role === 'designer' ? (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Total Products', value: '12', icon: '👗' },
              { label: 'Total Sales', value: '$4,829', icon: '💰' },
              { label: 'Followers', value: '234', icon: '👥' },
            ].map((stat, i) => (
              <Card key={i} className="p-6 border-border text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Orders', value: '12', icon: '📦' },
              { label: 'Favorites', value: '47', icon: '❤️' },
              { label: 'Spent', value: '$3,456', icon: '💳' },
            ].map((stat, i) => (
              <Card key={i} className="p-6 border-border text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Links */}
        <Card className="p-8 border-border">
          <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {role === 'designer' ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    My Products
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Sales & Orders
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Settings
                </Button>
              </>
            ) : (
              <>
                <Link href="/shop">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Order History
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Wishlist
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Settings
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
