"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MessageCircle, MoreHorizontal, Trash2, Flag, Heart } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface Comment {
  id: string
  content: string
  author: {
    name: string
    image: string
    email: string
  }
  createdAt: string
  likes: number
  isLiked: boolean
}

interface CommentSectionProps {
  imageId: string
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: "1",
    content: "Absolutely stunning photograph! The composition and lighting are perfect.",
    author: {
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40",
      email: "john@example.com",
    },
    createdAt: "2024-01-15T10:30:00Z",
    likes: 12,
    isLiked: false,
  },
  {
    id: "2",
    content: "This reminds me of my trip to the mountains last summer. Beautiful capture!",
    author: {
      name: "Sarah Wilson",
      image: "/placeholder.svg?height=40&width=40",
      email: "sarah@example.com",
    },
    createdAt: "2024-01-14T15:45:00Z",
    likes: 8,
    isLiked: true,
  },
  {
    id: "3",
    content: "The colors in this image are so vibrant and natural. Great work!",
    author: {
      name: "Mike Johnson",
      image: "/placeholder.svg?height=40&width=40",
      email: "mike@example.com",
    },
    createdAt: "2024-01-13T09:20:00Z",
    likes: 15,
    isLiked: false,
  },
]

export function CommentSection({ imageId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, signIn, isAdmin } = useAuth()
  const { toast } = useToast()

  const handleSubmitComment = async () => {
    if (!user) {
      signIn()
      return
    }

    if (!newComment.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: {
        name: user.name || "Anonymous",
        image: user.image || "/placeholder.svg?height=40&width=40",
        email: user.email || "",
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    }

    setComments((prev) => [comment, ...prev])
    setNewComment("")
    setIsSubmitting(false)

    toast({
      title: "Comment posted",
      description: "Your comment has been added successfully",
    })
  }

  const handleLikeComment = (commentId: string) => {
    if (!user) {
      signIn()
      return
    }

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          }
        }
        return comment
      }),
    )
  }

  const handleDeleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId))
    toast({
      title: "Comment deleted",
      description: "The comment has been removed",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        <div className="space-y-4">
          {user ? (
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={user.image || ""} />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="Share your thoughts about this image..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-20"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim() || isSubmitting}
                    className="min-w-24"
                  >
                    {isSubmitting ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 bg-muted rounded-lg">
              <p className="text-muted-foreground mb-3">Sign in to join the conversation</p>
              <Button onClick={signIn}>Sign In with Google</Button>
            </div>
          )}
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-4 rounded-lg border bg-card">
              <Avatar>
                <AvatarImage src={comment.author.image || "/placeholder.svg"} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-sm text-muted-foreground">{formatDate(comment.createdAt)}</span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Flag className="mr-2 h-4 w-4" />
                        Report
                      </DropdownMenuItem>
                      {(isAdmin || (user && user.email === comment.author.email)) && (
                        <DropdownMenuItem onClick={() => handleDeleteComment(comment.id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-sm leading-relaxed">{comment.content}</p>

                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikeComment(comment.id)}
                    className={`gap-1 ${comment.isLiked ? "text-red-500" : "text-muted-foreground"}`}
                  >
                    <Heart className={`h-4 w-4 ${comment.isLiked ? "fill-current" : ""}`} />
                    {comment.likes}
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
