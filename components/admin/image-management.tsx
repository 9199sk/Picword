"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, MoreHorizontal, Edit, Trash2, Eye, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for images
const mockImages = Array.from({ length: 15 }, (_, i) => ({
  id: `img-${i + 1}`,
  title: `Image ${i + 1}`,
  description: `Description for image ${i + 1}`,
  category: ["Nature", "Architecture", "People", "Technology", "Abstract"][i % 5],
  imageUrl: `/placeholder.svg?height=100&width=150&text=Image+${i + 1}`,
  uploadedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  downloads: Math.floor(Math.random() * 1000),
  likes: Math.floor(Math.random() * 500),
  views: Math.floor(Math.random() * 2000),
  status: Math.random() > 0.1 ? "published" : "draft",
}))

export function ImageManagement() {
  const [images, setImages] = useState(mockImages)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImage, setSelectedImage] = useState<(typeof mockImages)[0] | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { toast } = useToast()

  const filteredImages = images.filter(
    (image) =>
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId))
    setShowDeleteDialog(false)
    setSelectedImage(null)
    toast({
      title: "Image deleted",
      description: "The image has been removed from the gallery",
    })
  }

  const handleStatusToggle = (imageId: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId ? { ...img, status: img.status === "published" ? "draft" : "published" } : img,
      ),
    )
    toast({
      title: "Status updated",
      description: "Image status has been changed",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Image Management</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredImages.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <div className="relative w-16 h-12 rounded overflow-hidden">
                      <Image
                        src={image.imageUrl || "/placeholder.svg"}
                        alt={image.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{image.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{image.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{image.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={image.status === "published" ? "default" : "secondary"}
                      className={image.status === "published" ? "bg-green-100 text-green-800" : ""}
                    >
                      {image.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{image.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{image.downloads}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(image.uploadedAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusToggle(image.id)}>
                          {image.status === "published" ? "Unpublish" : "Publish"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedImage(image)
                            setShowDeleteDialog(true)
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedImage?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => selectedImage && handleDelete(selectedImage.id)}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
