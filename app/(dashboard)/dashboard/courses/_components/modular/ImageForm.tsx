"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, X, ImageIcon, Upload, Loader2 } from "lucide-react"
import Image from "next/image"
import { uploadService } from "@/services/upload.service"
import { toast } from "react-hot-toast"
import { Progress } from "@/components/ui/progress"

interface ImageFormProps {
  initialData: {
    imageUrl: string
  }
  onSave: (imageUrl: string) => void
}

export default function ImageForm({ initialData, onSave }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState(initialData.imageUrl)

  useEffect(() => {
    setPreviewUrl(initialData.imageUrl)
  }, [initialData.imageUrl])

  const toggleEdit = () => setIsEditing((current) => !current)

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File is too large. Max size is 20MB.");
      return;
    }

    try {
      setUploading(true)
      setProgress(0)
      const url = await uploadService.uploadFile(file, (pct) => {
        setProgress(pct);
      })
      setPreviewUrl(url)
      onSave(url)
      toast.success("Image uploaded successfully")
      setIsEditing(false)
    } catch (error: any) {
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="mt-6 border bg-primary/5 rounded-2xl p-6">
      <div className="font-semibold flex items-center justify-between">
        Course Image
        <Button onClick={toggleEdit} variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary">
          {isEditing ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><Pencil className="size-4" /> {initialData.imageUrl ? "Edit image" : "Add image"}</>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-48 bg-muted rounded-xl mt-4 border-2 border-dashed">
            <ImageIcon className="size-10 text-muted-foreground" />
          </div>
        ) : (
          <div className="relative aspect-video mt-4 overflow-hidden rounded-xl border group">
            <Image
              alt="Course"
              fill
              unoptimized
              className="object-cover transition-transform group-hover:scale-105"
              src={initialData.imageUrl}
            />
          </div>
        )
      )}
      {isEditing && (
        <div className="mt-4 space-y-4">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl bg-card hover:bg-accent/50 transition-colors cursor-pointer relative group">
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              accept="image/*"
              disabled={uploading}
              onChange={onFileUpload}
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-y-4 w-full px-10 text-center">
                <Loader2 className="size-10 text-primary animate-spin" />
                <div className="w-full space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground font-medium">
                    {progress === 100 ? "Finalizing upload..." : `${progress}% uploaded`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-y-2">
                <Upload className="size-10 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="text-sm font-medium">Click or drag to upload course thumbnail</p>
                <p className="text-xs text-muted-foreground italic">Preferred: 16:9 Aspect Ratio (JPG, PNG)</p>
              </div>
            )}
          </div>
          
          {previewUrl && !uploading && (
             <div className="space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Preview</p>
                <div className="relative aspect-video rounded-xl overflow-hidden border shadow-sm">
                   <Image src={previewUrl} alt="Preview" fill unoptimized className="object-cover" />
                </div>
             </div>
          )}
        </div>
      )}
    </div>
  )
}
