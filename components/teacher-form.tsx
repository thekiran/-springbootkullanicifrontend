"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Teacher } from "@/lib/api"

interface TeacherFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teacher?: Teacher | null
  onSubmit: (data: Omit<Teacher, "id">) => Promise<void>
}

export function TeacherForm({ open, onOpenChange, teacher, onSubmit }: TeacherFormProps) {
  const [formData, setFormData] = useState({
    teacher_class: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    tc_no: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (teacher) {
      setFormData({
        teacher_class: teacher.teacher_class,
        email: teacher.email,
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        phone_number: teacher.phone_number,
        tc_no: teacher.tc_no,
      })
    } else {
      setFormData({
        teacher_class: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        tc_no: "",
      })
    }
  }, [teacher, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSubmit(formData)
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">{teacher ? "Öğretmen Düzenle" : "Yeni Öğretmen Ekle"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name" className="text-muted-foreground">
                Ad
              </Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="bg-input border-border text-foreground"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name" className="text-muted-foreground">
                Soyad
              </Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
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
            <Label htmlFor="phone_number" className="text-muted-foreground">
              Telefon
            </Label>
            <Input
              id="phone_number"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              className="bg-input border-border text-foreground"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tc_no" className="text-muted-foreground">
                TC No
              </Label>
              <Input
                id="tc_no"
                value={formData.tc_no}
                onChange={(e) => setFormData({ ...formData, tc_no: e.target.value })}
                className="bg-input border-border text-foreground"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher_class" className="text-muted-foreground">
                Sınıf
              </Label>
              <Input
                id="teacher_class"
                value={formData.teacher_class}
                onChange={(e) => setFormData({ ...formData, teacher_class: e.target.value })}
                className="bg-input border-border text-foreground"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Kaydediliyor..." : teacher ? "Güncelle" : "Ekle"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
