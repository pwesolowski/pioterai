"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import type { SubscribeResult } from "@/lib/newsletter"

type Labels = {
  emailLabel: string
  placeholder: string
  submit: string
  submitting: string
  success: string
  invalid: string
  error: string
  notConfigured: string
  privacy: string
}

type Props = {
  labels: Labels
  /** Handler zapisu — np. Server Action z src/lib/newsletter.ts */
  onSubscribe: (email: string) => Promise<SubscribeResult>
}

export function NewsletterForm({ labels, onSubscribe }: Props) {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get("email") ?? "")
    setStatus("pending")
    try {
      const result = await onSubscribe(email)
      if (result.ok) {
        setStatus("success")
        setMessage(labels.success)
      } else {
        setStatus("error")
        setMessage(
          result.error === "invalid" ? labels.invalid : result.error === "not-configured" ? labels.notConfigured : labels.error
        )
      }
    } catch {
      setStatus("error")
      setMessage(labels.error)
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="flex items-center justify-center gap-2 rounded-full bg-primary/10 p-4 font-medium">
        <Check className="size-5 text-primary" aria-hidden /> {message}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          {labels.emailLabel}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder={labels.placeholder}
          aria-describedby="newsletter-message"
          className="h-12 min-w-0 flex-1 rounded-full border border-border bg-background px-5 text-base placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "pending"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-transform hover:scale-[1.03] disabled:opacity-60"
        >
          {status === "pending" ? labels.submitting : labels.submit}
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
      <p id="newsletter-message" aria-live="polite" className="text-center text-sm text-muted-foreground">
        {status === "error" ? <span className="text-foreground">{message}</span> : labels.privacy}
      </p>
    </form>
  )
}
