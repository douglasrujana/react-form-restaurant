"use client"

// ============================================
// FORMULARIO DE RESERVAS
// Componente cliente que maneja el formulario
// ============================================

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { reservationSchema, type ReservationFormData } from "@/lib/validations/reservation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ReservationFormProps {
  onSuccess?: () => void
}

export function ReservationForm({ onSuccess }: ReservationFormProps) {
  // Estado para manejar el envío y mensajes
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // useForm de react-hook-form con validación de Zod
  // zodResolver conecta Zod con react-hook-form
  const {
    register, // Conecta inputs al formulario
    handleSubmit, // Maneja el envío del formulario
    reset, // Limpia el formulario
    formState: { errors }, // Errores de validación
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: 2,
      notes: "",
    },
  })

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      // Crear cliente de Supabase
      const supabase = createClient()

      // Comprobación rápida: indicar si las env vars públicas están presentes (no imprimir las claves)
      // útil para debugging en producción sin exponer valores
      // eslint-disable-next-line no-console
      console.log("SUPABASE_ENV_PRESENT", {
        url: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
        anonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      })

      // Insertar la reserva en la base de datos
      const { data: insertData, error } = await supabase.from("reservations").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
        guests: data.guests,
        notes: data.notes || null,
      })

      // Log completo del resultado para debugging
      // eslint-disable-next-line no-console
      console.log("Supabase insert result:", { insertData, error })

      if (error) {
        throw error
      }

      // Éxito: mostrar mensaje y limpiar formulario
      setSubmitMessage({
        type: "success",
        text: "¡Reserva confirmada! Te enviaremos un correo de confirmación.",
      })
      reset()
      onSuccess?.()
    } catch (error) {
      // Error: mostrar mensaje y loguearlo
      // eslint-disable-next-line no-console
      console.error("Error al insertar reserva:", error)
      setSubmitMessage({
        type: "error",
        text:
          error && typeof error === "object" && "message" in error
            ? (error as any).message
            : "Error al crear la reserva. Por favor intenta de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calcular fecha mínima (hoy)
  const today = new Date().toISOString().split("T")[0]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Reserva tu mesa</CardTitle>
        <CardDescription>Completa el formulario para hacer tu reservación</CardDescription>
      </CardHeader>
      <CardContent>
        {/* handleSubmit valida antes de ejecutar onSubmit */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo: Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" placeholder="Juan Pérez" {...register("name")} aria-invalid={!!errors.name} />
            {/* Mostrar error si existe */}
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          {/* Campo: Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="juan@ejemplo.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          {/* Campo: Teléfono */}
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 234 567 8900"
              {...register("phone")}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>

          {/* Campos en fila: Fecha y Hora */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input id="date" type="date" min={today} {...register("date")} aria-invalid={!!errors.date} />
              {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <Input id="time" type="time" min="11:00" max="22:00" {...register("time")} aria-invalid={!!errors.time} />
              {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
            </div>
          </div>

          {/* Campo: Número de personas */}
          <div className="space-y-2">
            <Label htmlFor="guests">Número de personas</Label>
            <Input id="guests" type="number" min={1} max={20} {...register("guests")} aria-invalid={!!errors.guests} />
            {errors.guests && <p className="text-sm text-destructive">{errors.guests.message}</p>}
          </div>

          {/* Campo: Notas especiales (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="notes">
              Peticiones especiales <span className="text-muted-foreground">(opcional)</span>
            </Label>
            <Textarea
              id="notes"
              placeholder="Alergias, ocasión especial, preferencia de mesa..."
              rows={3}
              {...register("notes")}
              aria-invalid={!!errors.notes}
            />
            {errors.notes && <p className="text-sm text-destructive">{errors.notes.message}</p>}
          </div>

          {/* Mensaje de éxito o error */}
          {submitMessage && (
            <div
              className={`rounded-lg p-4 text-sm ${
                submitMessage.type === "success"
                  ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
                  : "bg-destructive/10 text-destructive"
              }`}
              role="alert"
            >
              {submitMessage.text}
            </div>
          )}

          {/* Botón de envío */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Reservando..." : "Confirmar reserva"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
