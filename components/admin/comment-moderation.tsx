"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MoreHorizontal, Trash2, Flag, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock comments data
const mockComments = [
  {
    id: "1",
    content: "This is an amazing photograph! The composition is perfect.",
    author: {
      name: "John Doe",
      email: "john@example.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    imageTitle: "Mountain Sunset",
    createdAt: "2024-01-15T10:30:00Z",
    status: "approved",
    reports: 0,
  },
  {
    id: "2",
    content: "Wow, this brings back memories of my trip to the mountains!",
    author: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    imageTitle: "Alpine Lake",
    createdAt: "2024-01-14T15:45:00Z",
    status: "pending",
    reports: 0,
  },
  {
    id: "3",
    content: "This is inappropriate content that should be removed.",
    author: {
      name: "Spam User",
      email: "spam@example.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    imageTitle: "City Lights",
    createdAt: "2024-01-13T09:20:00Z",
    status: "flagged",
    reports: 3,
  },
  {
    id: "4",
    content: "Beautiful colors and lighting in this shot!",
    author: {
      name: "Mike Johnson",
      email: "mike@example.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    imageTitle: "Ocean Waves",
    createdAt: "2024-01-12T14:10:00Z",
    status: "approved",
    reports: 0,
  },
]

export function CommentModeration() {
  const [comments, setComments] = useState(mockComments)
  const [selectedComment, setSelectedComment] = useState<(typeof mockComments)[0] | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { toast } = useToast()

  const handleApprove = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, status: "approved" } : comment)),
    )
    toast({
      title: "Comment approved",
      description: "The comment is now visible to all users",
    })
  }

  const handleReject = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, status: "rejected" } : comment)),
    )
    toast({
      title: "Comment rejected",
      description: "The comment has been hidden from public view",
    })
  }

  const handleDelete = (commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId))
    setShowDeleteDialog(false)
    setSelectedComment(null)
    toast({
      title: "Comment deleted",
      description: "The comment has been permanently removed",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string, reports: number) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "flagged":
        return <Badge className="bg-orange-100 text-orange-800">Flagged ({reports})</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const pendingCount = comments.filter((c) => c.status === "pending").length
  const flaggedCount = comments.filter((c) => c.status === "flagged").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Comment Moderation</h2>
        <div className="flex gap-2">
          <Badge variant="secondary">{pendingCount} Pending</Badge>
          <Badge className="bg-orange-100 text-orange-800">{flaggedCount} Flagged</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{comments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Flagged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{flaggedCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.image || "/placeholder.svg"} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{comment.author.name}</p>
                        <p className="text-xs text-muted-foreground">{comment.author.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm line-clamp-2">{comment.content}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{comment.imageTitle}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(comment.status, comment.reports)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(comment.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {comment.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(comment.id)}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(comment.id)}>
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {comment.status === "approved" && (
                          <DropdownMenuItem onClick={() => handleReject(comment.id)}>
                            <XCircle className="mr-2 h-4 w-4 text-red-600" />
                            Hide
                          </DropdownMenuItem>
                        )}
                        {comment.status === "rejected" && (
                          <DropdownMenuItem onClick={() => handleApprove(comment.id)}>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Flag className="mr-2 h-4 w-4" />
                          View Reports
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedComment(comment)
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
            <DialogTitle>Delete Comment</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete this comment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => selectedComment && handleDelete(selectedComment.id)}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
