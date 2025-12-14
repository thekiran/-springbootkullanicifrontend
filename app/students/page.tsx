"use client"

import { useState, useEffect, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { DataTable } from "@/components/data-table"
import { StudentForm } from "@/components/student-form"
import { DeleteDialog } from "@/components/delete-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, RefreshCw } from "lucide-react"
import { studentApi } from "@/lib/api"
import type { Student } from "@/lib/types"

const columns = [
  { key: "id" as const, label: "ID" },
  { key: "firstName" as const, label: "Ad" },
  { key: "lastName" as const, label: "Soyad" },
  { key: "email" as const, label: "E-posta" },
  { key: "phoneNumber" as const, label: "Telefon" },
  { key: "tcNo" as const, label: "TC No" },
  { key: "studentClass" as const, label: "Sınıf" },
]

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const fetchStudents = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await studentApi.getAll()
      setStudents(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const handleCreate = async (data: Omit<Student, "id">) => {
    await studentApi.create(data)
    fetchStudents()
  }

  const handleUpdate = async (data: Omit<Student, "id">) => {
    if (selectedStudent?.id) {
      await studentApi.update(selectedStudent.id, data)
      fetchStudents()
    }
  }

  const handleDelete = async () => {
    if (selectedStudent?.id) {
      await studentApi.delete(selectedStudent.id)
      setDeleteOpen(false)
      setSelectedStudent(null)
      fetchStudents()
    }
  }

  const filteredStudents = students.filter(
    (s) =>
      s.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 min-h-screen p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Öğrenciler</h1>
            <p className="mt-2 text-muted-foreground">Öğrenci listesini yönetin</p>
          </div>
          <Button
            onClick={() => {
              setSelectedStudent(null)
              setFormOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Yeni Öğrenci
          </Button>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Öğrenci ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-input border-border pl-10 text-foreground"
            />
          </div>
          <Button variant="outline" onClick={fetchStudents}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Yenile
          </Button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            {error}
          </div>
        )}

        <DataTable
          data={filteredStudents}
          columns={columns}
          isLoading={isLoading}
          onEdit={(student) => {
            setSelectedStudent(student)
            setFormOpen(true)
          }}
          onDelete={(student) => {
            setSelectedStudent(student)
            setDeleteOpen(true)
          }}
        />

        <StudentForm
          open={formOpen}
          onOpenChange={setFormOpen}
          student={selectedStudent}
          onSubmit={selectedStudent ? handleUpdate : handleCreate}
        />

        <DeleteDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onConfirm={handleDelete}
          title="Öğrenciyi Sil"
          description={`${selectedStudent?.firstName ?? ""} ${selectedStudent?.lastName ?? ""} isimli öğrenciyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
        />
      </main>
    </div>
  )
}
