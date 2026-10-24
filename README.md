# pioter.ai

Osobista strona i blog Piotra Wesołowskiego, AI Product Engineera: „AI, które działa w polskiej firmie”.

Next.js 16 (App Router) · Tailwind CSS 4 · MDX (next-mdx-remote) · PL/EN.

```bash
npm install
npm run dev     # http://localhost:3000 (szkice draft: true są widoczne)
npm run build   # build produkcyjny (szkice ukryte)
npm run lint
```

## Gdzie co jest

| Co | Gdzie |
|---|---|
| Linki, rola, pasek dowodów, ID wideo, lead magnet, kolor akcentu | `src/config/site.ts` |
| Opisy stron tagów pod frazy SEO (np. „AI Product Engineering”) | `src/config/tags.ts` |
| Teksty interfejsu PL/EN | `src/i18n/dictionaries.ts` |
| Wpisy bloga | `content/posts/<slug>/<pl\|en>.mdx` |
| Case studies | `content/case-studies/<slug>/<pl\|en>.mdx` |
| Treść „O mnie” | `content/pages/about/<pl\|en>.mdx` |
| Pliki do pobrania (SKILL.md itd.) | `public/downloads/<slug>/` |
| Zapis do newslettera (podpięcie dostawcy) | `src/lib/newsletter.ts` |
| Tokeny kolorów i warianty akcentu | `src/app/globals.css` |

### Adresy URL

- Polski jest domyślny i nie ma prefiksu (`/blog/hello-world`), angielski działa pod `/en/...`.
- `/pl/...` przekierowuje (308) na adres bez prefiksu. „O mnie” ma adres `/o-mnie` po polsku i `/en/about` po angielsku.
- Jeśli wpis istnieje tylko w jednym języku, wersja w drugim języku pokazuje oryginał z informacją „dostępny tylko po…”. Taka strona ma `noindex` i canonical wskazujący na oryginał.
- `/feed.xml` (PL), `/en/feed.xml` (EN), `/sitemap.xml`, `/robots.txt`.

## Jak dodać nowy wpis

1. Utwórz folder `content/posts/<slug>/`. Slug to końcówka adresu, np. `skill-do-faktur` da adres `/blog/skill-do-faktur`.
2. Dodaj `pl.mdx`, `en.mdx` albo oba pliki:

   ```mdx
   ---
   title: 'Tytuł wpisu'
   date: '2026-11-01'
   excerpt: 'Jedno–dwa zdania zajawki (meta description, karta, RSS).'
   tags: ['Claude Skills', 'KSeF']
   # opcjonalne:
   updated: '2026-11-15'
   series: 'ai-product-engineering'   # slug tagu serii
   seriesOrder: 2
   draft: true                         # widoczny tylko w npm run dev
   ---

   Treść w Markdown/MDX. Nagłówki ## i ### trafiają do spisu treści.
   ```

3. Komponenty dostępne w MDX:

   ````mdx
   <Download file="/downloads/skill-do-faktur/SKILL.md" description="Skill do odczytu faktur" />

   <Callout type="tip">Wskazówka</Callout>   {/* type: info | tip | warning */}

   ```ts title="plik.ts" {2}
   // blok kodu z tytułem i podświetloną linią 2
   ```
   ````

   Plik do pobrania wrzuć do `public/downloads/<slug>/`. Jeśli pliku brakuje, build się nie uda, więc nie opublikujesz martwego linku.
4. Obrazki wrzucaj do `public/images/blog/` w formacie WebP lub AVIF. Szerokość i wysokość dopisują się automatycznie.
5. Obrazek OG, sitemapa, RSS, JSON-LD i czas czytania generują się same.

Treści wpisu nie zaczynaj od `# Tytuł`, bo strona sama renderuje tytuł jako H1.

## Jak dodać nowe case study

1. Utwórz `content/case-studies/<slug>/pl.mdx` (opcjonalnie także `en.mdx`):

   ```mdx
   ---
   title: 'Krótki tytuł'
   summary: 'Jedno zdanie: kto, co, po co.'
   problem: 'Problem w 1–2 zdaniach.'
   solution: 'Rozwiązanie w 1–2 zdaniach.'
   result: 'Mierzalny efekt (prawdziwe liczby).'
   tags: ['MCP', 'Dokumenty']
   order: 3          # kolejność na stronie głównej
   featured: false   # true = szeroka karta w siatce bento
   ---

   ## Kontekst
   ...
   ```

