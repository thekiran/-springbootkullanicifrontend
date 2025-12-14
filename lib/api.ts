const API_BASE_URL = "http://localhost:1010"

export interface Student {
  id?: number
  email: string
  first_name: string
  last_name: string
  phone_number: string
  tc_no: string
  student_class: string
}

export interface Teacher {
  id?: number
  teacher_class: string
  email: string
  first_name: string
  last_name: string
  phone_number: string
  tc_no: string
}

// Student API
export const studentApi = {
  getAll: async (): Promise<Student[]> => {
    const res = await fetch(`${API_BASE_URL}/students`)
    if (!res.ok) throw new Error("Öğrenciler yüklenemedi")
    return res.json()
  },

  getById: async (id: number): Promise<Student> => {
    const res = await fetch(`${API_BASE_URL}/students/${id}`)
    if (!res.ok) throw new Error("Öğrenci bulunamadı")
    return res.json()
  },

  create: async (student: Omit<Student, "id">): Promise<Student> => {
    const res = await fetch(`${API_BASE_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
    if (!res.ok) throw new Error("Öğrenci eklenemedi")
    return res.json()
  },

  update: async (id: number, student: Partial<Student>): Promise<Student> => {
    const res = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
    if (!res.ok) throw new Error("Öğrenci güncellenemedi")
    return res.json()
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Öğrenci silinemedi")
  },
}

// Teacher API
export const teacherApi = {
  getAll: async (): Promise<Teacher[]> => {
    const res = await fetch(`${API_BASE_URL}/teachers`)
    if (!res.ok) throw new Error("Öğretmenler yüklenemedi")
    return res.json()
  },

  getById: async (id: number): Promise<Teacher> => {
    const res = await fetch(`${API_BASE_URL}/teachers/${id}`)
    if (!res.ok) throw new Error("Öğretmen bulunamadı")
    return res.json()
  },

  create: async (teacher: Omit<Teacher, "id">): Promise<Teacher> => {
    const res = await fetch(`${API_BASE_URL}/teachers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacher),
    })
    if (!res.ok) throw new Error("Öğretmen eklenemedi")
    return res.json()
  },

  update: async (id: number, teacher: Partial<Teacher>): Promise<Teacher> => {
    const res = await fetch(`${API_BASE_URL}/teachers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacher),
    })
    if (!res.ok) throw new Error("Öğretmen güncellenemedi")
    return res.json()
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/teachers/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Öğretmen silinemedi")
  },
}
