"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck, Loader2, Key } from "lucide-react"
import { toast } from "sonner"

export default function SecurityForm() {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Security settings updated")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account security and authentication methods.
        </p>
      </div>
      <Separator className="bg-primary/10" />
      
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input 
              id="currentPassword" 
              type="password"
              className="bg-primary/5 border-none rounded-xl focus-visible:ring-primary/20" 
            />
          </div>
          
          <Separator className="my-4 bg-primary/5" />
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input 
              id="newPassword" 
              type="password"
              className="bg-primary/5 border-none rounded-xl focus-visible:ring-primary/20" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input 
              id="confirmPassword" 
              type="password"
              className="bg-primary/5 border-none rounded-xl focus-visible:ring-primary/20" 
            />
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800 flex items-start gap-3">
          <ShieldCheck className="size-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">Two-Factor Authentication</h4>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              Add an extra layer of security to your account. This feature will be available in the next major update.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-x-4">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 rounded-xl px-8 shadow-lg shadow-primary/20 gap-2"
          >
            {isLoading ? (
              <><Loader2 className="size-4 animate-spin" /> Updating...</>
            ) : (
              <><Key className="size-4" /> Update Password</>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
