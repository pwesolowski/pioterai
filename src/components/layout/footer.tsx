import Link from "next/link"
import { Github, Linkedin, Rss, Youtube } from "lucide-react"
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

  const contact = [
    { label: links.email, href: `mailto:${links.email}` },
    { label: t.footer.book, href: links.calendly },
    { label: t.footer.services, href: links.personalSite },
  ]

  return (
    <footer className="mt-16 border-t border-border/60 text-sm">
      <div className="container flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <p className="font-semibold">
            pioter<span className="text-primary">.ai</span>
          </p>
          <p className="text-muted-foreground">
            {siteConfig.author} · {siteConfig.identity.role}
          </p>
        </div>

        <ul className="flex flex-col gap-1 md:flex-row md:gap-6">
          {contact.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener" : undefined}
                className="inline-flex min-h-11 items-center text-muted-foreground transition-colors hover:text-foreground md:min-h-0"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className="-ml-3 flex md:-mr-3 md:ml-0">
          {social.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener me" : undefined}
                className="inline-flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                aria-label={label}
                title={label}
              >
                <Icon className="size-[1.1rem]" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="container pb-10 text-muted-foreground">© {new Date().getFullYear()} {siteConfig.author}</div>
    </footer>
  )
}
