// ============================================
// TIPOS DE TYPESCRIPT
// Definimos los tipos para tener autocompletado y seguridad
// ============================================

// Tipo para una reserva completa (como viene de la base de datos)
export interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  notes: string | null
  created_at: string
}

// Tipo para crear una nueva reserva (sin id ni created_at)
export type NewReservation = Omit<Reservation, "id" | "created_at">
