import Link from "next/link"
import { Calendar, ExternalLink, Github, Linkedin, Mail, Rss, Youtube } from "lucide-react"
import { siteConfig } from "@/config/site"
import { localizePath, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L2.8 2h6.4l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
    </svg>
  )
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const { links } = siteConfig

  const social = [
    { label: "GitHub", href: links.github, icon: Github },
    { label: "LinkedIn", href: links.linkedin, icon: Linkedin },
    { label: "YouTube", href: links.youtube, icon: Youtube },
    { label: "X", href: links.x, icon: XIcon },
    { label: "RSS", href: localizePath(locale, "/feed.xml"), icon: Rss },
  ].filter((item) => item.href)

  return (
    <footer className="mt-24 border-t">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-lg font-bold">
            pioter<span className="text-primary">.ai</span>
          </p>
          <p className="max-w-xs text-muted-foreground">{t.footer.tagline}</p>
          <p className="text-sm text-muted-foreground">
            {siteConfig.author} · {siteConfig.identity.role}
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t.footer.contact}
          </h2>
          <ul className="space-y-1">
            <li>
              <a href={`mailto:${links.email}`} className="inline-flex min-h-11 items-center gap-2 hover:text-primary">
                <Mail className="size-4" aria-hidden /> {links.email}
              </a>
            </li>
            <li>
              <a href={links.calendly} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 hover:text-primary">
                <Calendar className="size-4" aria-hidden /> {t.footer.book}
              </a>
            </li>
            <li>
              <a href={links.personalSite} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 hover:text-primary">
                <ExternalLink className="size-4" aria-hidden /> {t.footer.services}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t.footer.elsewhere}
          </h2>
          <ul className="flex flex-wrap gap-1">
            {social.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener me" : undefined}
                  className="inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={label}
                  title={label}
                >
                  <Icon className="size-5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container border-t py-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.author}
      </div>
    </footer>
  )
}
