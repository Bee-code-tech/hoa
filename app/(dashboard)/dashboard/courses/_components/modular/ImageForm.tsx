"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, X, ImageIcon, Layout } from "lucide-react"
import Image from "next/image"

interface ImageFormProps {
  initialData: {
    image: string
  }
  onSave: (image: string) => void
}

export default function ImageForm({ initialData, onSave }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialData.image)

  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = () => {
    onSave(value)
    setIsEditing(false)
  }

  return (
    <div className="mt-6 border bg-primary/5 rounded-2xl p-6">
      <div className="font-semibold flex items-center justify-between">
        Course Image
        <Button onClick={toggleEdit} variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary">
          {isEditing ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><Pencil className="size-4" /> Edit image</>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.image ? (
          <div className="flex items-center justify-center h-48 bg-muted rounded-xl mt-4 border-2 border-dashed">
            <ImageIcon className="size-10 text-muted-foreground" />
          </div>
        ) : (
          <div className="relative aspect-video mt-4 overflow-hidden rounded-xl border group">
            <Image
              alt="Course"
              fill
              className="object-cover transition-transform group-hover:scale-105"
              src={initialData.image}
            />
          </div>
        )
      )}
      {isEditing && (
        <div className="space-y-4 mt-4">
           <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-3">
             <Layout className="size-5 text-primary" />
             <p className="text-xs text-muted-foreground">Please provide a high-quality Unsplash or external image URL for the course thumbnail.</p>
           </div>
          <Input
            placeholder="e.g. 'https://images.unsplash.com/...'"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex items-center gap-x-2">
            <Button
              onClick={onSubmit}
              disabled={!value.trim()}
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
