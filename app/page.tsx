// ============================================
// PÁGINA PRINCIPAL
// Server Component que renderiza la página
// ============================================

"use client"

import { useState } from "react"
import { RestaurantHeader } from "@/components/restaurant-header"
import { ReservationForm } from "@/components/reservation-form"
import { ReservationsList } from "@/components/reservations-list"

export default function HomePage() {
  // Estado para refrescar la lista cuando se crea una reserva
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleReservationSuccess = () => {
    // Incrementar para disparar un refresh de la lista
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header del restaurante */}
      <RestaurantHeader />

      {/* Contenido principal */}
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Columna izquierda: Formulario */}
          <div>
            <ReservationForm onSuccess={handleReservationSuccess} />
          </div>

          {/* Columna derecha: Lista de reservas */}
          <div>
            <ReservationsList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </main>

      {/* Footer simple */}
      <footer className="border-t bg-stone-100 py-8 text-center text-sm text-stone-600">
        <p>&copy; 2025 La Casa del Sabor. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
