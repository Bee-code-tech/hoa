"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ChapterActionsProps {
  disabled: boolean
  isPublished: boolean
  onPublish: () => void
  onDelete: () => void
}

export default function ChapterActions({
  disabled,
  isPublished,
  onPublish,
  onDelete,
}: ChapterActionsProps) {
  const [showDelete, setShowDelete] = useState(false)

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onPublish}
        disabled={disabled}
        variant="outline"
        size="sm"
        className="font-semibold px-6 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action will permanently delete this module and its content.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end gap-x-2 pt-4">
            <Button variant="ghost" size="sm" onClick={() => setShowDelete(false)} className="hover:bg-primary/10 hover:text-primary">
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelete}>
              Delete Module
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
