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
  onPublish: () => Promise<void>
  onDelete: () => Promise<void>
}

export default function Actions({
  disabled,
  isPublished,
  onPublish,
  onDelete,
}: ActionsProps) {
  const [showDelete, setShowDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePublish = async () => {
    try {
      setIsLoading(true);
      await onPublish();
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onDelete();
      setShowDelete(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={handlePublish}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        className="font-semibold hover:bg-primary/10 hover:text-primary hover:border-primary/30"
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
            <Button variant="ghost" size="sm" onClick={() => setShowDelete(false)} disabled={isLoading} className="hover:bg-primary/10 hover:text-primary">
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isLoading}>
              Confirm Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
