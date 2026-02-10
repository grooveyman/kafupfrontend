import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      <div className="flex items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-6xl font-bold text-accent mb-4">404</p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Page Not Found</h1>
          <p className="text-muted-foreground text-xl mb-8 max-w-md">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">Go Home</Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
