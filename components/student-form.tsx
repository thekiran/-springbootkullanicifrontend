"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createStudent, updateStudent } from "@/lib/api"
import type { Student, StudentCreateRequest } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface StudentFormProps {
  student?: Student
  mode: "create" | "edit"
}

export function StudentForm({ student, mode }: StudentFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<StudentCreateRequest>({
    firstName: student?.firstName || "",
    lastName: student?.lastName || "",
    email: student?.email || "",
    telephone: "", // Always empty for edit since we only have masked version
    tcNo: "", // Always empty for edit since we only have masked version
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (mode === "create") {
        await createStudent(formData)
      } else if (student) {
        await updateStudent(student.id, formData)
      }
      router.push("/students")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>{mode === "create" ? "Add New Student" : "Edit Student"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          {mode === "edit" && student && (
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Current Phone:</span> {student.maskedPhoneNumber || "Not set"}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Current TC No:</span> {student.maskedtcNo || "Not set"}
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Burak"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="ERDEN"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="burak.erden@gmail.com"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="telephone">Phone Number</Label>
              <Input
                id="telephone"
                name="telephone"
                type="tel"
                value={formData.telephone}
                onChange={handleChange}
                required={mode === "create"}
                placeholder="+90 546 XXX XX XX"
              />
              {mode === "edit" && <p className="text-xs text-muted-foreground">Leave empty to keep current number</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tcNo">TC Kimlik No</Label>
              <Input
                id="tcNo"
                name="tcNo"
                value={formData.tcNo}
                onChange={handleChange}
                required={mode === "create"}
                placeholder="XXXXXXXXXXX"
                maxLength={11}
              />
              {mode === "edit" && <p className="text-xs text-muted-foreground">Leave empty to keep current TC No</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "create" ? "Create Student" : "Update Student"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
