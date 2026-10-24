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
    { label: labels.blog, href: localizePath(locale, "/blog"), active: internalPath.startsWith("/blog") },
    { label: labels.caseStudies, href: `${localizePath(locale, "/")}#case-studies`, active: internalPath.startsWith("/case-studies") },
    { label: labels.about, href: localizePath(locale, "/about"), active: internalPath === "/about" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href={localizePath(locale, "/")} className="text-lg font-bold tracking-tight" onClick={() => setOpen(false)}>
          pioter<span className="text-primary">.ai</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                item.active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href={localizePath(otherLocale, internalPath)}
            hrefLang={otherLocale}
            className="inline-flex h-11 items-center rounded-lg px-3 font-mono text-sm font-semibold uppercase text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={labels.switchLanguage}
            title={labels.switchLanguage}
          >
            {otherLocale}
          </Link>
          <ThemeToggle label={labels.toggleTheme} />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? labels.closeMenu : labels.openMenu}
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-border/60 bg-background md:hidden">
          <ul className="container flex flex-col py-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={item.active ? "page" : undefined}
                  className={cn(
                    "block py-3 text-lg font-medium",
                    item.active ? "text-primary" : "text-foreground"
                  )}
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
