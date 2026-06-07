import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const createStub = () => ({
	auth: {
		getSession: async () => ({ data: { session: null } }),
		getUser: async () => ({ data: { user: null } }),
		onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
		signOut: async () => ({ error: null }),
		signInWithPassword: async () => ({ data: null, error: null }),
		updateUser: async () => ({ data: null, error: null }),
	},
	from: () => ({ select: async () => ({ data: null, error: null }) }),
	storage: { from: () => ({ upload: async () => ({ data: null, error: null }), getPublicUrl: () => ({ publicUrl: '' }) }) },
});

// If env vars are missing, return a stubbed client to avoid runtime crashes during static builds.
// This can mask authentication behavior in development, so warn the developer.
if (!supabaseUrl || !supabaseKey) {
	// eslint-disable-next-line no-console
	console.warn('Supabase env vars missing (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY). Using stubbed supabase client. Auth flows will be no-op.');
}

// Export as `any` to avoid type errors during prerender when env vars are absent
export const supabase: any = supabaseUrl && supabaseKey ? (createClient(supabaseUrl, supabaseKey) as any) : (createStub() as any);