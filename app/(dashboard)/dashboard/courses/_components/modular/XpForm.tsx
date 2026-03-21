"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, X, Star } from "lucide-react"

interface XpFormProps {
  initialData: {
    xp: number
  }
  onSave: (xp: number) => void
}

export default function XpForm({ initialData, onSave }: XpFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialData.xp)

  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = () => {
    onSave(Number(value))
    setIsEditing(false)
  }

  return (
    <div className="mt-6 border bg-accent/30 rounded-2xl p-6">
      <div className="font-semibold flex items-center justify-between">
        XP Reward
        <Button onClick={toggleEdit} variant="ghost" size="sm" className="gap-2">
          {isEditing ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><Pencil className="size-4" /> Edit XP</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="flex items-center gap-2 mt-2">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <Star className="size-4 text-yellow-600 fill-yellow-600" />
          </div>
          <p className="font-bold text-lg">{initialData.xp} XP</p>
        </div>
      )}
      {isEditing && (
        <div className="space-y-4 mt-4">
          <Input
            type="number"
            placeholder="e.g. '500'"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value) || 0)}
          />
          <div className="flex items-center gap-x-2">
            <Button
              onClick={onSubmit}
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
