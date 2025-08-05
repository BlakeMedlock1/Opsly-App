import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = 'https://bgpgijfctokperesyyvd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJncGdpamZjdG9rcGVyZXN5eXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MDM2NDIsImV4cCI6MjA2NDM3OTY0Mn0.MObMgxBgEacb2GWzObtfZ9RDDzxmVv_YQzO5ZyOJ_WQ'

export const supabase = createClient(SUPABASE_URL, supabaseAnonKey)
