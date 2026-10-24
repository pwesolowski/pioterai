import fs from "fs"
import path from "path"
import { imageSize } from "image-size"

/** Obrazek z markdownu: lokalnym plikom dopisuje width/height (brak przesunięć layoutu) */
export function MdxImage({ src, alt = "", ...props }: React.ComponentProps<"img">) {
  let size: { width?: number; height?: number } = {}
  if (typeof src === "string" && src.startsWith("/")) {
    const file = path.join(process.cwd(), "public", src)
    if (fs.existsSync(file)) size = imageSize(fs.readFileSync(file))
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={size.width} height={size.height} loading="lazy" decoding="async" {...props} />
}
