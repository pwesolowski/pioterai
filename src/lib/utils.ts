import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/** "2025-11-20" → „20 listopada 2025” / "November 20, 2025" */
export function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(date))
}
