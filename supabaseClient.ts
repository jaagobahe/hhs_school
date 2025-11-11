import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your project's URL and anon key
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-public-key';

// Warning for developers if credentials are not set
if (!supabaseUrl || supabaseUrl === 'https://your-project-url.supabase.co') {
    console.warn(
        "Supabase URL is not configured. Please replace 'https://your-project-url.supabase.co' in supabaseClient.ts with your actual Supabase project URL."
    );
}
if (!supabaseAnonKey || supabaseAnonKey === 'your-anon-public-key') {
     console.warn(
        "Supabase anon key is not configured. Please replace 'your-anon-public-key' in supabaseClient.ts with your actual Supabase anon public key."
     );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
