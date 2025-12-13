import type { Student, StudentCreateRequest, StudentUpdateRequest } from "./types"

// Use Next.js rewrite proxy to avoid CORS during local dev
const API_BASE_URL = "/api/students"

async function parseJsonSafely<T>(response: Response, { allowEmpty = false } = {}): Promise<T | null> {
  const text = await response.text()
  if (!text) {
    if (allowEmpty) return null
    throw new Error("Empty response from server")
  }
  try {
    return JSON.parse(text) as T
  } catch (err) {
    throw new Error("Server returned invalid JSON")
  }
}

export async function fetchStudents(): Promise<Student[]> {
  const response = await fetch(API_BASE_URL)
  if (!response.ok) {
    throw new Error("Failed to fetch students")
  }
  const data = await parseJsonSafely<Student[]>(response)
  if (!data) {
    throw new Error("Received empty student list")
  }
  return data
}

export async function fetchStudent(id: number): Promise<Student> {
  const response = await fetch(`${API_BASE_URL}/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch student")
  }
  const data = await parseJsonSafely<Student>(response)
  if (!data) {
    throw new Error("Student not found")
  }
  return data
}

export async function createStudent(data: StudentCreateRequest): Promise<Student | null> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create student")
  }
  // Some backends may return 201 with empty body
  return parseJsonSafely<Student>(response, { allowEmpty: true })
}

export async function updateStudent(id: number, data: StudentUpdateRequest): Promise<Student | null> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to update student")
  }
  // Some backends may return 200/204 with empty body
  return parseJsonSafely<Student>(response, { allowEmpty: true })
}

export async function deleteStudent(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete student")
  }
}
