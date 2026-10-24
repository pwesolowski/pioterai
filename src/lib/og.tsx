import fs from "fs/promises"
import path from "path"
import { ImageResponse } from "next/og"
import { siteConfig, type Accent } from "@/config/site"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

// odpowiedniki akcentów z globals.css (Satori nie obsługuje oklch)
const accentHex: Record<Accent, string> = { volt: "#c8f04c", ember: "#ff9a52", signal: "#6fd6f2" }

/** Wspólny szablon obrazka OG: etykieta, tytuł, podpis z rolą */
export async function renderOgImage({ title, eyebrow }: { title: string; eyebrow?: string }) {
  // stałe ścieżki — dynamiczne powodowałyby dołączenie całego projektu do bundla serwera
  const [medium, extraBold, photo] = await Promise.all([
    fs.readFile(path.join(process.cwd(), "src/assets/fonts/Inter-Medium.ttf")),
    fs.readFile(path.join(process.cwd(), "src/assets/fonts/Inter-ExtraBold.ttf")),
    fs.readFile(path.join(process.cwd(), "public/images/profile-new.png")), // = siteConfig.identity.photo
  ])
  const accent = accentHex[siteConfig.accent]
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`
  const fontSize = title.length > 70 ? 56 : title.length > 40 ? 68 : 80

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#101216",
          backgroundImage: `radial-gradient(circle at 85% 0%, ${accent}33, transparent 55%)`,
          color: "#f3f4f6",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
          <div style={{ display: "flex" }}>
            pioter<span style={{ color: accent }}>.ai</span>
          </div>
          {eyebrow && (
            <div style={{ display: "flex", fontSize: 26, fontWeight: 500, color: accent, textTransform: "uppercase", letterSpacing: 2 }}>
              {eyebrow}
            </div>
          )}
        </div>

        <div style={{ display: "flex", fontSize, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc} width={88} height={88} style={{ borderRadius: 44, border: `3px solid ${accent}` }} alt="" />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 28 }}>
            <span style={{ fontWeight: 800 }}>{siteConfig.author}</span>
            <span style={{ color: "#a1a7b3", fontWeight: 500 }}>{siteConfig.identity.role}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: medium, weight: 500, style: "normal" },
        { name: "Inter", data: extraBold, weight: 800, style: "normal" },
      ],
    }
  )
}
