import { ImageDetailView } from "@/components/image-detail-view"
import { CommentSection } from "@/components/comment-section"

interface ImagePageProps {
  params: Promise<{ id: string }>
}

export default async function ImagePage({ params }: ImagePageProps) {
  const { id } = await params

  // Mock data with real demo images
  const demoImages = {
    "img-1": {
      id: "img-1",
      title: "Mountain Lake Reflection",
      description:
        "A serene mountain lake with perfect reflections of snow-capped peaks during golden hour. This breathtaking landscape captures the tranquil beauty of nature at its finest.",
      category: "Nature",
      imageUrl: "/demo/nature-1.jpg",
      uploadedBy: "Admin",
      uploadedAt: new Date(Date.now() - 86400000).toISOString(),
      downloads: 1247,
      likes: 892,
      qualities: {
        low: "/demo/nature-1.jpg",
        medium: "/demo/nature-1.jpg",
        high: "/demo/nature-1.jpg",
        original: "/demo/nature-1.jpg",
      },
    },
    "img-2": {
      id: "img-2",
      title: "Forest Path Adventure",
      description:
        "A mystical forest path leading through ancient trees with dappled sunlight filtering through the canopy, creating an enchanting atmosphere.",
      category: "Nature",
      imageUrl: "/demo/nature-2.jpg",
      uploadedBy: "Admin",
      uploadedAt: new Date(Date.now() - 172800000).toISOString(),
      downloads: 856,
      likes: 634,
      qualities: {
        low: "/demo/nature-2.jpg",
        medium: "/demo/nature-2.jpg",
        high: "/demo/nature-2.jpg",
        original: "/demo/nature-2.jpg",
      },
    },
  }

  const imageData = demoImages[id as keyof typeof demoImages] || {
    id,
    title: "Sample Image",
    description: "A beautiful photograph showcasing amazing details and composition",
    category: "Nature",
    uploadedBy: "Admin",
    uploadedAt: new Date().toISOString(),
    imageUrl: `/placeholder.svg?height=600&width=800`,
    qualities: {
      low: `/placeholder.svg?height=300&width=400`,
      medium: `/placeholder.svg?height=600&width=800`,
      high: `/placeholder.svg?height=1200&width=1600`,
      original: `/placeholder.svg?height=2400&width=3200`,
    },
    downloads: 42,
    likes: 128,
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ImageDetailView image={imageData} />
      <CommentSection imageId={id} />
    </div>
  )
}
