import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pagkhsjaabzmolqeewtc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZ2toc2phYWJ6bW9scWVld3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNTMwOTIsImV4cCI6MjA4MDcyOTA5Mn0.VepLXUWsO3FjpxeQLgm0xwHRqecJsBcFDxw1Dd8pTB8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
