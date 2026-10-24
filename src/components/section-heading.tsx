import Link from "next/link"
import { ChevronRight } from "lucide-react"

type Props = {
  id?: string
  title: string
  intro?: string
  link?: { href: string; label: string }
}

/** Wyśrodkowany, duży nagłówek sekcji — jedna myśl, minimum tekstu */
export function SectionHeading({ id, title, intro, link }: Props) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      <h2 id={id} className="text-4xl font-semibold leading-[1.05] md:text-6xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg text-muted-foreground md:text-xl">{intro}</p>}
      {link && (
        <Link href={link.href} className="mt-4 inline-flex min-h-11 items-center gap-0.5 text-lg text-primary hover:underline">
          {link.label} <ChevronRight className="size-5" aria-hidden />
        </Link>
      )}
    </div>
  )
}
