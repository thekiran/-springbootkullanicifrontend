"use client"

import useSWR from "swr"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { studentApi } from "@/lib/api"
import type { Student } from "@/lib/types"

export function RecentStudents() {
  const { data: students } = useSWR<Student[]>("/students", studentApi.getAll)

  const recentStudents = students?.slice().sort((a, b) => (b.id ?? 0) - (a.id ?? 0)).slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Son Eklenen Öğrenciler</CardTitle>
      </CardHeader>
      <CardContent>
        {!recentStudents?.length ? (
          <p className="text-sm text-muted-foreground">Henüz öğrenci eklenmedi.</p>
        ) : (
          <div className="space-y-4">
            {recentStudents.map((student) => (
              <Link
                key={student.id}
                href={`/students/${student.id}/edit`}
                className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {student.firstName?.[0]}
                    {student.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {student.maskedPhoneNumber || student.phoneNumber || "Telefon yok"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
