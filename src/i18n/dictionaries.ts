import type { Locale } from "./config"

const pl = {
  languageName: "Polski",
  /** „dostępny tylko …” */
  inLanguage: { pl: "po polsku", en: "po angielsku" } as Record<Locale, string>,
  skipToContent: "Przejdź do treści",

  nav: {
    home: "Start",
    blog: "Blog",
    caseStudies: "Case studies",
    about: "O mnie",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    switchLanguage: "Switch to English",
    toggleTheme: "Przełącz motyw jasny/ciemny",
  },

  home: {
    metaDescription:
      "AI Product Engineer — inżynier AI, który rozumie biznes. Wdrażam AI w polskich firmach: agenci, Claude Skills, MCP i automatyzacje na prawdziwych dokumentach — WZ, faktury, KSeF.",
    headline: "AI, które działa w polskiej firmie",
    subtitle:
      "Pomagam właścicielom firm i zespołom wdrożyć AI praktycznie — agentów, Claude Skills i MCP pracujących na prawdziwych dokumentach: WZ, fakturach, KSeF i zleceniach.",
    ctaCaseStudies: "Zobacz case studies",
    ctaNewsletter: "Zapisz się na newsletter",
    proofLabel: "W praktyce",
  },

  caseStudies: {
    heading: "Case studies",
    intro: "Konkretne problemy, konkretne wdrożenia. Problem → rozwiązanie → efekt.",
    problem: "Problem",
    solution: "Rozwiązanie",
    result: "Efekt",
    readMore: "Szczegóły",
    back: "Wszystkie case studies",
  },

  video: {
    heading: "Najnowsze wideo",
    intro: "Pokazuję wdrożenia od środka — kod, prompty i prawdziwe dokumenty.",
    play: "Odtwórz wideo",
    channel: "Zobacz kanał na YouTube",
    noVideo: "Nowe odcinki na kanale YouTube.",
  },

  latestPosts: {
    heading: "Najnowsze wpisy",
    all: "Wszystkie wpisy",
  },

  newsletter: {
    heading: "Newsletter",
    leadIntro: "Zapisz się i odbierz za darmo:",
    description:
      "Raz na jakiś czas: jedno wdrożenie, jeden skill, zero lania wody. Plus gotowe pliki SKILL.md do pobrania.",
    emailLabel: "Adres e-mail",
    placeholder: "twoj@email.pl",
    submit: "Zapisz mnie",
    submitting: "Zapisuję…",
    success: "Dzięki! Sprawdź skrzynkę i potwierdź zapis.",
    invalid: "Podaj poprawny adres e-mail.",
    error: "Coś poszło nie tak. Spróbuj ponownie za chwilę.",
    notConfigured: "Newsletter rusza wkrótce. Do tego czasu napisz do mnie na e-mail.",
    privacy: "Bez spamu. Wypiszesz się jednym kliknięciem.",
  },

  blog: {
    title: "Blog",
    description:
      "Wpisy o wdrażaniu AI w firmach: agenci, Claude Skills, MCP, automatyzacje dokumentów i AI product engineering.",
    intro: "Wdrożenia AI od kuchni — co działa w polskiej firmie, a co nie.",
    allTags: "Tagi",
    readingTime: (minutes: number) => `${minutes} min czytania`,
    toc: "Spis treści",
    published: "Opublikowano",
    updated: "Zaktualizowano",
    backToBlog: "Wszystkie wpisy",
    onlyIn: (language: string) => `Ten wpis jest dostępny tylko ${language}.`,
    fallbackHint: "Poniżej oryginalna wersja.",
    languageBadge: "EN",
    series: "Seria",
    seriesPart: (index: number, total: number) => `Część ${index} z ${total}`,
    tagHeading: (tag: string) => `Wpisy: ${tag}`,
    tagDescription: (tag: string) => `Wszystkie wpisy z tagiem „${tag}”.`,
    noPosts: "Brak wpisów.",
    rss: "RSS",
    draft: "Szkic",
  },

  code: {
    copy: "Kopiuj kod",
    copied: "Skopiowano",
  },

  download: {
    label: "Pobierz",
  },

  about: {
    metaTitle: "O mnie — czym jest AI Product Engineer",
    metaDescription:
      "Kim jest AI Product Engineer i jak pracuję end-to-end: od problemu biznesowego, przez wdrożenie AI, do mierzalnego efektu.",
    eyebrow: "O mnie",
    heading: "AI Product Engineer — inżynier AI, który rozumie biznes",
    lead: "Łączę inżynierię oprogramowania, AI i myślenie produktowe. Nie kończę na prototypie — doprowadzam AI do produkcji i mierzę, co zmieniło w firmie.",
    processHeading: "Jak pracuję: end-to-end",
    process: [
      {
        title: "Problem biznesowy",
        text: "Zaczynam od procesu i liczb, nie od modelu. Gdzie ucieka czas, gdzie powstają błędy, ile to kosztuje.",
      },
      {
        title: "Rozwiązanie",
        text: "Dobieram najprostsze narzędzie, które zadziała: agent, Claude Skill, integracja MCP albo zwykła automatyzacja.",
      },
      {
        title: "Wdrożenie",
        text: "Buduję na prawdziwych dokumentach i systemach firmy — z testami, monitoringiem i przeszkoleniem zespołu.",
      },
      {
        title: "Mierzalny efekt",
        text: "Porównuję wynik z punktem wyjścia: czas, koszt, liczba błędów. Jeśli nie ma efektu — poprawiamy albo wyłączamy.",
      },
    ],
    ctaHeading: "Masz proces, który zjada czas zespołu?",
    ctaText: "Porozmawiajmy 30 minut. Powiem szczerze, czy AI ma tam sens.",
    ctaButton: "Umów rozmowę",
    seeCaseStudies: "Zobacz case studies",
    seeSeries: "Seria AI Product Engineering",
    personalSite: "Usługi i współpraca: piotrwesolowski.com",
  },

  footer: {
    tagline: "AI, które działa w polskiej firmie.",
    contact: "Kontakt",
    elsewhere: "Gdzie indziej",
    services: "Usługi i współpraca",
    book: "Umów rozmowę (Calendly)",
  },

  notFound: {
    title: "Nie znaleziono strony",
    text: "Ta strona nie istnieje albo została przeniesiona.",
    back: "Wróć na stronę główną",
  },
}

