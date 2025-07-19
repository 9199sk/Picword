"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Images, Users, Download, MessageSquare, TrendingUp, Eye, Heart, Calendar } from "lucide-react"

const stats = [
  {
    title: "Total Images",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as const,
    icon: Images,
    description: "Images uploaded",
  },
  {
    title: "Total Users",
    value: "5,678",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
    description: "Registered users",
  },
  {
    title: "Downloads",
    value: "23,456",
    change: "+15%",
    changeType: "positive" as const,
    icon: Download,
    description: "Total downloads",
  },
  {
    title: "Comments",
    value: "8,901",
    change: "+5%",
    changeType: "positive" as const,
    icon: MessageSquare,
    description: "User comments",
  },
]

const recentActivity = [
  {
    type: "upload",
    message: 'New image "Mountain Sunset" uploaded',
    time: "2 minutes ago",
    icon: Images,
  },
  {
    type: "download",
    message: "15 downloads in the last hour",
    time: "1 hour ago",
    icon: Download,
  },
  {
    type: "comment",
    message: 'New comment on "Ocean Waves"',
    time: "3 hours ago",
    icon: MessageSquare,
  },
  {
    type: "user",
    message: "3 new users registered",
    time: "5 hours ago",
    icon: Users,
  },
]

const topImages = [
  {
    title: "Mountain Sunset",
    downloads: 1234,
    likes: 567,
    views: 8901,
  },
  {
    title: "Ocean Waves",
    downloads: 987,
    likes: 432,
    views: 6543,
  },
  {
    title: "City Lights",
    downloads: 765,
    likes: 321,
    views: 4567,
  },
  {
    title: "Forest Path",
    downloads: 543,
    likes: 234,
    views: 3456,
  },
]

export function AdminStats() {
  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Badge variant={stat.changeType === "positive" ? "default" : "destructive"} className="text-xs">
                  {stat.change}
                </Badge>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="p-2 rounded-full bg-primary/10">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Performing Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Images className="h-5 w-5" />
              Top Performing Images
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topImages.map((image, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{image.title}</span>
                  <Badge variant="outline">#{index + 1}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {image.downloads}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {image.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {image.views}
                  </div>
                </div>
                <Progress value={(image.downloads / 1500) * 100} className="h-1" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            This Month's Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Images Uploaded</span>
                <span className="text-2xl font-bold">127</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">85% of monthly goal</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">New Users</span>
                <span className="text-2xl font-bold">456</span>
              </div>
              <Progress value={76} className="h-2" />
              <p className="text-xs text-muted-foreground">76% of monthly goal</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Downloads</span>
                <span className="text-2xl font-bold">3.2K</span>
              </div>
              <Progress value={92} className="h-2" />
              <p className="text-xs text-muted-foreground">92% of monthly goal</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
