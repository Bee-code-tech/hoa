"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, X, Video, PlayCircle, FileText, Upload, CheckCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChapterMediaFormProps {
  initialData: {
    videoUrl?: string
    content?: string
    type: "video" | "pdf"
  }
  onSave: (url: string) => void
}

export default function ChapterMediaForm({ initialData, onSave }: ChapterMediaFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(initialData.videoUrl || initialData.content || "")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleEdit = () => setIsEditing((current) => !current)

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    
    // Simulate upload
    setTimeout(() => {
      const simulatedUrl = URL.createObjectURL(file)
      setPreviewUrl(simulatedUrl)
      onSave(simulatedUrl)
      setIsUploading(false)
      setIsEditing(false)
    }, 1500)
  }

  const isVideo = initialData.type === "video"
  const currentUrl = initialData.videoUrl || initialData.content

  return (
    <div className="mt-6 border bg-primary/5 rounded-2xl p-6">
      <div className="font-semibold flex items-center justify-between">
        Module {isVideo ? "Video" : "PDF Content"}
        <Button onClick={toggleEdit} variant="ghost" size="sm" className="gap-2">
          {isEditing ? (
            <><X className="size-4" /> Cancel</>
          ) : (
            <><Pencil className="size-4" /> Change {isVideo ? "video" : "PDF"}</>
          )}
        </Button>
      </div>

      {!isEditing && (
        !currentUrl ? (
          <div className="flex flex-col items-center justify-center h-60 bg-muted rounded-xl mt-4 border-2 border-dashed gap-y-2">
            {isVideo ? <Video className="size-10 text-muted-foreground" /> : <FileText className="size-10 text-muted-foreground" />}
            <p className="text-sm text-muted-foreground">No {isVideo ? "video" : "PDF"} uploaded yet</p>
          </div>
        ) : (
          <div className="mt-4">
            {isVideo ? (
               <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-primary/20 bg-black group shadow-xl">
                 <video
                    src={currentUrl}
                    className="w-full h-full"
                    controls
                 />
                 <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] px-2 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg">
                    <CheckCircle className="size-3" /> UPLOADED
                 </div>
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-primary/20 rounded-xl bg-white/50 flex flex-col items-center justify-center gap-4 group hover:bg-primary/5 transition-colors">
                 <div className="bg-primary/10 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                    <FileText className="size-8 text-primary" />
                 </div>
                 <div className="text-center">
                    <p className="font-bold text-sm">PDF Document Linked</p>
                    <p className="text-xs text-muted-foreground">The resource is ready for student viewing</p>
                 </div>
                 <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={currentUrl} target="_blank" rel="noopener noreferrer">
                       View PDF Preview
                    </a>
                 </Button>
              </div>
            )}
          </div>
        )
      )}

      {isEditing && (
        <div className="space-y-4 mt-4">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={cn(
               "flex flex-col items-center justify-center h-60 bg-card rounded-xl border-2 border-dashed border-primary/30 cursor-pointer hover:bg-primary/5 transition-all group",
               isUploading && "pointer-events-none opacity-50"
            )}
          >
             <input 
                type="file" 
                ref={fileInputRef} 
                onChange={onFileUpload} 
                accept={isVideo ? "video/*" : "application/pdf"} 
                className="hidden" 
             />
             
             {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                   <Loader2 className="size-10 text-primary animate-spin" />
                   <p className="text-sm font-medium">Uploading media...</p>
                </div>
             ) : (
                <div className="flex flex-col items-center gap-2">
                   <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary/20 transition-colors">
                      <Upload className="size-8 text-primary" />
                   </div>
                   <p className="text-sm font-bold">Click to upload {isVideo ? "video" : "PDF"}</p>
                   <p className="text-xs text-muted-foreground text-center px-6">
                      Drag and drop or select a file from your computer.<br/>
                      {isVideo ? "MP4, WebM or Ogg" : "PDF documents only"}
                   </p>
                </div>
             )}
          </div>
        </div>
      )}
    </div>
  )
}
