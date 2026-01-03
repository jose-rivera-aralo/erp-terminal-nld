import { supabase } from '@/lib/supabaseClient'

export default async function Home() {
  const { data, error } = await supabase
    .from('roles')
    .select('*')

  if (error) {
    return (
      <div style={{ padding: 20, color: 'red' }}>
        <h1>Error al conectar con Supabase</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    )
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Roles cargados desde Supabase</h1>

      <pre style={{ marginTop: 20 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  )
}
