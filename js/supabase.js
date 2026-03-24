import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL  = 'https://xndipicdxxcjsypnatol.supabase.co';
export const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZGlwaWNkeHhjanN5cG5hdG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDAyNTMsImV4cCI6MjA4OTgxNjI1M30.ilJQmgW9nLzsOiZWzLVgX4fCxvxKaWd6gGjv0IJjgs0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

window.supabase = supabase;
