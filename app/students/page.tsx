import { DashboardLayout } from "@/components/dashboard-layout"
import { StudentsTable } from "@/components/students-table"

export default function StudentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage your student records</p>
        </div>
        <StudentsTable />
      </div>
    </DashboardLayout>
  )
}
