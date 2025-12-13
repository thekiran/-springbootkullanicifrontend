import { DashboardLayout } from "@/components/dashboard-layout"
import { StudentForm } from "@/components/student-form"

export default function NewStudentPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Student</h1>
          <p className="text-muted-foreground">Create a new student record</p>
        </div>
        <StudentForm mode="create" />
      </div>
    </DashboardLayout>
  )
}
