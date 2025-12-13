export interface Student {
  id: number
  firstName: string
  lastName: string
  email: string
  maskedPhoneNumber: string
  maskedtcNo: string
}

export interface StudentCreateRequest {
  firstName: string
  lastName: string
  email: string
  telephone: string
  tcNo: string
}

export interface StudentUpdateRequest {
  firstName: string
  lastName: string
  email: string
  telephone: string
  tcNo: string
}
