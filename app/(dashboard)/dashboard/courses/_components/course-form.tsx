"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { 
  BarChart, 
  ChevronLeft, 
  FileText, 
  Image as ImageIcon, 
  Layout, 
  Plus, 
  Save, 
  Trash2, 
  Video,
  PlayCircle,
  Clock,
  Navigation,
  Tag
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const courseFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters."),
  category: z.string().min(1, "Please select a category."),
  price: z.string().min(1, "Price is required."),
  duration: z.string().min(1, "Duration is required."),
  badge: z.string().optional(),
  image: z.string().url("Please enter a valid image URL."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  modules: z.array(z.object({
    id: z.string(),
    title: z.string().min(2, "Module title is required."),
    type: z.enum(["video", "pdf"]),
    content: z.string().min(1, "Content URL/Text is required.")
  })).min(1, "At least one module is required.")
})

type CourseFormValues = z.infer<typeof courseFormSchema>

interface CourseFormProps {
  initialData?: any
  isEditing?: boolean
}

export function CourseForm({ initialData, isEditing = false }: CourseFormProps) {
  const router = useRouter()
  
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      category: "Security",
      price: "£",
      duration: "",
      badge: "",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
      description: "",
      modules: [
        { id: "m1", title: "Introduction", type: "video", content: "" }
      ]
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "modules",
    control: form.control,
  })

  const onSubmit = (data: CourseFormValues) => {
    console.log("Saving course data:", data)
    toast(isEditing ? "Course Updated" : "Course Created", {
      description: `Successfully ${isEditing ? 'updated' : 'created'} "${data.title}"`,
    })
    router.push("/dashboard/courses")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-4 border-b">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" type="button" onClick={() => router.back()}>
              <ChevronLeft className="size-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-primary">
                {isEditing ? "Edit Course" : "Create New Course"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isEditing ? "Modify existing course details and curriculum." : "Add a professional certification to your library."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
             <Button type="submit" className="gap-2 bg-primary">
               <Save className="size-4" /> {isEditing ? "Update Course" : "Create Course"}
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Basic Info & Content */}
          <div className="lg:col-span-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Details */}
              <Card className="border-muted shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/30 border-b">
                  <div className="flex items-center gap-2">
                    <Layout className="size-5 text-primary" />
                    <CardTitle>Basic Information</CardTitle>
                  </div>
                  <CardDescription>Fundamental course details and identifiers.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel>Course Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. SIA Door Supervisor" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel>URL Slug</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. sia-door-supervisor" {...field} />
                          </FormControl>
                          <FormDescription>Used in the course link</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Security">Security</SelectItem>
                              <SelectItem value="Health & Safety">Health & Safety</SelectItem>
                              <SelectItem value="Surveillance">Surveillance</SelectItem>
                              <SelectItem value="Technology">Technology</SelectItem>
                              <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. £199" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 40 Hours" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Visuals & Description */}
              <Card className="border-muted shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/30 border-b">
                   <div className="flex items-center gap-2">
                    <ImageIcon className="size-5 text-primary" />
                    <CardTitle>Visuals & Content</CardTitle>
                  </div>
                  <CardDescription>How the course appears in the catalog.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Cover Image URL</FormLabel>
                        <div className="flex gap-4 items-start">
                           <div className="h-12 w-12 rounded-lg border bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                             {field.value ? <img src={field.value} className="h-full w-full object-cover" /> : <ImageIcon className="size-6 text-muted-foreground" />}
                           </div>
                           <FormControl className="flex-1">
                            <Input placeholder="Https://..." {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="badge"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Badge (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Popular, New, Hot Deals" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Detailed course overview for students..." 
                            className="min-h-[100px] resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Curriculum Management */}
            <Card className="border-muted shadow-sm overflow-hidden">
              <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Navigation className="size-5 text-primary" />
                    <CardTitle>Course Curriculum</CardTitle>
                  </div>
                  <CardDescription>Manage modules and learning materials.</CardDescription>
                </div>
                <Button 
                   type="button" 
                   variant="secondary" 
                   size="sm" 
                   className="gap-2"
                   onClick={() => append({ id: `m${fields.length + 1}`, title: "", type: "video", content: "" })}
                >
                  <Plus className="size-4" /> Add Module
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="relative group p-4 border rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors border-dashed hover:border-solid hover:border-primary/20">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                             <div className="md:col-span-8">
                               <FormField
                                 control={form.control}
                                 name={`modules.${index}.title`}
                                 render={({ field }: { field: any }) => (
                                   <FormItem>
                                     <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Module Title</FormLabel>
                                     <FormControl>
                                       <Input placeholder="Enter title..." {...field} />
                                     </FormControl>
                                     <FormMessage />
                                   </FormItem>
                                 )}
                               />
                             </div>
                             <div className="md:col-span-4">
                               <FormField
                                 control={form.control}
                                 name={`modules.${index}.type`}
                                 render={({ field }: { field: any }) => (
                                   <FormItem>
                                     <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Type</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                       <FormControl>
                                         <SelectTrigger>
                                           <SelectValue placeholder="Type" />
                                         </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                         <SelectItem value="video">
                                           <div className="flex items-center gap-2">
                                             <Video className="size-3" /> Video
                                           </div>
                                         </SelectItem>
                                         <SelectItem value="pdf">
                                            <div className="flex items-center gap-2">
                                             <FileText className="size-3" /> PDF Guide
                                           </div>
                                         </SelectItem>
                                       </SelectContent>
                                     </Select>
                                     <FormMessage />
                                   </FormItem>
                                 )}
                               />
                             </div>
                           </div>
                           <FormField
                             control={form.control}
                             name={`modules.${index}.content`}
                             render={({ field }: { field: any }) => (
                               <FormItem>
                                 <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                   {form.watch(`modules.${index}.type`) === 'video' ? 'YouTube Embed URL' : 'PDF Document URL'}
                                 </FormLabel>
                                 <FormControl>
                                   <Input placeholder={form.watch(`modules.${index}.type`) === 'video' ? 'https://youtube.com/embed/...' : 'https://...pdf'} {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                        </div>
                        <div className="flex md:flex-col justify-end gap-2 pt-6">
                           <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => remove(index)}
                              disabled={fields.length === 1}
                           >
                             <Trash2 className="size-4" />
                           </Button>
                        </div>
                      </div>
                      <div className="absolute -left-2 top-4 h-8 w-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
                
                {fields.length === 0 && (
                   <div className="text-center py-10 border border-dashed rounded-3xl bg-muted/5">
                      <Layout className="size-12 text-muted-foreground/30 mx-auto mb-4" />
                      <h4 className="font-semibold text-muted-foreground">Build Your Module List</h4>
                      <p className="text-sm text-muted-foreground/60 mb-4">You haven't added any modules yet.</p>
                      <Button onClick={() => append({ id: "m1", title: "", type: "video", content: "" })} type="button" variant="outline">
                        Add First Module
                      </Button>
                   </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}
