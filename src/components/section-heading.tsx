import Link from "next/link"
import { ArrowRight } from "lucide-react"

type Props = {
  id?: string
  title: string
  intro?: string
  link?: { href: string; label: string }
}

export function SectionHeading({ id, title, intro, link }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl space-y-3">
        <h2 id={id} className="text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
        {intro && <p className="text-lg text-muted-foreground">{intro}</p>}
      </div>
      {link && (
        <Link href={link.href} className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-primary hover:underline">
          {link.label} <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  )
}
