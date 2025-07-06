import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: "Electronics", image: "/placeholder.svg?height=200&width=200", deals: "Up to 40% off" },
  { name: "Fashion", image: "/placeholder.svg?height=200&width=200", deals: "Up to 60% off" },
  { name: "Home & Kitchen", image: "/placeholder.svg?height=200&width=200", deals: "Up to 50% off" },
  { name: "Books", image: "/placeholder.svg?height=200&width=200", deals: "Up to 30% off" },
  { name: "Sports & Outdoors", image: "/placeholder.svg?height=200&width=200", deals: "Up to 45% off" },
  { name: "Beauty", image: "/placeholder.svg?height=200&width=200", deals: "Up to 35% off" },
  { name: "Toys & Games", image: "/placeholder.svg?height=200&width=200", deals: "Up to 55% off" },
  { name: "Automotive", image: "/placeholder.svg?height=200&width=200", deals: "Up to 25% off" },
]

export function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-32 object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-sm text-green-600 font-medium">{category.deals}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
