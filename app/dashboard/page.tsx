import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function DashboardPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 🚫 Si NO hay sesión → login
  if (!session) {
    redirect('/login')
  }

  // ✅ Si hay sesión → dashboard
  return (
    <main style={{ padding: 32 }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {session.user.email}</p>
    </main>
  )
}
