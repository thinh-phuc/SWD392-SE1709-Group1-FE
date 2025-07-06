import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Holiday Deals</h2>
            <p className="text-xl mb-6">Save up to 70% on top brands and products</p>
            <Button size="lg" className="bg-orange-400 hover:bg-orange-500 text-black font-bold">
              Shop Now
            </Button>
          </div>
          <div className="relative">
            <img src="/placeholder.svg?height=300&width=400" alt="Holiday deals" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
