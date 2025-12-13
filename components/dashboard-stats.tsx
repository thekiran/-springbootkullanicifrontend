"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchStudents } from "@/lib/api"
import type { Student } from "@/lib/types"
import { Users, Phone, Mail, Award as IdCard } from "lucide-react"

export function DashboardStats() {
  const { data: students } = useSWR<Student[]>("/students", fetchStudents)

  const totalStudents = students?.length || 0
  const studentsWithPhone = students?.filter((s) => s.maskedPhoneNumber).length || 0
  const studentsWithTc = students?.filter((s) => s.maskedtcNo).length || 0
  const uniqueEmails = new Set(students?.map((s) => s.email)).size || 0

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      description: "Registered students",
    },
    {
      title: "With Phone",
      value: studentsWithPhone,
      icon: Phone,
      description: "Students with phone number",
    },
    {
      title: "With TC No",
      value: studentsWithTc,
      icon: IdCard,
      description: "Students with TC number",
    },
    {
      title: "Unique Emails",
      value: uniqueEmails,
      icon: Mail,
      description: "Registered email addresses",
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
