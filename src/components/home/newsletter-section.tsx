import { Gift } from "lucide-react"
import { siteConfig } from "@/config/site"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { subscribeToNewsletter } from "@/lib/newsletter"
import { NewsletterForm } from "@/components/newsletter-form"

export function NewsletterSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <section aria-labelledby="newsletter" className="container scroll-mt-24 py-14 md:py-20" data-reveal>
      <div className="relative overflow-hidden rounded-3xl border bg-card p-6 sm:p-10 md:p-14">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div className="space-y-4">
            <h2 id="newsletter" className="scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
              {t.newsletter.heading}
            </h2>
            <p className="text-lg text-muted-foreground">{t.newsletter.description}</p>
          </div>
          <div className="space-y-5">
            <div className="flex items-center gap-4 rounded-2xl border border-primary/40 bg-primary/10 p-4">
              <Gift className="size-8 shrink-0 text-primary" aria-hidden />
              <p>
                <span className="block text-sm text-muted-foreground">{t.newsletter.leadIntro}</span>
                <span className="block text-lg font-bold">„{siteConfig.newsletter.leadMagnet[locale]}”</span>
              </p>
            </div>
            <NewsletterForm
              labels={{
                emailLabel: t.newsletter.emailLabel,
                placeholder: t.newsletter.placeholder,
                submit: t.newsletter.submit,
                submitting: t.newsletter.submitting,
                success: t.newsletter.success,
                invalid: t.newsletter.invalid,
                error: t.newsletter.error,
                notConfigured: t.newsletter.notConfigured,
                privacy: t.newsletter.privacy,
              }}
              onSubscribe={subscribeToNewsletter.bind(null, locale)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
