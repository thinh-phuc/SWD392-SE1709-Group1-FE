import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviews: 1234,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Smart Watch Series 8",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 856,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Deal of the Day",
  },
  {
    id: 3,
    name: "Portable Phone Charger",
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.3,
    reviews: 2341,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Lightning Deal",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.4,
    reviews: 567,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Choice",
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviews: 432,
    image: "/placeholder.svg?height=200&width=200",
    badge: "New",
  },
]

export function ProductCarousel({ title }: { title: string }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer min-w-[200px]">
            <CardContent className="p-4">
              <div className="relative mb-3">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <span className="absolute top-2 left-2 bg-orange-400 text-black text-xs px-2 py-1 rounded">
                  {product.badge}
                </span>
              </div>

              <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>

              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">${product.price}</span>
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              </div>

              <div className="text-xs text-green-600 mt-1">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
