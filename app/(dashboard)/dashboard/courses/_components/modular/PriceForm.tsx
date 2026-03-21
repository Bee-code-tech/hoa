"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, X } from "lucide-react"

interface PriceFormProps {
  initialData: {
    price: string
  }
  onSave: (price: string) => void
}

export default function PriceForm({ initialData, onSave }: PriceFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialData.price)

  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = () => {
    onSave(value)
    setIsEditing(false)
  }

  return (
    <div className="mt-6 border bg-primary/5 rounded-2xl p-6">
      <div className="font-semibold flex items-center justify-between">
        Course Price
        <Button onClick={toggleEdit} variant="ghost" size="sm" className="gap-2">
          {isEditing ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><Pencil className="size-4" /> Edit price</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-lg font-medium mt-2">
          {initialData.price || <span className="text-muted-foreground italic">No price set</span>}
        </p>
      )}
      {isEditing && (
        <div className="space-y-4 mt-4">
          <Input
            type="text"
            placeholder="e.g. '£450'"
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
