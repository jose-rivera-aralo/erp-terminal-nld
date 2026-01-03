import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabaseServer'

export default async function InicioPage() {
  const supabase = createSupabaseServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Inicio</h1>
      <p>Bienvenido a {session.user.email}</p>
    </main>
  )
}

