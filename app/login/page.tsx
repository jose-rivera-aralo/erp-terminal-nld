'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      // 🔴 CLAVE: redirección correcta después de login
      router.replace('/inicio')
    } catch (err) {
      setError('Error inesperado al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f6f8',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: 380,
          background: '#ffffff',
          padding: 32,
          borderRadius: 12,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ marginBottom: 8 }}>Inicia sesión</h2>
        <p style={{ marginBottom: 24, color: '#666' }}>
          Accede con tus credenciales corporativas
        </p>

        <label style={{ fontSize: 14 }}>Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 16,
            borderRadius: 6,
            border: '1px solid #ccc',
          }}
        />

        <label style={{ fontSize: 14 }}>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 20,
            borderRadius: 6,
            border: '1px solid #ccc',
          }}
        />

        {error && (
          <p style={{ color: 'red', marginBottom: 12, fontSize: 14 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 8,
            border: 'none',
            background: loading ? '#ff9c7a' : '#ff4d1c',
            color: '#fff',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}
