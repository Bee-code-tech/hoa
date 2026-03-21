"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, X, Video, PlayCircle } from "lucide-react"

interface ChapterVideoFormProps {
  initialData: {
    videoUrl: string
  }
  onSave: (videoUrl: string) => void
}

export default function ChapterVideoForm({ initialData, onSave }: ChapterVideoFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialData.videoUrl)

  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = () => {
    onSave(value)
    setIsEditing(false)
  }

  return (
    <div className="mt-6 border bg-primary/20 rounded-2xl p-6">
      <div className="font-semibold flex items-center justify-between">
        Module Video
        <Button onClick={toggleEdit} variant="ghost" size="sm" className="gap-2">
          {isEditing ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><Pencil className="size-4" /> Edit video</>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.videoUrl ? (
          <div className="flex flex-col items-center justify-center h-60 bg-muted rounded-xl mt-4 border-2 border-dashed gap-y-2">
            <Video className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No video provided yet</p>
          </div>
        ) : (
          <div className="relative aspect-video mt-4 overflow-hidden rounded-xl border-2 border-primary/20 bg-black group shadow-xl">
             <iframe
                src={initialData.videoUrl}
                className="w-full h-full"
                allowFullScreen
             />
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <PlayCircle className="size-12 text-white/80" />
             </div>
          </div>
        )
      )}
      {isEditing && (
        <div className="space-y-4 mt-4">
          <Input
            placeholder="e.g. 'https://www.youtube.com/embed/...'"
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
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
             <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight mb-1">Instruction</p>
             <p className="text-xs text-muted-foreground">Use an embeddable YouTube or Vimeo URL for the best student experience.</p>
          </div>
        </div>
      )}
    </div>
  )
}
