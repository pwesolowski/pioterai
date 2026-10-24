/**
 * Jedno miejsce na dane, które zmieniasz ręcznie: tożsamość, linki,
 * pasek dowodów, wideo, newsletter. Wszystko oznaczone TODO czeka
 * na uzupełnienie.
 */

export type Accent = "volt" | "ember" | "signal"

export const siteConfig = {
  url: "https://pioter.ai",
  name: "pioter.ai",
  author: "Piotr Wesołowski",

  /** Wariant koloru akcentu: "volt" (limonka) | "ember" (pomarańcz) | "signal" (cyjan) */
  accent: "volt" as Accent, // TODO: wybierz wariant

  identity: {
    /** Rola — używana dosłownie w <title>, H1, meta, OG i JSON-LD */
    role: "AI Product Engineer",
    tagline: {
      pl: "AI Product Engineer — inżynier AI, który rozumie biznes",
      en: "AI Product Engineer — an AI engineer who understands business", // TODO: zatwierdź tłumaczenie
    },
    knowsAbout: [
      "AI agents",
      "Claude",
      "MCP",
      "LLM",
      "product engineering",
      "business automation",
    ],
    photo: "/images/profile-new.png",
  },

  links: {
    github: "https://github.com/pwesolowski",
    linkedin: "https://www.linkedin.com/in/piotr-wesolowski/", // TODO: potwierdź URL (w starej nawigacji był też /in/piotrwesolowski)
    youtube: "https://www.youtube.com/@piotr-wesolowski",
    x: "", // TODO: URL profilu na X (pusty = pomijany w stopce i JSON-LD)
    email: "contact@piotrwesolowski.com",
    calendly: "https://calendly.com/piowes30/30min/",
    personalSite: "https://piotrwesolowski.com",
  },

  /** Pasek dowodów pod hero — krótkie konkrety */
  proofBar: {
    pl: ["Systemy w produkcji", "Claude Skills", "MCP", "KSeF"], // TODO: uzupełnij konkretami
    en: ["Systems in production", "Claude Skills", "MCP", "KSeF"], // TODO
  },

  youtube: {
    /** ID najnowszego filmu (część po ?v= w URL-u). Pusty = karta z linkiem do kanału. */
    latestVideoId: "", // TODO: wstaw ID filmu
    latestVideoTitle: {
      pl: "TODO: tytuł najnowszego filmu",
      en: "TODO: latest video title",
    },
  },

  newsletter: {
    leadMagnet: {
      pl: "5 skilli dla polskiej firmy",
      en: "5 skills for a Polish company", // TODO: zatwierdź tłumaczenie
    },
  },
} as const

/** Profile do JSON-LD sameAs i stopki — puste wartości są pomijane */
export const sameAs = [
  siteConfig.links.linkedin,
  siteConfig.links.github,
  siteConfig.links.youtube,
  siteConfig.links.x,
  siteConfig.url,
  siteConfig.links.personalSite,
].filter(Boolean)
