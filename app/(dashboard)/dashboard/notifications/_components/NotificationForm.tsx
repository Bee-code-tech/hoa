"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Send, Loader2, Info } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function NotificationForm() {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate send
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Broadcast sent successfully!")
    }, 2000)
  }

  return (
    <Card className="border-none shadow-lg bg-white dark:bg-slate-950">
      <CardHeader>
        <CardTitle>Compose Broadcast</CardTitle>
        <CardDescription>
          Send an email notification to selected student segments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Recipients</Label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-primary/5 border-none rounded-xl">
                  <SelectValue placeholder="Select segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="paid">Paid Students</SelectItem>
                  <SelectItem value="free">Free Students</SelectItem>
                  <SelectItem value="course">Specific Course...</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notification Type</Label>
              <Select defaultValue="announcement">
                <SelectTrigger className="bg-primary/5 border-none rounded-xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="promotion">Promotional</SelectItem>
                  <SelectItem value="update">Course Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Subject</Label>
            <Input 
              placeholder="e.g. 'New Modules Available!'" 
              className="bg-primary/5 border-none rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Message Content</Label>
            <Textarea 
              placeholder="Write your message here..." 
              className="min-h-[200px] bg-primary/5 border-none rounded-xl resize-none p-4"
              required
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-start gap-3 border border-blue-100 dark:border-blue-800">
            <Info className="size-5 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              Emails will be sent using the system-default template. You can preview the email layout before sending by using the "Send Test" action in the history table.
            </p>
          </div>

          <div className="flex items-center justify-end gap-x-4 pt-2">
             <Button 
               type="submit" 
               disabled={isLoading}
               className="bg-primary hover:bg-primary/90 rounded-xl px-8 gap-2 shadow-lg shadow-primary/20"
             >
               {isLoading ? (
                 <><Loader2 className="size-4 animate-spin" /> Sending...</>
               ) : (
                 <><Send className="size-4" /> Send Broadcast</>
               )}
             </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
