import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentStudents } from "@/components/recent-students"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your student management system</p>
        </div>
        <DashboardStats />
        <div className="grid gap-4 lg:grid-cols-2">
          <RecentStudents />
        </div>
      </div>
    </DashboardLayout>
  )
}
