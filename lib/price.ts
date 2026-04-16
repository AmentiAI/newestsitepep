import { SITE } from './site'

export function discounted(priceNum: number) {
  return priceNum * (1 - SITE.promoPercent / 100)
}

export function fmt(n: number) {
  return `$${n.toFixed(2)}`
}

export function discountedFmt(priceNum: number) {
  return fmt(discounted(priceNum))
}
