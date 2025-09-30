"use client"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

interface MegaDropdownProps {
  isOpen: boolean
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function MegaDropdown({ isOpen, onClose, onMouseEnter, onMouseLeave }: MegaDropdownProps) {
  if (!isOpen) return null

  return (
    <div
      className="absolute top-full left-0 w-full bg-background border-t border-border shadow-lg z-40"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Featured Content */}
          <div className="col-span-3">
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-foreground mb-4">New Arrivals</h3>
              <div className="space-y-3">
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Restyle Trait Dept.
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Building our Singapore together
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Tropical Escape
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Picnic Paradise
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Vacay Mood
                </a>
              </div>
            </div>
          </div>

          {/* Middle Columns - Product Categories */}
          <div className="col-span-6">
            <div className="grid grid-cols-3 gap-8">
              {/* TOPS */}
              <div>
                <div className="flex items-center gap-1 mb-4">
                  <h3 className="text-sm font-medium text-foreground">TOPS</h3>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Shirts
                  </a>
                  <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Tees
                  </a>
                  <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Knits
                  </a>
                </div>
              </div>

              {/* PANTS */}
              <div>
                <div className="flex items-center gap-1 mb-4">
                  <h3 className="text-sm font-medium text-foreground">PANTS</h3>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Trousers
                  </a>
                  <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Bermudas
                  </a>
                </div>
              </div>

              {/* OUTERWEAR */}
              <div>
                <div className="flex items-center gap-1 mb-4">
                  <h3 className="text-sm font-medium text-foreground">OUTERWEAR</h3>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Outerwear
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Featured Product */}
          <div className="col-span-3">
            <div className="relative group cursor-pointer">
              <div className="aspect-[3/4] bg-muted rounded-sm overflow-hidden">
                <Image
                  src="/man-in-white-shirt-and-dark-pants-fashion-model.jpg"
                  alt="Featured product - Man in white shirt and dark pants"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">NEW IN MEN</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown */}
      <div className="fixed inset-0 bg-transparent -z-10" onClick={onClose} />
    </div>
  )
}
