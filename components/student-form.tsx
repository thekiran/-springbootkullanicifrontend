"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Student } from "@/lib/types"

interface StudentFormProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  student?: Student | null
  onSubmit: (data: Omit<Student, "id">) => Promise<void>
  asPage?: boolean
}

export function StudentForm({ open = false, onOpenChange, student, onSubmit, asPage = false }: StudentFormProps) {
  const [formData, setFormData] = useState<Omit<Student, "id">>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    tcNo: "",
    studentClass: "",
    maskedPhoneNumber: "",
    maskedTcNo: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (student) {
      setFormData({
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
        phoneNumber: student.phoneNumber,
        tcNo: student.tcNo,
        studentClass: student.studentClass,
        maskedPhoneNumber: student.maskedPhoneNumber ?? "",
        maskedTcNo: student.maskedTcNo ?? "",
      })
    } else {
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        tcNo: "",
        studentClass: "",
        maskedPhoneNumber: "",
        maskedTcNo: "",
      })
    }
  }, [student, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSubmit(formData)
      onOpenChange?.(false)
    } finally {
      setIsLoading(false)
    }
  }

  const form = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-muted-foreground">
            Ad
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="bg-input border-border text-foreground"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-muted-foreground">
            Soyad
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="bg-input border-border text-foreground"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-muted-foreground">
          E-posta
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-input border-border text-foreground"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-muted-foreground">
          Telefon
        </Label>
        <Input
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          className="bg-input border-border text-foreground"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tcNo" className="text-muted-foreground">
            TC No
          </Label>
          <Input
            id="tcNo"
            value={formData.tcNo}
            onChange={(e) => setFormData({ ...formData, tcNo: e.target.value })}
            className="bg-input border-border text-foreground"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentClass" className="text-muted-foreground">
            Sınıf
          </Label>
          <Input
            id="studentClass"
            value={formData.studentClass}
            onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
            className="bg-input border-border text-foreground"
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        {!asPage && (
          <Button type="button" variant="outline" onClick={() => onOpenChange?.(false)}>
            İptal
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Kaydediliyor..." : student ? "Güncelle" : "Ekle"}
        </Button>
      </div>
    </form>
  )

  if (asPage) {
    return (
      <div className="max-w-2xl rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">{student ? "Öğrenci Düzenle" : "Öğrenci Ekle"}</h2>
        {form}
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">{student ? "Öğrenci Düzenle" : "Yeni Öğrenci Ekle"}</DialogTitle>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  )
}
