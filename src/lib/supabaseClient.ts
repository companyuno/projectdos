"use client"

import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) || ''
const supabaseAnon = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || ''

export const supabaseBrowser: SupabaseClient | null = (supabaseUrl && supabaseAnon)
  ? createClient(supabaseUrl, supabaseAnon)
  : null 