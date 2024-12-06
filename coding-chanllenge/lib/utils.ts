import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatValue = (value: number, isPercentage: boolean) => {
  if (isPercentage) {
    return `${value.toFixed(1)}%`
  }
  const roundedValue = Math.round(value)
  return `$${roundedValue.toLocaleString()}`
}