// ============================================
// HEADER DEL RESTAURANTE
// Componente de presentación del restaurante
// ============================================

export function RestaurantHeader() {
  return (
    <header className="relative overflow-hidden bg-stone-900 text-stone-50">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0">
        <img src="/elegant-restaurant-interior-warm-lighting.jpg" alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 to-stone-900/90" />
      </div>

      {/* Contenido */}
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-400">Desde 1985</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">La Casa del Sabor</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-300">
            Cocina tradicional con un toque moderno. Ingredientes frescos, recetas de familia y un ambiente acogedor
            para momentos especiales.
          </p>
        </div>

        {/* Info del restaurante */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-stone-400">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Lun - Dom: 11:00 AM - 10:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Calle Principal 123, Centro</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>+1 234 567 8900</span>
          </div>
        </div>
      </div>
    </header>
  )
}
