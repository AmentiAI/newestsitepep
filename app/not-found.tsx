import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-ink-900">Out of range</h1>
      <p className="mt-3 text-ink-600">That page isn't in the catalogue.</p>
      <Link href="/" className="btn-yellow mt-6 inline-block">Back to home</Link>
    </div>
  )
}
