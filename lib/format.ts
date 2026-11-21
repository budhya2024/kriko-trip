export const toPaise = (rupees: number): number => {
  return Math.round(rupees * 100)
}

export const fromPaise = (paise: number | bigint): number => {
  return Number(paise) / 100
}

export const formatInr = (paise: number | bigint): string => {
  const rupees = fromPaise(paise)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rupees)
}

export const formatDate = (date: string | Date | number): string => {
  const value = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(value)
}

export const formatDuration = (days: number, nights: number): string => {
  if (days <= 0 && nights <= 0) {
    return 'Day tour'
  }
  if (days > 0 && nights > 0) {
    return `${days} Days / ${nights} Nights`
  }
  if (days > 0) {
    return `${days} ${days === 1 ? 'Day' : 'Days'}`
  }
  return `${nights} ${nights === 1 ? 'Night' : 'Nights'}`
}
