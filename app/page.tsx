import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 min-h-screen p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Hoş Geldiniz</h1>
          <p className="mt-2 text-muted-foreground">Okul yönetim sistemine hoş geldiniz</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Öğrenci</CardTitle>
              <GraduationCap className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">-</div>
              <p className="text-xs text-muted-foreground">Veritabanından yükleniyor</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Öğretmen</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">-</div>
              <p className="text-xs text-muted-foreground">Veritabanından yükleniyor</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Aktif Sınıflar</CardTitle>
              <BookOpen className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">-</div>
              <p className="text-xs text-muted-foreground">Veritabanından yükleniyor</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sistem Durumu</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Aktif</div>
              <p className="text-xs text-muted-foreground">localhost:1010</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link href="/students">
            <Card className="cursor-pointer bg-card border-border transition-colors hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  Öğrenci Yönetimi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Öğrencileri görüntüleyin, ekleyin, düzenleyin ve silin.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/teachers">
            <Card className="cursor-pointer bg-card border-border transition-colors hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  Öğretmen Yönetimi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Öğretmenleri görüntüleyin, ekleyin, düzenleyin ve silin.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