2. Karta pojawi się na stronie głównej (`/#case-studies`), a szczegóły pod `/case-studies/<slug>`.

## Kolor akcentu

W `src/config/site.ts` ustaw `accent` na `"volt"` (limonka), `"ember"` (pomarańcz) albo `"signal"` (cyjan). Odcienie dla obu motywów są w `src/app/globals.css` (sekcja „Warianty akcentu”). Jeśli zmienisz odcień, zaktualizuj też `accentHex` w `src/lib/og.tsx`, bo obrazki OG nie obsługują `oklch`.

## Newsletter

`<NewsletterForm onSubscribe={...}>` jest niezależny od dostawcy. Logikę zapisu podpinasz w `subscribeToNewsletter` w `src/lib/newsletter.ts`; w komentarzu są przykłady dla Buttondown i Kit. Klucz API trzymaj w zmiennej środowiskowej (np. na Vercelu). Do czasu podpięcia formularz pokazuje komunikat „Newsletter rusza wkrótce”.

## Font

`src/assets/fonts/Inter-latin-pl.woff2` to Inter (oś wght 400–800) przycięty do łaciny i polskich znaków, ok. 28 KB. Licencja: `src/assets/fonts/OFL.txt`. Pliki `Inter-*.ttf` obok służą tylko do generowania obrazków OG. Odtworzenie subsetu (fonttools):

```bash
pip install fonttools brotli
fonttools varLib.instancer "Inter[opsz,wght].ttf" opsz=14 wght=400:800 -o inst.ttf
pyftsubset inst.ttf --flavor=woff2 --output-file=Inter-latin-pl.woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0104-0107,U+0118-0119,U+0141-0144,U+015A-015B,U+0179-017C,U+2013-2014,U+2018-201E,U+2022,U+2026,U+2032-2033,U+2190-2193,U+2122,U+20AC" \
  --layout-features="kern,liga,calt,ccmp,locl,mark,mkmk,cv11,ss01,tnum"
```

## TODO do uzupełnienia

**Config (`src/config/site.ts`)**
- [ ] `accent`: wybierz wariant koloru.
- [ ] `identity.tagline.en`: zatwierdź tłumaczenie „an AI engineer who understands business”.
- [ ] `links.linkedin`: potwierdź URL (w starej wersji strony były dwa różne).
- [ ] `links.x`: URL profilu na X (pusty jest pomijany w stopce i JSON-LD).
- [ ] `proofBar`: konkretne dowody zamiast placeholderów.
- [ ] `youtube.latestVideoId` i `latestVideoTitle`.
- [ ] `newsletter.leadMagnet.en`: zatwierdź tłumaczenie.

**Treści**
- [ ] Oba case studies (`content/case-studies/*`): summary, problem, rozwiązanie i **prawdziwy** efekt.
- [ ] „O mnie” (`content/pages/about/*`): firma, typowi klienci, doświadczenie.
- [ ] Szkic `content/posts/ai-product-engineer/*`: napisz wpis, usuń `draft: true` i podmień przykładowy `public/downloads/ai-product-engineer/SKILL.md`.
- [ ] `src/config/tags.ts`: dopisz zdanie o tym, czego uczy seria AI Product Engineering.
- [ ] Hasło EN w `src/i18n/dictionaries.ts` (`home.headline`): obecnie „AI that works in a real company”.

**Integracje i zasoby**
- [ ] Newsletter: wybierz dostawcę i podepnij w `src/lib/newsletter.ts`. Przygotuj PDF lub pliki lead magnetu „5 skilli dla polskiej firmy”.
- [ ] Zdjęcie profilowe w wyższej rozdzielczości (obecne ma 200×200 px). Podmień `public/images/profile-new.png`, najlepiej na 800×800.
- [ ] Na piotrwesolowski.com dodaj link do pioter.ai oraz JSON-LD `Person` z tym samym `sameAs`.
