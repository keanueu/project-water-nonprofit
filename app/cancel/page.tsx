import Link from 'next/link';

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-20 px-6 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-semibold text-slate-900">Payment canceled</h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          Your checkout session was not completed. If you changed your mind, feel free to try again or contact us if you need help.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/take-action/donate"
            className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Try again
          </Link>
          <Link
            href="/"
            className="rounded-full bg-[#0369a1] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#024f7a]"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
