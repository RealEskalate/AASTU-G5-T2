import type { Student } from "./student"

export interface Group {
  id: string
  name: string
  code: string
  members: number
  timeSpent: number
  avgRating: number
  highlight?: boolean
  problemsSolved?: number
  students?: Student[]
}
