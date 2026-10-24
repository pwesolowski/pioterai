import type { Locale } from "@/i18n/config"

/**
 * Opisy stron tagów, które mają rankować na konkretną frazę.
 * Klucz = slug tagu (np. "AI Product Engineering" → "ai-product-engineering").
 */
export const tagIntros: Record<
  string,
  Record<Locale, { title: string; description: string; body: string[] }>
> = {
  "ai-product-engineering": {
    pl: {
      title: "AI Product Engineering",
      description:
        "Seria o AI product engineeringu: jak budować produkty i wdrożenia AI, które rozwiązują realny problem biznesowy i dają mierzalny efekt.",
      body: [
        "AI Product Engineering to budowanie rozwiązań AI od problemu biznesowego do mierzalnego efektu — nie tylko modelu czy prototypu, ale działającego produktu w firmie.",
        // TODO: dopisz 1–2 zdania o tym, czego czytelnik nauczy się z serii
        "W tej serii pokazuję, jak to robię w praktyce: dobór problemu, architektura agentów i integracji, wdrożenie i pomiar.",
      ],
    },
    en: {
      title: "AI Product Engineering",
      description:
        "A series on AI product engineering: how to build AI products and deployments that solve a real business problem and deliver measurable results.",
      body: [
        "AI Product Engineering means building AI solutions from a business problem to a measurable result — not just a model or a prototype, but a working product inside a company.",
        // TODO: add 1–2 sentences on what readers will learn from the series
        "In this series I show how I do it in practice: picking the problem, designing agents and integrations, deploying and measuring.",
      ],
    },
  },
}
