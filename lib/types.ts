export interface Student {
  id?: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  tcNo: string
  studentClass: string
  maskedPhoneNumber?: string
  maskedTcNo?: string
}

export interface Teacher {
  id?: number
  teacherClass: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  tcNo: string
}
