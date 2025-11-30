-- ============================================
-- TABLA DE RESERVAS PARA RESTAURANTE
-- Esta es la estructura básica de una tabla en Supabase
-- ============================================

-- Actualizado los nombres de columnas para coincidir con la tabla real
CREATE TABLE reservations (
  -- ID único generado automáticamente
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Datos del cliente
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Datos de la reserva
  date DATE NOT NULL,
  time TEXT NOT NULL,
  guests INTEGER NOT NULL CHECK (guests >= 1 AND guests <= 20),
  
  -- Notas especiales (opcional)
  notes TEXT,
  
  -- Fecha de creación automática
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Importante: Siempre habilitar RLS en tablas de Supabase
-- ============================================

-- Habilitar RLS en la tabla
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Política para permitir a cualquiera INSERTAR reservas (público)
-- En una app real, podrías querer autenticación
CREATE POLICY "Cualquiera puede crear reservas" 
  ON reservations 
  FOR INSERT 
  WITH CHECK (true);

-- Política para permitir a cualquiera VER reservas
-- En producción, limitarías esto a usuarios autenticados/admin
CREATE POLICY "Cualquiera puede ver reservas" 
  ON reservations 
  FOR SELECT 
  USING (true);
