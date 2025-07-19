"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Download, Eye, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageCardProps {
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
  }
  index: number
}

export function ImageCard({ image, index }: ImageCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(image.likes)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
        "bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800",
      )}
    >
      <Link href={`/image/${image.id}`}>
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse",
                imageLoaded && "hidden",
              )}
            />

            <Image
              src={image.imageUrl || "/placeholder.svg"}
              alt={image.title}
              fill
              className={cn(
                "object-cover transition-all duration-500 group-hover:scale-105",
                !imageLoaded && "opacity-0",
              )}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-white/90 text-gray-900 backdrop-blur-sm">
                {image.category}
              </Badge>
            </div>

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-gray-900 backdrop-blur-sm"
                onClick={handleLike}
              >
                <Heart className={cn("h-4 w-4", isLiked && "fill-red-500 text-red-500")} />
              </Button>
            </div>

            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{image.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{Math.floor(image.downloads * 0.7)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {image.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{image.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback className="text-xs">{image.uploadedBy.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{image.uploadedBy}</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatDate(image.uploadedAt)}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Heart className="h-4 w-4" />
                <span>{likeCount}</span>
              </div>
              <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
