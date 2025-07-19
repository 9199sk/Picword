import { ImageGallery } from "@/components/image-gallery"
import { HeroSection } from "@/components/hero-section"
import { FilterBar } from "@/components/filter-bar"

export default function HomePage() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <FilterBar />
      <ImageGallery />
    </div>
  )
}
