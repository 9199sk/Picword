"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

const categories = [
  "All Categories",
  "Nature",
  "Architecture",
  "People",
  "Technology",
  "Abstract",
  "Animals",
  "Food",
  "Travel",
]

const qualities = ["All Qualities", "Low", "Medium", "High", "Original"]

export function FilterBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedQuality, setSelectedQuality] = useState("All Qualities")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category !== "All Categories") {
      setActiveFilters((prev) => [...prev.filter((f) => !categories.includes(f)), category])
    } else {
      setActiveFilters((prev) => prev.filter((f) => !categories.includes(f)))
    }
  }

  const handleQualityChange = (quality: string) => {
    setSelectedQuality(quality)
    if (quality !== "All Qualities") {
      setActiveFilters((prev) => [...prev.filter((f) => !qualities.includes(f)), quality])
    } else {
      setActiveFilters((prev) => prev.filter((f) => !qualities.includes(f)))
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter))
    if (categories.includes(filter)) {
      setSelectedCategory("All Categories")
    }
    if (qualities.includes(filter)) {
      setSelectedQuality("All Qualities")
    }
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setSelectedCategory("All Categories")
    setSelectedQuality("All Qualities")
    setSearchTerm("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 ">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-30">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedQuality} onValueChange={handleQualityChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Quality" />
            </SelectTrigger>
            <SelectContent>
              {qualities.map((quality) => (
                <SelectItem key={quality} value={quality}>
                  {quality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeFilter(filter)} />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
