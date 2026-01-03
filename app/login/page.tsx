'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
      return
    }

    // ✅ LOGIN EXITOSO → REDIRECCIÓN
    router.push('/dashboard')
  }

  return (
    <main className="login-layout">
      {/* PANEL IZQUIERDO */}
      <section className="login-brand">
        <div className="brand-header">
          <div className="brand-logo">GA</div>
          <div>
            <p className="brand-group">GRUPO ARALO</p>
            <p className="brand-area">Aralo Express · Terminal NLD</p>
          </div>
        </div>

        <h1>Portal de Gestión Operativa</h1>
        <p className="brand-description">
          Administración de procesos operativos y de calidad
          dentro de la terminal de Nuevo Laredo.
        </p>

        <div className="brand-card">
          <h4>Alcance del sistema</h4>
          <ul>
            <li>✔ Control de procesos operativos</li>
            <li>✔ Seguimiento a desviaciones</li>
            <li>✔ Gestión bajo estándares Aralo Express</li>
          </ul>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="login-form">
        <div className="form-card">
          <h2>Inicia sesión</h2>
          <p className="form-subtitle">
            Accede con tus credenciales corporativas
          </p>

          <label>Correo</label>
          <input
            type="email"
            placeholder="usuario@aralo.com.mx"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Ingresando…' : 'INGRESAR'}
          </button>

          {error && <p className="form-error">{error}</p>}
        </div>
      </section>
    </main>
  )
}