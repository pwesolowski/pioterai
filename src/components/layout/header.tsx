"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { localizePath, splitLocale, toInternalPath, type Locale } from "@/i18n/config"
import { ThemeToggle } from "./theme-toggle"

type HeaderLabels = {
  blog: string
  caseStudies: string
  about: string
  openMenu: string
  closeMenu: string
  switchLanguage: string
  toggleTheme: string
}

export function Header({ locale, labels }: { locale: Locale; labels: HeaderLabels }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // usePathname może zwrócić adres po rewrite (/pl/...) lub publiczny — oba sprowadzamy do ścieżki wewnętrznej
  const internalPath = toInternalPath(locale, splitLocale(pathname).path)
  const otherLocale: Locale = locale === "pl" ? "en" : "pl"

  const items = [
    { label: labels.caseStudies, href: localizePath(locale, "/case-studies"), active: internalPath.startsWith("/case-studies") },
    { label: labels.blog, href: localizePath(locale, "/blog"), active: internalPath.startsWith("/blog") },
    { label: labels.about, href: localizePath(locale, "/about"), active: internalPath === "/about" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex h-14 items-center justify-between gap-4">
        <Link href={localizePath(locale, "/")} className="font-semibold tracking-tight" onClick={() => setOpen(false)}>
          pioter<span className="text-primary">.ai</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "text-[0.8125rem] transition-colors hover:text-foreground",
                item.active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="-mr-2 flex items-center">
          <Link
            href={localizePath(otherLocale, internalPath)}
            hrefLang={otherLocale}
            className="inline-flex size-11 items-center justify-center text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-foreground"
            aria-label={labels.switchLanguage}
            title={labels.switchLanguage}
          >
            {otherLocale}
          </Link>
          <ThemeToggle label={labels.toggleTheme} />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-muted-foreground hover:text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? labels.closeMenu : labels.openMenu}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="h-[calc(100dvh-3.5rem)] bg-background md:hidden">
          <ul className="container flex flex-col gap-1 pt-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={item.active ? "page" : undefined}
                  className="block py-3 text-3xl font-semibold tracking-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
