import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export function createSupabaseServer() {
  const cookieStore = cookies()

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
      global: {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    }
  )
}