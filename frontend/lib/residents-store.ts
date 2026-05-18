import { Resident, ResidentFormData } from './types'

// Initial mock data
const initialResidents: Resident[] = [
  {
    id: '1',
    name: 'João',
    lastName: 'Silva',
    document: '123.456.789-00',
    residence: 'Apartamento 101, Bloco A',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Maria',
    lastName: 'Santos',
    document: '987.654.321-00',
    residence: 'Apartamento 205, Bloco B',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Carlos',
    lastName: 'Oliveira',
    document: '456.789.123-00',
    residence: 'Casa 15',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
  },
]

// In-memory store
let residents: Resident[] = [...initialResidents]
let nextId = 4

export const residentsStore = {
  getAll: (): Resident[] => {
    return [...residents]
  },

  getById: (id: string): Resident | undefined => {
    return residents.find((r) => r.id === id)
  },

  create: (data: ResidentFormData): Resident => {
    const newResident: Resident = {
      ...data,
      id: String(nextId++),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    residents.push(newResident)
    return newResident
  },

  update: (id: string, data: ResidentFormData): Resident | undefined => {
    const index = residents.findIndex((r) => r.id === id)
    if (index === -1) return undefined

    residents[index] = {
      ...residents[index],
      ...data,
      updatedAt: new Date(),
    }
    return residents[index]
  },

  delete: (id: string): boolean => {
    const index = residents.findIndex((r) => r.id === id)
    if (index === -1) return false

    residents.splice(index, 1)
    return true
  },
}
