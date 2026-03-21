"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { VideoIcon, X, Pencil, GripVertical, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { useRouter } from "next/navigation"

interface Chapter {
  id: string
  title: string
  isPublished: boolean
  position: number
  type?: "video" | "pdf"
}

interface ChaptersFormProps {
  initialData: {
    chapters: Chapter[]
  }
  onAdd: (title: string) => void
  onReorder: (chapters: Chapter[]) => void
  onEdit: (id: string) => void
}

export default function ChaptersForm({ 
  initialData, 
  onAdd, 
  onReorder,
  onEdit
}: ChaptersFormProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [draft, setDraft] = useState("")
  const [localChapters, setLocalChapters] = useState<Chapter[]>(initialData.chapters)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])
  useEffect(() => { setLocalChapters(initialData.chapters) }, [initialData.chapters])

  const toggleCreating = () => setIsCreating((current) => !current)

  const handleAdd = () => {
    if (!draft.trim()) return
    onAdd(draft.trim())
    setDraft("")
    setIsCreating(false)
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items = Array.from(localChapters)
    const [moved] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, moved)
    
    const reordered = items.map((item, index) => ({ ...item, position: index }))
    setLocalChapters(reordered)
    onReorder(reordered)
  }

  return (
    <div className="mt-6 border bg-primary/5 rounded-2xl p-6 relative">
      <div className="font-semibold flex items-center justify-between">
        Course Curriculum
        <Button onClick={toggleCreating} variant="ghost" size="sm" className="gap-2">
          {isCreating ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><PlusCircle className="size-4" /> Add module</>
          )}
        </Button>
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
            Add
          </Button>
        </div>
      )}

      <div className={cn(
        "mt-4 text-sm",
        !localChapters.length && "text-muted-foreground italic bg-background/50 p-6 text-center rounded-xl border-2 border-dashed"
      )}>
        {!localChapters.length ? (
          <p>No modules added yet. Start by creating your first module.</p>
        ) : isMounted ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                  {localChapters.map((chapter, index) => (
                    <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={cn(
                            "flex items-center gap-3 bg-card border shadow-sm rounded-xl px-4 py-3 text-sm group hover:border-primary/50 transition-colors",
                            chapter.isPublished && "border-primary/30 bg-primary/5"
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
                          <span className="flex-1 font-medium truncate">{chapter.title}</span>
                          <div className="flex items-center gap-2 pr-2">
                             <Badge variant={chapter.isPublished ? "default" : "secondary"} className="text-[10px] h-5">
                               {chapter.isPublished ? "Public" : "Draft"}
                             </Badge>
                             <Button
                               variant="ghost"
                               size="icon"
                               className="size-8 text-muted-foreground hover:text-primary"
                               onClick={() => onEdit(chapter.id)}
                             >
                               <Pencil className="size-3.5" />
                             </Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : null}
      </div>
      
      {!isCreating && localChapters.length > 0 && (
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Drag and drop to reorder modules
        </p>
      )}
    </div>
  )
}
