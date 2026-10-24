import { notFound } from "next/navigation"

/** Łapie nieznane ścieżki, żeby 404 renderowało się w layoucie strony */
export default function CatchAll() {
  notFound()
}
