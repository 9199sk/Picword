"use client"

import { useState } from "react"
import { ImageCard } from "@/components/image-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Updated mock data with real demo images
const mockImages = [
  {
    id: "img-1",
    title: "Mountain Lake Reflection",
    description: "A serene mountain lake with perfect reflections of snow-capped peaks during golden hour",
    category: "Nature",
    imageUrl: "/demo/nature-1.jpg",
    uploadedBy: "Admin",
    uploadedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    downloads: 1247,
    likes: 892,
    qualities: {
      low: "/demo/nature-1.jpg",
      medium: "/demo/nature-1.jpg",
      high: "/demo/nature-1.jpg",
      original: "/demo/nature-1.jpg",
    },
  },
  {
    id: "img-2",
    title: "Forest Path Adventure",
    description: "A mystical forest path leading through ancient trees with dappled sunlight",
    category: "Nature",
    imageUrl: "/demo/nature-2.jpg",
    uploadedBy: "Admin",
    uploadedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    downloads: 856,
    likes: 634,
    qualities: {
      low: "/demo/nature-2.jpg",
      medium: "/demo/nature-2.jpg",
      high: "/demo/nature-2.jpg",
      original: "/demo/nature-2.jpg",
    },
  },
  {
    id: "img-3",
    title: "Modern Skyscraper",
    description: "Contemporary glass architecture reaching towards the sky with geometric patterns",
    category: "Architecture",
    imageUrl: "/demo/architecture-1.jpg",
    uploadedBy: "Admin",
    uploadedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    downloads: 723,
    likes: 445,
    qualities: {
      low: "/demo/architecture-1.jpg",
      medium: "/demo/architecture-1.jpg",
      high: "/demo/architecture-1.jpg",
      original: "/demo/architecture-1.jpg",
    },
  },
  {
    id: "img-4",
    title: "Urban Bridge Design",
    description: "Stunning architectural bridge design with modern engineering and artistic elements",
    category: "Architecture",
    imageUrl: "/demo/architecture-2.jpg",
    uploadedBy: "Admin",
    uploadedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    downloads: 612,
    likes: 378,
    qualities: {
      low: "/demo/architecture-2.jpg",
      medium: "/demo/architecture-2.jpg",
      high: "/demo/architecture-2.jpg",
      original: "/demo/architecture-2.jpg",
    },
  },
  {
    id: "img-5",
    title: "Professional Portrait",
    description: "Elegant professional headshot with perfect lighting and composition",
    category: "People",
    imageUrl: "/demo/people-1.jpg",
    uploadedBy: "Admin",
    uploadedAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    downloads: 934,
    likes: 567,
    qualities: {
      low: "/demo/people-1.jpg",
      medium: "/demo/people-1.jpg",
      high: "/demo/people-1.jpg",
      original: "/demo/people-1.jpg",
    },
  },
  {
    id: "img-6",
    title: "Creative Portrait Study",
    description: "Artistic portrait photography with dramatic lighting and creative composition",
    category: "People",
    imageUrl: "/demo/people-2.jpg",
    uploadedBy: "Admin",
    uploadedAt: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
    downloads: 789,
    likes: 423,
    qualities: {
      low: "/demo/people-2.jpg",
      medium: "/demo/people-2.jpg",
      high: "/demo/people-2.jpg",
      original: "/demo/people-2.jpg",
    },
  },
  {
    id: "img-7",
    title: "Laptop Workspace",
    description: "Modern workspace setup with laptop and technology accessories in clean environment",
    category: "Technology",
    imageUrl: "/demo/technology-1.jpg",
    uploadedBy: "Admin",
    uploadedAt: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
    downloads: 1156,
    likes: 678,
    qualities: {
      low: "/demo/technology-1.jpg",
      medium: "/demo/technology-1.jpg",
      high: "/demo/technology-1.jpg",
      original: "/demo/technology-1.jpg",
    },
  },
  {
    id: "img-8",
    title: "AI Robot Concept",
    description: "Futuristic AI robot design showcasing advanced technology and innovation",
    category: "Technology",
    imageUrl: "/demo/technology-2.jpg",
    uploadedBy: "Admin",
    uploadedAt: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
    downloads: 845,
    likes: 512,
    qualities: {
      low: "/demo/technology-2.jpg",
      medium: "/demo/technology-2.jpg",
      high: "/demo/technology-2.jpg",
      original: "/demo/technology-2.jpg",
    },
  },
  {
    id: "img-9",
    title: "Abstract Color Flow",
    description: "Vibrant abstract composition with flowing colors and dynamic movement",
    category: "Abstract",
    imageUrl: "/demo/abstract-1.jpg",
    uploadedBy: "Admin",
    uploadedAt: new Date(Date.now() - 777600000).toISOString(), // 9 days ago
    downloads: 667,
    likes: 389,
    qualities: {
      low: "/demo/abstract-1.jpg",
      medium: "/demo/abstract-1.jpg",
      high: "/demo/abstract-1.jpg",
      original: "/demo/abstract-1.jpg",
    },
  },
  {
    id: "img-10",
    title: "Geometric Patterns",
    description: "Mesmerizing geometric patterns with perfect symmetry and color harmony",
    category: "Abstract",
    imageUrl: "/demo/abstract-2.jpg",
    uploadedBy: "Admin",
    uploadedAt: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
    downloads: 534,
    likes: 298,
    qualities: {
      low: "/demo/abstract-2.jpg",
      medium: "/demo/abstract-2.jpg",
      high: "/demo/abstract-2.jpg",
      original: "/demo/abstract-2.jpg",
    },
  },
  // Additional placeholder images to fill the gallery
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `img-${i + 11}`,
    title: `Beautiful Image ${i + 11}`,
    description: `A stunning photograph showcasing amazing details and composition ${i + 11}`,
    category: ["Nature", "Architecture", "People", "Technology", "Abstract"][i % 5],
    imageUrl: `/placeholder.svg?height=400&width=600&text=Image+${i + 11}`,
    uploadedBy: "Admin",
    uploadedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    downloads: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 500),
    qualities: {
      low: `/placeholder.svg?height=200&width=300&text=Low+${i + 11}`,
      medium: `/placeholder.svg?height=400&width=600&text=Medium+${i + 11}`,
      high: `/placeholder.svg?height=800&width=1200&text=High+${i + 11}`,
      original: `/placeholder.svg?height=1600&width=2400&text=Original+${i + 11}`,
    },
  })),
]

export function ImageGallery() {
  const [images, setImages] = useState(mockImages.slice(0, 12))
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const currentLength = images.length
    const newImages = mockImages.slice(currentLength, currentLength + 8)

    if (newImages.length === 0) {
      setHasMore(false)
    } else {
      setImages((prev) => [...prev, ...newImages])
    }

    setLoading(false)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <ImageCard key={image.id} image={image} index={index} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button onClick={loadMore} disabled={loading} size="lg" variant="outline" className="min-w-32 bg-transparent">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}

      {!hasMore && (
        <div className="text-center text-muted-foreground">
          <p>You've reached the end of our gallery!</p>
        </div>
      )}
    </div>
  )
}