export type Dictionary = typeof pl

const en: Dictionary = {
  languageName: "English",
  inLanguage: { pl: "in Polish", en: "in English" },
  skipToContent: "Skip to content",

  nav: {
    home: "Home",
    blog: "Blog",
    caseStudies: "Case studies",
    about: "About",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Przełącz na polski",
    toggleTheme: "Toggle light/dark theme",
  },

  home: {
    metaDescription:
      "AI Product Engineer — an AI engineer who understands business. I deploy AI in Polish companies: agents, Claude Skills, MCP and automations on real documents — delivery notes, invoices, KSeF.",
    headline: "AI that works in a real company",
    subtitle:
      "I help business owners and teams adopt AI in practice — agents, Claude Skills and MCP working on real documents: delivery notes, invoices, KSeF e-invoices and orders.",
    ctaCaseStudies: "See case studies",
    ctaNewsletter: "Join the newsletter",
    proofLabel: "In practice",
  },

  caseStudies: {
    heading: "Case studies",
    intro: "Real problems, real deployments. Problem → solution → result.",
    problem: "Problem",
    solution: "Solution",
    result: "Result",
    readMore: "Details",
    back: "All case studies",
  },

  video: {
    heading: "Latest video",
    intro: "Deployments from the inside — code, prompts and real documents.",
    play: "Play video",
    channel: "Visit the YouTube channel",
    noVideo: "New episodes on the YouTube channel.",
  },

  latestPosts: {
    heading: "Latest posts",
    all: "All posts",
  },

  newsletter: {
    heading: "Newsletter",
    leadIntro: "Subscribe and get it for free:",
    description:
      "Every now and then: one deployment, one skill, no fluff. Plus ready-to-use SKILL.md files.",
    emailLabel: "Email address",
    placeholder: "you@company.com",
    submit: "Subscribe",
    submitting: "Subscribing…",
    success: "Thanks! Check your inbox to confirm.",
    invalid: "Please enter a valid email address.",
    error: "Something went wrong. Please try again in a moment.",
    notConfigured: "The newsletter is launching soon. Until then, drop me an email.",
    privacy: "No spam. Unsubscribe with one click.",
  },

  blog: {
    title: "Blog",
    description:
      "Posts about deploying AI in companies: agents, Claude Skills, MCP, document automation and AI product engineering.",
    intro: "AI deployments behind the scenes — what works in a real company and what doesn't.",
    allTags: "Tags",
    readingTime: (minutes: number) => `${minutes} min read`,
    toc: "On this page",
    published: "Published",
    updated: "Updated",
    backToBlog: "All posts",
    onlyIn: (language: string) => `This post is only available ${language}.`,
    fallbackHint: "The original version is below.",
    languageBadge: "PL",
    series: "Series",
    seriesPart: (index: number, total: number) => `Part ${index} of ${total}`,
    tagHeading: (tag: string) => `Posts: ${tag}`,
    tagDescription: (tag: string) => `All posts tagged “${tag}”.`,
    noPosts: "No posts yet.",
    rss: "RSS",
    draft: "Draft",
  },

  code: {
    copy: "Copy code",
    copied: "Copied",
  },

  download: {
    label: "Download",
  },

  about: {
    metaTitle: "About — what is an AI Product Engineer",
    metaDescription:
      "What an AI Product Engineer does and how I work end-to-end: from a business problem, through AI deployment, to a measurable result.",
    eyebrow: "About",
    heading: "AI Product Engineer — an AI engineer who understands business",
    lead: "I combine software engineering, AI and product thinking. I don't stop at a prototype — I take AI to production and measure what it changed for the business.",
    processHeading: "How I work: end-to-end",
    process: [
      {
        title: "Business problem",
        text: "I start with the process and the numbers, not the model. Where time leaks, where errors happen, what it costs.",
      },
      {
        title: "Solution",
        text: "I pick the simplest tool that will work: an agent, a Claude Skill, an MCP integration or plain automation.",
      },
      {
        title: "Deployment",
        text: "I build on the company's real documents and systems — with tests, monitoring and team training.",
      },
      {
        title: "Measurable result",
        text: "I compare the outcome with the baseline: time, cost, error rate. No effect — we fix it or switch it off.",
      },
    ],
    ctaHeading: "Got a process that eats your team's time?",
    ctaText: "Let's talk for 30 minutes. I'll tell you honestly whether AI makes sense there.",
    ctaButton: "Book a call",
    seeCaseStudies: "See case studies",
    seeSeries: "AI Product Engineering series",
    personalSite: "Services and collaboration: piotrwesolowski.com",
  },

  footer: {
    tagline: "AI that works in a real company.",
    contact: "Contact",
    elsewhere: "Elsewhere",
    services: "Services & collaboration",
    book: "Book a call (Calendly)",
  },

  notFound: {
    title: "Page not found",
    text: "This page doesn't exist or has been moved.",
    back: "Back to the homepage",
  },
}

const dictionaries: Record<Locale, Dictionary> = { pl, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
