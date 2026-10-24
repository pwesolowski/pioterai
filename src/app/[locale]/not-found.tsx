import Link from "next/link"

// not-found nie dostaje parametrów, więc komunikat jest dwujęzyczny
export default function NotFound() {
  return (
    <div className="container flex flex-col items-start gap-6 py-24 md:py-32">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Nie znaleziono strony</h1>
      <p className="text-lg text-muted-foreground">
        Ta strona nie istnieje albo została przeniesiona.
        <br />
        <span lang="en">This page doesn&apos;t exist or has been moved.</span>
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="inline-flex h-12 items-center rounded-lg bg-primary px-6 font-semibold text-primary-foreground">
          Strona główna
        </Link>
        <Link href="/en" lang="en" className="inline-flex h-12 items-center rounded-lg border px-6 font-semibold">
          Homepage (EN)
        </Link>
      </div>
    </div>
  )
}
