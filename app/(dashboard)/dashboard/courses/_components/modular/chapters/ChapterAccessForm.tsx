"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, X, Lock, Unlock } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface ChapterAccessFormProps {
  initialData: {
    isFree: boolean
  }
  onSave: (isFree: boolean) => void
}

export default function ChapterAccessForm({ initialData, onSave }: ChapterAccessFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialData.isFree)

  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = () => {
    onSave(value)
    setIsEditing(false)
  }

  return (
    <div className="mt-6 border bg-primary/5 rounded-2xl p-6">
      <div className="font-semibold flex items-center justify-between">
        Module Access
        <Button onClick={toggleEdit} variant="ghost" size="sm" className="gap-2">
          {isEditing ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><Pencil className="size-4" /> Edit access</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="flex items-center gap-2 mt-2">
          {initialData.isFree ? (
             <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
               <Unlock className="size-3" /> This module is free for preview
             </div>
          ) : (
            <div className="flex items-center gap-2 text-primary bg-primary/5 px-3 py-1 rounded-full text-xs font-bold border border-primary/10">
               <Lock className="size-3" /> Access restricted to enrolled students
             </div>
          )}
        </div>
      )}
      {isEditing && (
        <div className="space-y-4 mt-4">
          <div className={cn(
            "flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4 transition-colors",
            value ? "bg-green-50/50 border-green-200" : "bg-card border-border"
          )}>
            <Checkbox
              id="isFree"
              checked={value}
              onCheckedChange={(checked) => setValue(!!checked)}
            />
            <div className="space-y-1 leading-none">
              <label
                htmlFor="isFree"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Make this module free for preview
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Check this box if you want this module to be accessible without enrollment.
              </p>
            </div>
          </div>
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
