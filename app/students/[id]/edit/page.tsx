"use client"

import { use } from "react"
import useSWR from "swr"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StudentForm } from "@/components/student-form"
import { studentApi } from "@/lib/api"
import { Loader2 } from "lucide-react"

export default function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const numericId = Number.parseInt(id)
  const { data: student, isLoading, error, mutate } = useSWR(
    `/students/${numericId}`,
    () => studentApi.getById(numericId),
    { revalidateOnFocus: false },
  )

  const handleUpdate = async (data: any) => {
    await studentApi.update(numericId, data)
    mutate()
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Öğrenci Düzenle</h1>
          <p className="text-muted-foreground">Öğrenci bilgilerini güncelleyin</p>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center text-destructive">Öğrenci yüklenemedi. API çalışıyor mu?</div>
        ) : student ? (
          <StudentForm student={student} onSubmit={handleUpdate} asPage />
        ) : null}
      </div>
    </DashboardLayout>
  )
}
