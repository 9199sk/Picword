"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, ImageIcon, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const categories = [
  "Nature",
  "Architecture",
  "People",
  "Technology",
  "Abstract",
  "Animals",
  "Food",
  "Travel",
  "Art",
  "Sports",
]

interface ImageUpload {
  file: File
  preview: string
  title: string
  description: string
  category: string
  tags: string[]
}

export function ImageUploadModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [uploads, setUploads] = useState<ImageUpload[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newUpload: ImageUpload = {
            file,
            preview: e.target?.result as string,
            title: file.name.replace(/\.[^/.]+$/, ""),
            description: "",
            category: "",
            tags: [],
          }
          setUploads((prev) => [...prev, newUpload])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const updateUpload = (index: number, updates: Partial<ImageUpload>) => {
    setUploads((prev) => prev.map((upload, i) => (i === index ? { ...upload, ...updates } : upload)))
  }

  const removeUpload = (index: number) => {
    setUploads((prev) => prev.filter((_, i) => i !== index))
  }

  const addTag = (index: number, tag: string) => {
    if (tag.trim()) {
      updateUpload(index, {
        tags: [...uploads[index].tags, tag.trim()],
      })
    }
  }

  const removeTag = (index: number, tagIndex: number) => {
    updateUpload(index, {
      tags: uploads[index].tags.filter((_, i) => i !== tagIndex),
    })
  }

  const handleUpload = async () => {
    if (uploads.length === 0) return

    setIsUploading(true)

    try {
      // Simulate upload process
      for (let i = 0; i < uploads.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Here you would upload to your storage service (Cloudinary, AWS S3, etc.)
      }

      toast({
        title: "Upload successful",
        description: `${uploads.length} image(s) uploaded successfully`,
      })

      setUploads([])
      setIsOpen(false)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your images",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <Upload className="mr-2 h-5 w-5" />
          Upload New Images
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Images</DialogTitle>
          <DialogDescription>Upload and configure your images for the gallery</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Upload Area */}
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Click to upload images</p>
              <p className="text-sm text-muted-foreground">Support for JPG, PNG, WebP files. Multiple files allowed.</p>
            </label>
          </div>

          {/* Upload Queue */}
          {uploads.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Images to Upload ({uploads.length})</h3>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {uploads.map((upload, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={upload.preview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1 mr-4">
                              <div>
                                <Label htmlFor={`title-${index}`}>Title</Label>
                                <Input
                                  id={`title-${index}`}
                                  value={upload.title}
                                  onChange={(e) => updateUpload(index, { title: e.target.value })}
                                  placeholder="Enter image title"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`description-${index}`}>Description</Label>
                                <Textarea
                                  id={`description-${index}`}
                                  value={upload.description}
                                  onChange={(e) => updateUpload(index, { description: e.target.value })}
                                  placeholder="Enter image description"
                                  rows={2}
                                />
                              </div>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeUpload(index)}
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Label>Category</Label>
                              <Select
                                value={upload.category}
                                onValueChange={(value) => updateUpload(index, { category: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Tags</Label>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {upload.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="secondary" className="gap-1">
                                    {tag}
                                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(index, tagIndex)} />
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Add tag"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      addTag(index, e.currentTarget.value)
                                      e.currentTarget.value = ""
                                    }
                                  }}
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                    addTag(index, input.value)
                                    input.value = ""
                                  }}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setUploads([])} disabled={isUploading}>
                  Clear All
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={isUploading || uploads.some((u) => !u.title || !u.category)}
                  className="min-w-32"
                >
                  {isUploading ? "Uploading..." : `Upload ${uploads.length} Image${uploads.length > 1 ? "s" : ""}`}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
