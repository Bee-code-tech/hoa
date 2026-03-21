"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, Plus } from "lucide-react"
import { CourseEditSheet } from "./course-edit-sheet"
import coursesData from "../courses.json"

export function AdminCoursesTable() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleEdit = (course: any) => {
    setSelectedCourse(course)
    setIsSheetOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary">Course Management</h2>
          <p className="text-muted-foreground">Manage your curriculum and student enrollment.</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" /> Add Course
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Students</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coursesData.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEdit(course)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Edit2 className="size-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CourseEditSheet 
        course={selectedCourse} 
        isOpen={isSheetOpen} 
        onClose={() => setIsSheetOpen(false)} 
      />
    </div>
  )
}
