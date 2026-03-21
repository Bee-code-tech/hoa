"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, X } from "lucide-react"

interface TitleFormProps {
  initialData: {
    title: string
  }
  onSave: (title: string) => void
}

export default function TitleForm({ initialData, onSave }: TitleFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialData.title)

  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = () => {
    onSave(value)
    setIsEditing(false)
  }

  return (
    <div className="mt-6 border bg-primary/5 rounded-2xl p-6">
      <div className="font-semibold flex items-center justify-between">
        Course Title
        <Button onClick={toggleEdit} variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary">
          {isEditing ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><Pencil className="size-4" /> Edit title</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-lg font-medium mt-2">
          {initialData.title || "No title set"}
        </p>
      )}
      {isEditing && (
        <div className="space-y-4 mt-4">
          <Input
            disabled={false}
            placeholder="e.g. 'Advanced Security Management'"
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
