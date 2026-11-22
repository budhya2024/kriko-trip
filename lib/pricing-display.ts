import { formatInr } from './format'

export interface PricingDisplay {
  pricePaise: number
  priceFormatted: string
  hasDiscount: boolean
  originalPricePaise: number | null
  originalPriceFormatted: string | null
  discountPercent: number
  savePaise: number
  saveFormatted: string
}

export function getPricingDisplay(
  pricePaise: number,
  originalPricePaise?: number | null
): PricingDisplay {
  const hasDiscount = Boolean(
    originalPricePaise && originalPricePaise > pricePaise
  )
  const original = hasDiscount && originalPricePaise ? originalPricePaise : null
  const save = original ? original - pricePaise : 0
  const discountPercent = original ? Math.round((save / original) * 100) : 0

  return {
    pricePaise,
    priceFormatted: formatInr(pricePaise),
    hasDiscount,
    originalPricePaise: original,
    originalPriceFormatted: original ? formatInr(original) : null,
    discountPercent,
    savePaise: save,
    saveFormatted: formatInr(save),
  }
}
