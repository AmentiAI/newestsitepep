import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL
export const sql = url ? neon(url) : null

export function hasDb(): boolean {
  return sql !== null
}
