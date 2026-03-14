import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith('http')) {
        console.warn('Supabase browser environment variables are missing or invalid. Initialization skipped.');
        return null as any;
    }

    try {
        return createBrowserClient(supabaseUrl, supabaseAnonKey);
    } catch (e) {
        console.error('Failed to initialize Supabase browser client:', e);
        return null as any;
    }
}
