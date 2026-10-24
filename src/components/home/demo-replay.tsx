"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Odtwarza animację CSS dzieci w pętli: co `interval` ms montuje je od nowa,
 * ale tylko gdy są widoczne i użytkownik nie ogranicza ruchu.
 */
export function DemoReplay({ children, interval = 7000 }: { children: React.ReactNode; interval?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let visible = true
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    if (ref.current) observer.observe(ref.current)
    const timer = setInterval(() => {
      if (visible && document.visibilityState === "visible") setRun((n) => n + 1)
    }, interval)
    return () => {
      clearInterval(timer)
      observer.disconnect()
    }
  }, [interval])

  return (
    <div ref={ref} className="w-full">
      <div key={run}>{children}</div>
    </div>
  )
}
