import { useRouter } from "next/navigation"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, Plus, ExternalLink } from "lucide-react"
import coursesData from "../courses.json"

export function AdminCoursesTable() {
  const router = useRouter()
  const data = (coursesData as any).default || coursesData

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Course Management</h2>
          <p className="text-muted-foreground">Manage your curriculum and student enrollment.</p>
        </div>
        <Button className="gap-2 bg-primary" onClick={() => router.push("/dashboard/courses/new")}>
          <Plus className="size-4" /> Add Course
        </Button>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Course Title</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Modules</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(data) && data.map((course: any) => (
              <TableRow key={course.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-semibold text-primary">{course.title}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell className="font-medium text-gold">{course.price}</TableCell>
                <TableCell>
                   <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {course.modules?.length || 0} Modules
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => router.push(`/dashboard/courses/${course.slug}`)}
                      className="text-muted-foreground hover:text-primary"
                      title="View as Student"
                    >
                      <ExternalLink className="size-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => router.push(`/dashboard/courses/${course.slug}/edit`)}
                      className="text-muted-foreground hover:text-primary"
                      title="Edit Course"
                    >
                      <Edit2 className="size-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      title="Delete Course"
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
    </div>
  )
}
