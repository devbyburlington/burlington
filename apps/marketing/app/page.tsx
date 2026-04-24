export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="font-serif text-5xl text-teal-light">
        Burlington Consult
      </h1>
      <p className="mt-4 max-w-lg text-center text-lg text-white/70">
        Premium U.S. immigration advisory for exceptional professionals
        worldwide.
      </p>
      <div className="mt-8 flex gap-4">
        <span className="rounded bg-teal px-4 py-2 text-sm font-medium text-white">
          Design tokens loaded
        </span>
        <span className="rounded border border-ink-muted px-4 py-2 text-sm text-white/50">
          Sprint -2 scaffold
        </span>
      </div>
    </main>
  )
}
