"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { studentApi, teacherApi } from "@/lib/api"
import type { Student, Teacher } from "@/lib/types"
import { Users, Phone, Mail, Award as IdCard, BookOpen } from "lucide-react"

export function DashboardStats() {
  const { data: students } = useSWR<Student[]>("/students", studentApi.getAll)
  const { data: teachers } = useSWR<Teacher[]>("/teachers", teacherApi.getAll)

  const totalStudents = students?.length ?? 0
  const totalTeachers = teachers?.length ?? 0
  const studentsWithPhone = students?.filter((s) => s.phoneNumber || s.maskedPhoneNumber).length ?? 0
  const studentsWithTc = students?.filter((s) => s.tcNo || s.maskedTcNo).length ?? 0

  const studentClasses = students?.map((s) => s.studentClass).filter(Boolean) ?? []
  const teacherClasses = teachers?.map((t) => t.teacherClass).filter(Boolean) ?? []
  const activeClasses = new Set([...studentClasses, ...teacherClasses]).size

  const uniqueEmails = new Set([
    ...(students?.map((s) => s.email) ?? []),
    ...(teachers?.map((t) => t.email) ?? []),
  ]).size

  const stats = [
    {
      title: "Toplam Öğrenci",
      value: totalStudents,
      icon: Users,
      description: "Kayıtlı öğrenci sayısı",
    },
    {
      title: "Toplam Öğretmen",
      value: totalTeachers,
      icon: Users,
      description: "Kayıtlı öğretmen sayısı",
    },
    {
      title: "Aktif Sınıflar",
      value: activeClasses,
      icon: BookOpen,
      description: "Öğrenci/öğretmen sınıfları",
    },
    {
      title: "Eşsiz E-posta",
      value: uniqueEmails,
      icon: Mail,
      description: "Kayıtlı e-posta adresleri",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
