"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StudentForm } from "@/components/student-form"
import { studentApi } from "@/lib/api"
import type { Student } from "@/lib/types"

export default function NewStudentPage() {
  const handleCreate = async (data: Omit<Student, "id">) => {
    await studentApi.create(data)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Öğrenci Ekle</h1>
          <p className="text-muted-foreground">Yeni bir öğrenci kaydı oluşturun</p>
        </div>
        <StudentForm onSubmit={handleCreate} asPage />
      </div>
    </DashboardLayout>
  )
}
