"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Download, Eye, Calendar, Share2, Bookmark } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface ImageDetailViewProps {
  image: {
    id: string
    title: string
    description: string
    category: string
    imageUrl: string
    uploadedBy: string
    uploadedAt: string
    downloads: number
    likes: number
    qualities: {
      low: string
      medium: string
      high: string
      original: string
    }
  }
}

export function ImageDetailView({ image }: ImageDetailViewProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(image.likes)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { user, signIn } = useAuth()
  const { toast } = useToast()

  const handleLike = () => {
    if (!user) {
      signIn()
      return
    }
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleBookmark = () => {
    if (!user) {
      signIn()
      return
    }
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Image removed from your collection" : "Image saved to your collection",
    })
  }

  const handleDownload = (quality: string, url: string) => {
    if (!user) {
      signIn()
      return
    }

    // Simulate download
    const link = document.createElement("a")
    link.href = url
    link.download = `${image.title}-${quality}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download started",
      description: `Downloading ${image.title} in ${quality} quality`,
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Image link copied to clipboard",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-[4/3]">
              <Image
                src={image.imageUrl || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl">{image.title}</CardTitle>
                <Badge variant="secondary">{image.category}</Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLike}
                  className={isLiked ? "text-red-500 border-red-200" : ""}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                </Button>
                <Button size="sm" variant="outline" onClick={handleBookmark}>
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                </Button>
                <Button size="sm" variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{image.description}</p>

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{image.uploadedBy.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{image.uploadedBy}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(image.uploadedAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{likeCount} likes</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>{image.downloads} downloads</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{Math.floor(image.downloads * 1.5)} views</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Download Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!user && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Sign in to download images</p>
                <Button onClick={signIn} size="sm">
                  Sign In with Google
                </Button>
              </div>
            )}

            <div className="space-y-2">
              {Object.entries(image.qualities).map(([quality, url]) => (
                <div key={quality} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium capitalize">{quality}</p>
                    <p className="text-sm text-muted-foreground">
                      {quality === "low" && "300x400px"}
                      {quality === "medium" && "600x800px"}
                      {quality === "high" && "1200x1600px"}
                      {quality === "original" && "2400x3200px"}
                    </p>
                  </div>
                  <Button size="sm" onClick={() => handleDownload(quality, url)} disabled={!user}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
