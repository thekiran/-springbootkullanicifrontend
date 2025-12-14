"use client"

import { useState, useEffect, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { DataTable } from "@/components/data-table"
import { TeacherForm } from "@/components/teacher-form"
import { DeleteDialog } from "@/components/delete-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, RefreshCw } from "lucide-react"
import { teacherApi } from "@/lib/api"
import type { Teacher } from "@/lib/types"

const columns = [
  { key: "id" as const, label: "ID" },
  { key: "firstName" as const, label: "Ad" },
  { key: "lastName" as const, label: "Soyad" },
  { key: "email" as const, label: "E-posta" },
  { key: "phoneNumber" as const, label: "Telefon" },
  { key: "tcNo" as const, label: "TC No" },
  { key: "teacherClass" as const, label: "Sınıf" },
]

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)

  const fetchTeachers = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await teacherApi.getAll()
      setTeachers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTeachers()
  }, [fetchTeachers])

  const handleCreate = async (data: Omit<Teacher, "id">) => {
    await teacherApi.create(data)
    fetchTeachers()
  }

  const handleUpdate = async (data: Omit<Teacher, "id">) => {
    if (selectedTeacher?.id) {
      await teacherApi.update(selectedTeacher.id, data)
      fetchTeachers()
    }
  }

  const handleDelete = async () => {
    if (selectedTeacher?.id) {
      await teacherApi.delete(selectedTeacher.id)
      setDeleteOpen(false)
      setSelectedTeacher(null)
      fetchTeachers()
    }
  }

  const filteredTeachers = teachers.filter(
    (t) =>
      t.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 min-h-screen p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Öğretmenler</h1>
            <p className="mt-2 text-muted-foreground">Öğretmen listesini yönetin</p>
          </div>
          <Button
            onClick={() => {
              setSelectedTeacher(null)
              setFormOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Yeni Öğretmen
          </Button>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Öğretmen ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-input border-border pl-10 text-foreground"
            />
          </div>
          <Button variant="outline" onClick={fetchTeachers}>
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
          data={filteredTeachers}
          columns={columns}
          isLoading={isLoading}
          onEdit={(teacher) => {
            setSelectedTeacher(teacher)
            setFormOpen(true)
          }}
          onDelete={(teacher) => {
            setSelectedTeacher(teacher)
            setDeleteOpen(true)
          }}
        />

        <TeacherForm
          open={formOpen}
          onOpenChange={setFormOpen}
          teacher={selectedTeacher}
          onSubmit={selectedTeacher ? handleUpdate : handleCreate}
        />

        <DeleteDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onConfirm={handleDelete}
          title="Öğretmeni Sil"
          description={`${selectedTeacher?.firstName ?? ""} ${selectedTeacher?.lastName ?? ""} isimli öğretmeni silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
        />
      </main>
    </div>
  )
}
