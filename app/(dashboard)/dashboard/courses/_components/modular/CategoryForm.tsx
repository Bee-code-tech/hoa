"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, X, Shield, HeartPulse, Monitor, Brain, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CategoryFormProps {
  initialData: {
    category: string
  }
  onSave: (category: string) => void
}

const categories = [
  { label: "Security", value: "Security", icon: Shield },
  { label: "Health & Safety", value: "Health & Safety", icon: HeartPulse },
  { label: "Surveillance", value: "Surveillance", icon: Monitor },
  { label: "Technology", value: "Technology", icon: Brain },
  { label: "Soft Skills", value: "Soft Skills", icon: Tag },
]

export default function CategoryForm({ initialData, onSave }: CategoryFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialData.category)

  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = () => {
    onSave(value)
    setIsEditing(false)
  }

  const selectedCategory = categories.find((c) => c.value === initialData.category)
  const Icon = selectedCategory?.icon || Tag

  return (
    <div className="mt-6 border bg-primary/5 rounded-2xl p-6">
      <div className="font-semibold flex items-center justify-between">
        Course Category
        <Button onClick={toggleEdit} variant="ghost" size="sm" className="gap-2">
          {isEditing ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><Pencil className="size-4" /> Edit category</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="flex items-center gap-2 mt-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon className="size-4 text-primary" />
          </div>
          <p className="font-medium">{initialData.category || "No category selected"}</p>
        </div>
      )}
      {isEditing && (
        <div className="space-y-4 mt-4">
          <Select onValueChange={setValue} defaultValue={value}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center gap-2">
                    <category.icon className="size-4 text-primary" />
                    {category.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-x-2">
            <Button
              onClick={onSubmit}
              disabled={!value}
              size="sm"
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
