import { Student, Teacher } from "./types"

// Use same-origin proxy by default to avoid CORS; override with NEXT_PUBLIC_API_BASE_URL when needed.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api"

type StudentApiModel = {
  id?: number
  email: string
  first_name?: string
  last_name?: string
  phone_number?: string
  tc_no?: string
  student_class?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  tcNo?: string
  studentClass?: string
  maskedPhoneNumber?: string
  maskedtcNo?: string
  maskedTcNo?: string
}

type TeacherApiModel = {
  id?: number
  teacher_class?: string
  email: string
  first_name?: string
  last_name?: string
  phone_number?: string
  tc_no?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  tcNo?: string
  teacherClass?: string
}

const mapStudentFromApi = (data: StudentApiModel): Student => ({
  id: data.id,
  email: data.email,
  firstName: data.firstName ?? data.first_name ?? "",
  lastName: data.lastName ?? data.last_name ?? "",
  phoneNumber: data.phoneNumber ?? data.phone_number ?? "",
  tcNo: data.tcNo ?? data.tc_no ?? "",
  studentClass: data.studentClass ?? data.student_class ?? "",
  maskedPhoneNumber: data.maskedPhoneNumber ?? data.phone_number ?? data.phoneNumber ?? "",
  maskedTcNo: data.maskedTcNo ?? data.maskedtcNo ?? data.tc_no ?? data.tcNo ?? "",
})

const mapStudentToApi = (data: Partial<Student>): Partial<StudentApiModel> => {
  const payload: Partial<StudentApiModel> = {}
  if (data.email !== undefined) payload.email = data.email
  if (data.firstName !== undefined) payload.firstName = data.firstName
  if (data.lastName !== undefined) payload.lastName = data.lastName
  if (data.phoneNumber !== undefined) payload.phoneNumber = data.phoneNumber
  if (data.tcNo !== undefined) payload.tcNo = data.tcNo
  if (data.studentClass !== undefined) payload.studentClass = data.studentClass
  return payload
}

const mapTeacherFromApi = (data: TeacherApiModel): Teacher => ({
  id: data.id,
  email: data.email,
  firstName: data.firstName ?? data.first_name ?? "",
  lastName: data.lastName ?? data.last_name ?? "",
  phoneNumber: data.phoneNumber ?? data.phone_number ?? "",
  tcNo: data.tcNo ?? data.tc_no ?? "",
  teacherClass: data.teacherClass ?? data.teacher_class ?? "",
})

const mapTeacherToApi = (data: Partial<Teacher>): Partial<TeacherApiModel> => {
  const payload: Partial<TeacherApiModel> = {}
  if (data.email !== undefined) payload.email = data.email
  if (data.firstName !== undefined) payload.firstName = data.firstName
  if (data.lastName !== undefined) payload.lastName = data.lastName
  if (data.phoneNumber !== undefined) payload.phoneNumber = data.phoneNumber
  if (data.tcNo !== undefined) payload.tcNo = data.tcNo
  if (data.teacherClass !== undefined) payload.teacherClass = data.teacherClass
  return payload
}

// Student API
export const studentApi = {
  getAll: async (): Promise<Student[]> => {
    const res = await fetch(`${API_BASE_URL}/students`)
    if (!res.ok) throw new Error("Öğrenciler yüklenemedi")
    const json: StudentApiModel[] = await res.json()
    return json.map(mapStudentFromApi)
  },

  getById: async (id: number): Promise<Student> => {
    const res = await fetch(`${API_BASE_URL}/students/${id}`)
    if (!res.ok) throw new Error("Öğrenci bulunamadı")
    const json: StudentApiModel = await res.json()
    return mapStudentFromApi(json)
  },

  create: async (student: Omit<Student, "id">): Promise<Student> => {
    const res = await fetch(`${API_BASE_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mapStudentToApi(student)),
    })
    if (!res.ok) throw new Error("Öğrenci eklenemedi")
    const json: StudentApiModel = await res.json()
    return mapStudentFromApi(json)
  },

  update: async (id: number, student: Partial<Student>): Promise<Student> => {
    const res = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mapStudentToApi(student)),
    })
    if (!res.ok) throw new Error("Öğrenci güncellenemedi")
    const json: StudentApiModel = await res.json()
    return mapStudentFromApi(json)
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
    const json: TeacherApiModel[] = await res.json()
    return json.map(mapTeacherFromApi)
  },

  getById: async (id: number): Promise<Teacher> => {
    const res = await fetch(`${API_BASE_URL}/teachers/${id}`)
    if (!res.ok) throw new Error("Öğretmen bulunamadı")
    const json: TeacherApiModel = await res.json()
    return mapTeacherFromApi(json)
  },

  create: async (teacher: Omit<Teacher, "id">): Promise<Teacher> => {
    const res = await fetch(`${API_BASE_URL}/teachers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mapTeacherToApi(teacher)),
    })
    if (!res.ok) throw new Error("Öğretmen eklenemedi")
    const json: TeacherApiModel = await res.json()
    return mapTeacherFromApi(json)
  },

  update: async (id: number, teacher: Partial<Teacher>): Promise<Teacher> => {
    const res = await fetch(`${API_BASE_URL}/teachers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mapTeacherToApi(teacher)),
    })
    if (!res.ok) throw new Error("Öğretmen güncellenemedi")
    const json: TeacherApiModel = await res.json()
    return mapTeacherFromApi(json)
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/teachers/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Öğretmen silinemedi")
  },
}

// Legacy helpers used by existing components
export const fetchStudents = () => studentApi.getAll()
export const deleteStudent = (id: number) => studentApi.delete(id)
export const fetchStudent = (id: number) => studentApi.getById(id)
