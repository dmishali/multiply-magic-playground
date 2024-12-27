import { createClient } from '@supabase/supabase-js';

// When connected to Supabase through Lovable, these environment variables are automatically available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase environment variables are not set. Make sure you are connected to Supabase in your Lovable project.');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);