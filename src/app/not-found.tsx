import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100vh] w-full items-center justify-center overflow-hidden bg-black px-4 py-16 sm:py-24">
      {/* Purple glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5b4dff]/30 blur-[120px] sm:h-[480px] sm:w-[480px]"
      />

      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-300 sm:text-sm">
          <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
          Error 404
          <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
        </p>

        <h1 className="bg-gradient-to-b from-white to-[#5b4dff] bg-clip-text text-7xl font-semibold leading-none text-transparent sm:text-8xl lg:text-9xl">
          404
        </h1>

        <h2 className="mt-6 text-balance text-2xl font-medium leading-tight text-white sm:text-3xl lg:text-4xl">
          This role has already moved on
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm text-gray-400 sm:text-base">
          The page you are looking for does not exist, was moved, or the link is broken.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="w-full rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200 sm:w-auto"
          >
            Back to home
          </Link>
          <Link
            href="/jobs"
            className="w-full rounded-lg border border-white/15 bg-black/40 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 sm:w-auto"
          >
            Browse jobs
          </Link>
        </div>
      </div>
    </section>
  )
}