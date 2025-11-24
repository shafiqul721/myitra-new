import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Replace these with your actual Supabase project values
const SUPABASE_URL = "https://szfpwaascymteojkcmeb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZnB3YWFzY3ltdGVvamtjbWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMzYzNDUsImV4cCI6MjA3ODcxMjM0NX0.3t74vMgm19iB4INDNruCfKz8QrHWcOK81Iks-os3t2A";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase object created:", supabase);
