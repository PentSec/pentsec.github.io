import * as React from "react"
import { useWorkspace } from "@/components/workspace-provider"

type SplashPhase = "entrance" | "visible" | "fading"

export function SplashScreen() {
  const { dispatch } = useWorkspace()
  const [phase, setPhase] = React.useState<SplashPhase>("entrance")
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const enterRaf = requestAnimationFrame(() => {
      setPhase("visible")
    })

    const fadeTimer = setTimeout(() => {
      setPhase("fading")
    }, 1500)

    const doneTimer = setTimeout(() => {
      dispatch({ type: "SPLASH_DONE" })
    }, 1800)

    return () => {
      cancelAnimationFrame(enterRaf)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [dispatch])

  React.useEffect(() => {
    const startTime = performance.now()
    const duration = 1400

    let rafId: number

    function tick() {
      const elapsed = performance.now() - startTime
      const pct = Math.min(elapsed / duration, 1)
      setProgress(pct)
      if (pct < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const isFading = phase === "fading"
  const isEntrance = phase === "entrance"

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-[var(--color-bg-base)]"
      style={{
        opacity: isFading ? 0 : 1,
        transform: isEntrance ? "scale(0.95)" : "scale(1)",
        transition: isFading
          ? "opacity 300ms ease-out"
          : "opacity 180ms ease-out, transform 180ms ease-out",
      }}
      aria-hidden="true"
    >
      <h1
        className="text-5xl font-bold tracking-tight sm:text-6xl"
        style={{
          background: "var(--gradient-neopunk)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        pentsec
      </h1>

      <p className="text-sm text-[var(--text-subtle)] tracking-widest uppercase">
        ~ desktop environment
      </p>

      <div className="flex gap-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className="inline-block h-2 w-2 rounded-full bg-[var(--border-inactive)]"
            style={{
              backgroundColor:
                i === 0 ? "var(--neon-violet)" : "var(--border-inactive)",
            }}
          />
        ))}
      </div>

      <div className="h-1 w-48 overflow-hidden rounded-full bg-[var(--bg-surface)]">
        <div
          className="h-full rounded-full transition-[width] duration-75 ease-linear"
          style={{
            width: `${progress * 100}%`,
            background:
              "linear-gradient(90deg, var(--neon-violet), var(--neon-magenta))",
          }}
        />
      </div>
    </div>
  )
}

export default SplashScreen
