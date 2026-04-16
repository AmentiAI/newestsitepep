import { ratingFor } from '@/lib/rating'

export default function Rating({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { value, count } = ratingFor(slug)
  const full = Math.floor(value)
  const half = value - full >= 0.5
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return 'full'
    if (i === full && half) return 'half'
    return 'empty'
  })
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex" aria-label={`${value} out of 5`}>
        {stars.map((s, i) => (
          <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
            <defs>
              <linearGradient id={`g-${slug}-${i}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#f5c518" />
                <stop offset="50%" stopColor="#e7e5e4" />
              </linearGradient>
            </defs>
            <path
              d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.9L10 15l-5.2 2.7 1-5.9L1.5 7.7l5.9-.9L10 1.5z"
              fill={s === 'full' ? '#f5c518' : s === 'half' ? `url(#g-${slug}-${i})` : '#e7e5e4'}
              stroke="#d4a70a"
              strokeWidth="0.5"
            />
          </svg>
        ))}
      </div>
      {!compact && (
        <span className="text-ink-600">
          {value.toFixed(1)} <span className="text-ink-400">({count} reviews)</span>
        </span>
      )}
    </div>
  )
}
