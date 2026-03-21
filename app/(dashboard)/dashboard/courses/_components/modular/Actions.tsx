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

interface ActionsProps {
  disabled: boolean
  isPublished: boolean
  onPublish: () => void
  onDelete: () => void
}

export default function Actions({
  disabled,
  isPublished,
  onPublish,
  onDelete,
}: ActionsProps) {
  const [showDelete, setShowDelete] = useState(false)

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onPublish}
        disabled={disabled}
        variant="outline"
        size="sm"
        className="font-semibold"
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
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              course and all its data.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end gap-x-2 pt-4">
            <Button variant="ghost" size="sm" onClick={() => setShowDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelete}>
              Confirm Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
