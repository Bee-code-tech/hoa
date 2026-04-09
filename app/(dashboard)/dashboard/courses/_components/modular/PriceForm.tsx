"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, X } from "lucide-react"

interface PriceFormProps {
  initialData: {
    price: number
  }
  onSave: (price: number) => void
}

export default function PriceForm({ initialData, onSave }: PriceFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState<number | string>(initialData.price)

  useEffect(() => {
    setValue(initialData.price)
  }, [initialData.price])

  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = () => {
    onSave(Number(value))
    setIsEditing(false)
  }

  return (
    <div className="mt-6 border bg-primary/5 rounded-2xl p-6">
      <div className="font-semibold flex items-center justify-between">
        Course Price
        <Button onClick={toggleEdit} variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary">
          {isEditing ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><Pencil className="size-4" /> Edit price</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-lg font-medium mt-2">
          {initialData.price === 0 ? "Free" : `£${initialData.price}`}
        </p>
      )}
      {isEditing && (
        <div className="space-y-4 mt-4">
          <Input
            type="number"
            step="0.01"
            placeholder="e.g. '199'"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex items-center gap-x-2">
            <Button
              onClick={onSubmit}
              disabled={value === ""}
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
