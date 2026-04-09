"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, X, Video, FileText, Upload, CheckCircle, Loader2 } from "lucide-react"
import { uploadService } from "@/services/upload.service"
import { Progress } from "@/components/ui/progress"
import { toast } from "react-hot-toast"

interface ChapterMediaFormProps {
  initialData: {
    videoUrl?: string
    content?: string
    type?: "video" | "pdf"
  }
  onSave: (url: string) => void
}

export default function ChapterMediaForm({ initialData, onSave }: ChapterMediaFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const isVideo = initialData.type === "video"

  const toggleEdit = () => setIsEditing((current) => !current)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File is too large. Max size is 20MB.");
      return;
    }

    try {
      setIsUploading(true)
      setUploadProgress(0)
      const url = await uploadService.uploadFile(file, (pct) => setUploadProgress(pct))
      onSave(url)
      toast.success(`${isVideo ? "Video" : "PDF"} uploaded successfully`)
      setIsEditing(false)
    } catch (error) {
      toast.error(`Failed to upload ${isVideo ? "video" : "PDF"}`)
    } finally {
      setIsUploading(false)
    }
  }

  const currentUrl = initialData.videoUrl || initialData.content

  return (
    <div className="mt-6 border bg-primary/5 rounded-2xl p-6">
      <div className="font-semibold flex items-center justify-between">
        Module {isVideo ? "Video" : "PDF Content"}
        <Button onClick={toggleEdit} variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary">
          {isEditing ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><Pencil className="size-4" /> Edit content</>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div className="mt-4">
          {!currentUrl ? (
            <div className="flex flex-col items-center justify-center h-40 bg-background/50 rounded-xl border-2 border-dashed border-primary/20 p-4">
              <Upload className="size-8 text-primary/40 mb-2" />
              <p className="text-sm text-muted-foreground italic">No file uploaded yet</p>
            </div>
          ) : isVideo ? (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border shadow-sm">
              <video 
                src={currentUrl} 
                controls 
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-background border rounded-xl shadow-sm hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="size-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Uploaded PDF Document</p>
                <a 
                  href={currentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  View full document
                </a>
              </div>
              <CheckCircle className="size-4 text-green-500" />
            </div>
          )}
        </div>
      )}

      {isEditing && (
        <div className="mt-4">
          <div className="flex flex-col items-center justify-center h-60 bg-background/50 rounded-xl border-2 border-dashed border-primary/30 p-8 text-center transition-all hover:border-primary/50">
            {isUploading ? (
              <div className="flex flex-col items-center gap-y-4 w-full px-10">
                 <Loader2 className="size-10 text-primary animate-spin" />
                 <div className="w-full space-y-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground text-center font-medium">
                       {uploadProgress === 100 ? "Processing on server..." : `${uploadProgress}% uploaded`}
                    </p>
                    <p className="text-sm font-bold text-center">
                       {uploadProgress === 100 ? "Validating file..." : `Uploading your ${isVideo ? 'video' : 'PDF'}...`}
                    </p>
                 </div>
              </div>
            ) : (
              <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-y-4 group">
                <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-all">
                   <Upload className="size-8 text-primary" />
                </div>
                <div className="space-y-1">
                   <p className="text-sm font-bold">
                     Click to upload {isVideo ? 'video' : 'PDF'}
                   </p>
                   <p className="text-xs text-muted-foreground">
                     or drag and drop here
                   </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept={isVideo ? "video/*" : ".pdf"}
                  onChange={handleUpload}
                />
              </label>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground mt-4 text-center">
             Choose a {isVideo ? 'MP4, WebM or Ogg' : 'PDF'} file to {currentUrl ? 'replace the existing' : 'upload a new'} content.
          </p>
        </div>
      )}
    </div>
  )
}
