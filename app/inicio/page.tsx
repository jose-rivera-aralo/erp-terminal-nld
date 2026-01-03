'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function InicioPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const validarSesion = async () => {
      const { data } = await supabase.auth.getSession()
      const session = data.session

      if (!session) {
        router.replace('/login')
        return
      }

      setEmail(session.user.email ?? null)
    }

    validarSesion()
  }, [router])

  if (!email) {
    return <p>Cargando…</p>
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Inicio</h1>
      <p>Bienvenido {email}</p>
    </main>
  )
}
