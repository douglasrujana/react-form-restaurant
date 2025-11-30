// ============================================
// VALIDACIÓN CON ZOD
// Zod es una librería para validar datos de forma segura
// ============================================

import { z } from "zod"

// Definimos el esquema de validación para una reserva
// z.object() crea un validador para objetos
export const reservationSchema = z.object({
  // z.string() valida que sea texto
  // .min(2) requiere mínimo 2 caracteres
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es muy largo"),

  // .email() valida formato de correo electrónico
  email: z.string().email("Ingresa un correo electrónico válido"),

  // Validamos formato de teléfono básico
  phone: z.string().min(7, "El teléfono debe tener al menos 7 dígitos").max(20, "El teléfono es muy largo"),

  // Validamos que la fecha sea futura
  date: z.string().min(1, "Selecciona una fecha"),

  // Validamos formato de hora
  time: z.string().min(1, "Selecciona una hora"),

  // z.coerce.number() convierte string a número automáticamente
  // .int() valida que sea entero
  guests: z.coerce.number().int("Debe ser un número entero").min(1, "Mínimo 1 persona").max(20, "Máximo 20 personas"),

  // .optional() significa que este campo no es requerido
  notes: z.string().max(500, "Las notas son muy largas").optional(),
})

// TypeScript: Extraemos el tipo del esquema de Zod
// Esto nos da autocompletado y verificación de tipos
export type ReservationFormData = z.infer<typeof reservationSchema>
