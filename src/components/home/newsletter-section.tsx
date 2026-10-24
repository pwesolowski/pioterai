import { siteConfig } from "@/config/site"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { subscribeToNewsletter } from "@/lib/newsletter"
import { NewsletterForm } from "@/components/newsletter-form"

export function NewsletterSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <section aria-labelledby="newsletter" className="container scroll-mt-20 py-20 md:py-32" data-reveal>
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-card px-6 py-16 text-center md:py-24">
        <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <p className="text-sm font-medium text-primary">{t.newsletter.leadIntro}</p>
          <h2 id="newsletter" className="mt-3 scroll-mt-20 text-4xl font-semibold leading-[1.05] md:text-6xl">
            {siteConfig.newsletter.leadMagnet[locale]}.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">{t.newsletter.description}</p>
          <div className="mx-auto mt-8 max-w-md text-left">
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
