import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const stubError = { message: 'Supabase client not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.' };

const createStub = () => ({
	auth: {
		getSession: async () => ({ data: { session: null }, error: stubError }),
		getUser: async () => ({ data: { user: null }, error: stubError }),
		onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
		signOut: async () => ({ error: stubError }),
		signInWithPassword: async () => ({ data: null, error: stubError }),
		updateUser: async () => ({ data: null, error: stubError }),
	},
	from: () => ({ select: async () => ({ data: null, error: stubError }) }),
	storage: { from: () => ({ upload: async () => ({ data: null, error: stubError }), getPublicUrl: () => ({ publicUrl: '' }) }) },
});

// If env vars are missing, return a stubbed client to avoid runtime crashes during static builds.
// This can mask authentication behavior in development, so warn the developer.
if (!supabaseUrl || !supabaseKey) {
	// eslint-disable-next-line no-console
	console.warn('Supabase env vars missing (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY). Using stubbed supabase client. Auth flows will be no-op.');
}

// Export as `any` to avoid type errors during prerender when env vars are absent
export const supabase: any = supabaseUrl && supabaseKey ? (createBrowserClient(supabaseUrl, supabaseKey) as any) : (createStub() as any);