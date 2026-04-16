import sharp from 'sharp'
import { mkdirSync, copyFileSync } from 'fs'
import { join } from 'path'

const SRC = 'public/New folder (30)/84fdf845-bb12-4b42-9016-68a0605f5811.png'
const OUT = 'public'

mkdirSync(OUT, { recursive: true })

// Crop out the dark border by trimming near-uniform edges, then produce
// square transparent-ish outputs at every favicon/PWA size we need.
const base = sharp(SRC).trim({ threshold: 25 })

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'og-image.png', size: 1200 },
]

for (const { name, size } of sizes) {
  await base
    .clone()
    .resize(size, size, { fit: 'contain', background: { r: 17, g: 24, b: 39, alpha: 1 } })
    .png()
    .toFile(join(OUT, name))
  console.log('wrote', name)
}

// Main logo (full resolution, trimmed) for in-page use.
await base.clone().resize(800, 800, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(join(OUT, 'logo.png'))
console.log('wrote logo.png')

// favicon.ico — use 32x32 PNG renamed (browsers accept PNG .ico in modern era,
// and Next.js App Router prefers app/icon.* anyway).
copyFileSync(join(OUT, 'favicon-32x32.png'), join(OUT, 'favicon.ico'))
console.log('wrote favicon.ico')
