import Link from 'next/link';

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 py-20 px-6 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-semibold text-slate-900">Thank you for your gift!</h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          Your payment was successfully processed. We&apos;re grateful for your support in helping provide reliable clean water to communities in need.
        </p>
        {searchParams.session_id ? (
          <p className="mt-4 text-sm text-slate-500">
            Checkout Session ID: <span className="font-mono text-slate-600">{searchParams.session_id}</span>
          </p>
        ) : null}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Return home
          </Link>
          <Link
            href="/take-action/donate"
            className="rounded-full bg-[#0369a1] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#024f7a]"
          >
            Make another donation
          </Link>
        </div>
      </div>
    </main>
  );
}
