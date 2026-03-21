"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Loader2, Save } from "lucide-react"
import { toast } from "sonner"

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Profile updated successfully")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Update your personal information and public profile.
        </p>
      </div>
      <Separator className="bg-primary/10" />
      
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative group">
            <Avatar className="size-24 border-2 border-primary/10">
              <AvatarImage src="https://ui-avatars.com/api/?name=Admin&background=002147&color=fff" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <button 
              type="button"
              className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
              <Camera className="size-4" />
            </button>
          </div>
          
          <div className="flex-1 w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  defaultValue="Admin" 
                  className="bg-primary/5 border-none rounded-xl focus-visible:ring-primary/20" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  defaultValue="User" 
                  className="bg-primary/5 border-none rounded-xl focus-visible:ring-primary/20" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue="admin@hoaservices.co.uk" 
                className="bg-primary/5 border-none rounded-xl focus-visible:ring-primary/20" 
              />
              <p className="text-[10px] text-muted-foreground pl-1">
                This email is used for login and platform notifications.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Public Bio</Label>
          <textarea 
            id="bio"
            className="w-full min-h-[100px] bg-primary/5 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20 outline-none p-3 text-sm resize-none"
            placeholder="Tell us a little about yourself..."
          />
        </div>

        <div className="flex justify-end gap-x-4">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 rounded-xl px-8 shadow-lg shadow-primary/20 gap-2"
          >
            {isLoading ? (
              <><Loader2 className="size-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="size-4" /> Save Changes</>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
