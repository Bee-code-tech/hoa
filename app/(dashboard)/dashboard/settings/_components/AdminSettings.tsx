"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  Users, 
  Settings2, 
  Globe, 
  Palette, 
  ShieldAlert,
  Plus,
  MoreVertical
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminSettings() {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Team Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage administrators and staff access levels.
            </p>
          </div>
          <Button size="sm" className="rounded-xl gap-2">
            <Plus className="size-4" /> Add Member
          </Button>
        </div>
        <Separator className="bg-primary/10" />
        
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">User</th>
                <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-right py-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-0 hover:bg-primary/5 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex flex-col">
                    <span className="font-bold">John Doe</span>
                    <span className="text-[10px] text-muted-foreground">john@hoaservices.co.uk</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className="text-[10px] border-primary/20 bg-primary/5 text-primary">Owner</Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-green-500" />
                    <span className="text-xs">Active</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="icon" className="size-8 rounded-lg">
                    <MoreVertical className="size-4" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">System Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Platform-wide settings and branding.
          </p>
        </div>
        <Separator className="bg-primary/10" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl border bg-primary/5 border-primary/10 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Palette className="size-4" />
              <span className="text-sm font-bold uppercase tracking-tight">Branding</span>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Platform Display Name</Label>
              <Input defaultValue="HOA Academy" className="bg-white dark:bg-slate-950 border-none rounded-lg text-sm h-9" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Primary Brand Color</Label>
              <div className="flex gap-2">
                <div className="size-9 rounded-lg bg-primary shrink-0 shadow-inner" />
                <Input defaultValue="#002147" className="bg-white dark:bg-slate-950 border-none rounded-lg text-sm h-9" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-slate-600 dark:text-slate-400">
              <Globe className="size-4" />
              <span className="text-sm font-bold uppercase tracking-tight">Public SEO</span>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Meta Description</Label>
              <textarea 
                className="w-full min-h-[80px] bg-white dark:bg-slate-950 border-none rounded-lg text-xs p-2.5 outline-none focus-visible:ring-1 focus-visible:ring-primary/20 resize-none"
                defaultValue="The premier learning platform for Security Industry Authority certifications."
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
        <div className="flex items-start gap-4">
          <ShieldAlert className="size-6 text-red-600 mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-red-950 dark:text-red-200 tracking-tight">Danger Zone</h4>
            <p className="text-sm text-red-800 dark:text-red-300/80 leading-relaxed">
              These actions have significant platform-wide impact. Deleting your account or resetting the system cannot be undone.
            </p>
            <div className="pt-2 flex gap-4">
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 rounded-xl px-6">
                Reset Platform
              </Button>
              <Button variant="destructive" className="rounded-xl px-6 shadow-lg shadow-red-200/50">
                Delete Organization
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
