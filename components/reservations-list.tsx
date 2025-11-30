"use client"

// ============================================
// LISTA DE RESERVAS
// Componente para mostrar las reservas existentes
// ============================================

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Reservation } from "@/lib/types/reservation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ReservationsListProps {
  refreshTrigger?: number
}

export function ReservationsList({ refreshTrigger }: ReservationsListProps) {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // useEffect se ejecuta cuando el componente se monta
  // y cuando refreshTrigger cambia
  useEffect(() => {
    async function fetchReservations() {
      setIsLoading(true)
      const supabase = createClient()

      // Consultar reservas ordenadas por fecha
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("date", { ascending: true })
        .order("time", { ascending: true })

      if (error) {
        console.error("Error fetching reservations:", error)
      } else {
        setReservations(data || [])
      }
      setIsLoading(false)
    }

    fetchReservations()
  }, [refreshTrigger])

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString + "T00:00:00").toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Función para formatear hora
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">Cargando reservas...</CardContent>
      </Card>
    )
  }

  if (reservations.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          No hay reservas todavía. ¡Sé el primero en reservar!
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservas recientes</CardTitle>
        <CardDescription>
          {reservations.length} reserva{reservations.length !== 1 ? "s" : ""} registrada
          {reservations.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <p className="font-medium">{reservation.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(reservation.date)} a las {formatTime(reservation.time)}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                  {reservation.guests} persona{reservation.guests !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
