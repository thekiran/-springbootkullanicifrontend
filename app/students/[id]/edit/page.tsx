"use client"

import { use } from "react"
import useSWR from "swr"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StudentForm } from "@/components/student-form"
import { fetchStudent } from "@/lib/api"
import { Loader2 } from "lucide-react"

export default function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: student, isLoading, error } = useSWR(`/api/students/${id}`, () => fetchStudent(Number.parseInt(id)))

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Student</h1>
          <p className="text-muted-foreground">Update student information</p>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center text-destructive">Failed to load student. Make sure your API is running.</div>
        ) : student ? (
          <StudentForm student={student} mode="edit" />
        ) : null}
      </div>
    </DashboardLayout>
  )
}
