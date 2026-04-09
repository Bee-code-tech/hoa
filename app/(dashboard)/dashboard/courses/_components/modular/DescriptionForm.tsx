"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DescriptionFormProps {
  initialData: {
    description: string
  }
  onSave: (description: string) => void
}

export default function DescriptionForm({ initialData, onSave }: DescriptionFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialData.description)

  useEffect(() => {
    setValue(initialData.description)
  }, [initialData.description])

  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = () => {
    onSave(value)
    setIsEditing(false)
  }

  return (
    <div className="mt-6 border bg-primary/5 rounded-2xl p-6">
      <div className="font-semibold flex items-center justify-between">
        Course Description
        <Button onClick={toggleEdit} variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary">
          {isEditing ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><Pencil className="size-4" /> Edit description</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2 leading-relaxed text-muted-foreground",
          !initialData.description && "italic"
        )}>
          {initialData.description || "No description set"}
        </p>
      )}
      {isEditing && (
        <div className="space-y-4 mt-4">
          <Textarea
            placeholder="e.g. 'This course covers the fundamentals of...'"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-h-[120px]"
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
