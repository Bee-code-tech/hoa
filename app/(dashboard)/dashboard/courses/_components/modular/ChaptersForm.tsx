"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { VideoIcon, X, Pencil, GripVertical, PlusCircle, Save, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { useRouter } from "next/navigation"

interface Chapter {
  id: string
  title: string
  isPublished: boolean
  isFree: boolean
  position: number
  type?: "video" | "pdf"
  content?: string
}

interface ChaptersFormProps {
  initialData: {
    chapters: Chapter[]
  }
  onSave: (chapters: Chapter[]) => void
  onEdit: (id: string) => void
}

export default function ChaptersForm({ 
  initialData, 
  onSave,
  onEdit
}: ChaptersFormProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [draft, setDraft] = useState("")
  const [localChapters, setLocalChapters] = useState<Chapter[]>(initialData.chapters || [])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])
  useEffect(() => { setLocalChapters(initialData.chapters || []) }, [initialData.chapters])

  const toggleCreating = () => setIsCreating((current) => !current)

  const hasChanges = JSON.stringify(localChapters) !== JSON.stringify(initialData.chapters)

  const handleAdd = () => {
    if (!draft.trim()) return
    const newChapter: Chapter = {
      id: `temp-${Date.now()}`,
      title: draft.trim(),
      isPublished: false,
      isFree: false,
      position: localChapters.length,
      type: "video",
      content: ""
    }
    setLocalChapters((current) => [...current, newChapter])
    setDraft("")
    setIsCreating(false)
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      await onSave(localChapters)
    } finally {
      setIsSaving(false)
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items = Array.from(localChapters)
    const [moved] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, moved)
    
    const reordered = items.map((item, index) => ({ ...item, position: index }))
    setLocalChapters(reordered)
  }

  return (
    <div className="mt-6 border bg-primary/5 rounded-2xl p-6 relative">
      <div className="font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2">
          Course Curriculum
          {hasChanges && (
            <Badge variant="destructive" className="animate-pulse text-[10px] uppercase">Unsaved Changes</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
           {hasChanges && (
             <Button onClick={handleSave} disabled={isSaving} size="sm" className="gap-2 bg-green-600 hover:bg-green-700 h-8">
               {isSaving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
               Save Curriculum
             </Button>
           )}
           <Button onClick={toggleCreating} variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary">
            {isCreating ? (
              <><X className="size-4" /> Cancel</>
            ) : (
              <><PlusCircle className="size-4" /> Add chapter</>
            )}
          </Button>
        </div>
      </div>
      
      {isCreating && (
        <div className="flex items-center gap-2 mt-4">
          <Input
            placeholder="e.g. 'Introduction to SIA...'"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1"
            autoFocus
          />
          <Button size="sm" onClick={handleAdd} disabled={!draft.trim()}>
            Add to list
          </Button>
        </div>
      )}

      <div className={cn(
        "mt-4 text-sm",
        !localChapters?.length && "text-muted-foreground italic bg-background/50 p-6 text-center rounded-xl border-2 border-dashed"
      )}>
        {!localChapters?.length ? (
          <p>No chapters added yet. Start by creating your first chapter.</p>
        ) : isMounted ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                  {localChapters.map((chapter, index) => {
                    const isTemp = chapter.id.startsWith('temp-');
                    return (
                      <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={cn(
                              "flex items-center gap-3 bg-card border shadow-sm rounded-xl px-4 py-3 text-sm group hover:border-primary/50 transition-colors",
                              chapter.isPublished && "border-primary/30 bg-primary/5",
                              isTemp && "border-dashed border-amber-200 bg-amber-50/10"
                            )}
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="text-muted-foreground hover:text-primary transition-colors cursor-grab active:cursor-grabbing"
                            >
                              <GripVertical className="size-4" />
                            </div>
                            <div className="bg-muted p-2 rounded-lg group-hover:bg-primary/10 transition-colors">
                              <VideoIcon className="size-4 text-muted-foreground group-hover:text-primary" />
                            </div>
                            <div className="flex flex-col flex-1 truncate">
                               <span className="font-medium truncate">{chapter.title}</span>
                               {isTemp && <span className="text-[10px] text-amber-600 font-bold uppercase tracking-tight">Save required to edit</span>}
                            </div>
                            <div className="flex items-center gap-2 pr-2">
                              <Badge variant={chapter.isPublished ? "default" : "secondary"} className="text-[10px] h-5">
                                {chapter.isPublished ? "Public" : "Draft"}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={isTemp}
                                className="size-8 text-muted-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-30"
                                onClick={() => onEdit(chapter.id)}
                              >
                                <Pencil className="size-3.5" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : null}
      </div>
      
      {!isCreating && (localChapters || []).length > 0 && (
        <div className="flex flex-col items-center gap-y-1 mt-4">
           {hasChanges && <p className="text-xs font-bold text-amber-600 animate-bounce">Click "Save Curriculum" to commit your new chapters!</p>}
           <p className="text-xs text-muted-foreground text-center">
            Drag and drop to reorder chapters
           </p>
        </div>
      )}
    </div>
  )
}
