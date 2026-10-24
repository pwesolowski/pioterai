"use server"

import type { Locale } from "@/i18n/config"

export type SubscribeResult = { ok: true } | { ok: false; error: "invalid" | "not-configured" | "failed" }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Server Action zapisu do newslettera — tu podpinasz dostawcę.
 * Komponent <NewsletterForm> dostaje tę funkcję przez prop `onSubscribe`
 * (z językiem podpiętym przez .bind(null, locale)),
 * więc zmiana dostawcy to zmiana tylko tego pliku.
 *
 * TODO: wybierz dostawcę i ustaw klucz w zmiennej środowiskowej, np.:
 *
 *   // Buttondown
 *   await fetch("https://api.buttondown.com/v1/subscribers", {
 *     method: "POST",
 *     headers: { Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`, "Content-Type": "application/json" },
 *     body: JSON.stringify({ email_address: email, tags: [locale] }),
 *   })
 *
 *   // Kit (ConvertKit)
 *   await fetch(`https://api.convertkit.com/v3/forms/${process.env.KIT_FORM_ID}/subscribe`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ api_key: process.env.KIT_API_KEY, email, tags: [locale] }),
 *   })
 */
export async function subscribeToNewsletter(locale: Locale, email: string): Promise<SubscribeResult> {
  if (typeof email !== "string" || !EMAIL.test(email.trim())) {
    return { ok: false, error: "invalid" }
  }
  void locale
  return { ok: false, error: "not-configured" }
}
