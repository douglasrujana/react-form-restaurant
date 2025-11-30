// ============================================
// CLIENTE DE SUPABASE (lado del cliente/browser)
// Usa este archivo para operaciones desde componentes "use client"
// ============================================

import { createBrowserClient } from "@supabase/ssr"

// Función para crear el cliente de Supabase
// Se usa createBrowserClient porque se ejecuta en el navegador
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
