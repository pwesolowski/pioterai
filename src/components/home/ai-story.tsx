import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { localizePath, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"
import { AgentSteps } from "@/components/visuals/agent-steps"
import { SkillFile } from "@/components/visuals/skill-file"
import { McpHub } from "@/components/visuals/mcp-hub"
import { TokenStream } from "@/components/visuals/token-stream"
import { DemoReplay } from "./demo-replay"

/** „Opowieść o AI”: cztery klocki wdrożeń, każdy z jednym zdaniem i animowaną ilustracją */
export function AiStory({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const s = t.home.story

  const visuals: Record<string, React.ReactNode> = {
    llm: <TokenStream />,
    agents: <AgentSteps />,
    skills: <SkillFile />,
    mcp: <McpHub />,
  }

  return (
    <section aria-labelledby="ai-story" className="container py-20 md:py-32">
      <SectionHeading id="ai-story" title={s.heading} intro={s.intro} />

      <div className="space-y-6 md:space-y-8">
        {s.items.map((item, i) => (
            <article
              key={item.key}
              data-reveal
              className="grid items-center gap-8 rounded-[2rem] bg-card p-6 sm:p-10 md:grid-cols-2 md:gap-12 md:p-14"
            >
              <div className={cn("text-center md:text-left", i % 2 === 1 && "md:order-2")}>
                <span className="font-mono text-sm text-primary">0{i + 1}</span>
                <h3 className="mt-2 text-4xl font-semibold leading-[1.05] md:text-5xl">{item.title}</h3>
                <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground md:mx-0 md:text-xl">{item.text}</p>
              </div>
              <div className="flex min-w-0 justify-center">
                <DemoReplay interval={6000}>
                  <div className="flex w-full justify-center">{visuals[item.key]}</div>
                </DemoReplay>
              </div>
            </article>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-10">
        <Link href={localizePath(locale, "/case-studies")} className="inline-flex min-h-11 items-center gap-0.5 text-lg text-primary hover:underline">
          {s.ctaCaseStudies} <ChevronRight className="size-5" aria-hidden />
        </Link>
        <Link href={localizePath(locale, "/blog")} className="inline-flex min-h-11 items-center gap-0.5 text-lg text-primary hover:underline">
          {s.ctaBlog} <ChevronRight className="size-5" aria-hidden />
        </Link>
      </div>
    </section>
  )
}
