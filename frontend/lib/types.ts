export interface Resident {
  id: string
  name: string
  lastName: string
  document: string
  residence: string
  createdAt: Date
  updatedAt: Date
}

export type ResidentFormData = Omit<Resident, 'id' | 'createdAt' | 'updatedAt'>
