import * as React from "react"
import { useWorkspace } from "@/components/workspace-provider"

type KeybindEntry = {
  keys: string
  action: string
}

type KeybindCategory = {
  title: string
  binds: KeybindEntry[]
}

const CATEGORIES: KeybindCategory[] = [
  {
    title: "Workspace navigation",
    binds: [
      { keys: "Ctrl + 1–6",  action: "Switch to workspace N" },
      { keys: "Ctrl + ←",    action: "Previous workspace" },
      { keys: "Ctrl + →",    action: "Next workspace" },
    ],
  },
  {
    title: "Windows",
    binds: [
      { keys: "Alt + W",     action: "Close active window" },
      { keys: "Click window", action: "Focus / activate window" },
    ],
  },
  {
    title: "Overlays",
    binds: [
      { keys: "Ctrl + R",     action: "Rofi app / workspace launcher" },
      { keys: "Ctrl + Space", action: "Rofi app / workspace launcher" },
      { keys: "Ctrl + ?",     action: "Keybind reference (this)" },
      { keys: "Escape",       action: "Close any overlay" },
    ],
  },
]

function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isActive: boolean,
) {
  React.useEffect(() => {
    if (!isActive) return
    const container = containerRef.current
    if (!container) return
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return
      if (!container) return
      const focusable =
        container.querySelectorAll<HTMLElement>(focusableSelector)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [containerRef, isActive])
}

export function KeybindHelp() {
  const { state, dispatch } = useWorkspace()
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (state.helpOpen) {
      requestAnimationFrame(() => containerRef.current?.focus())
    }
  }, [state.helpOpen])

  useFocusTrap(containerRef, state.helpOpen)

  const close = React.useCallback(() => {
    dispatch({ type: "TOGGLE_HELP" })
  }, [dispatch])

  React.useEffect(() => {
    if (!state.helpOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault()
        close()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [state.helpOpen, close])

  if (!state.helpOpen) return null

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Keybind reference"
      tabIndex={-1}
      className="fixed inset-0 z-200 flex items-start justify-center pt-[12vh] outline-none"
      style={{
        background: "rgba(26,21,16,0.70)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div
        className="w-full max-w-[520px] overflow-hidden rounded-[12px] shadow-2xl"
        style={{
          background: "var(--bg-overlay)",
          border: "1px solid rgba(184,127,255,0.15)",
        }}
      >
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{
            borderBottom: "1px solid rgba(184,127,255,0.10)",
          }}
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md text-xs"
            style={{
              background: "rgba(184,127,255,0.12)",
              color: "var(--neon-violet)",
            }}
          >
            ?
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Keybinds
          </span>
        </div>

        <div className="max-h-[50vh] overflow-y-auto px-5 py-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="mb-4 last:mb-0">
              <div
                className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--neon-violet)" }}
              >
                {cat.title}
              </div>

              {cat.binds.map((bind) => (
                <div
                  key={bind.keys}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm"
                  style={{
                    borderBottom: "1px solid rgba(245,230,200,0.04)",
                  }}
                >
                  <span style={{ color: "var(--text-subtle)" }}>
                    {bind.action}
                  </span>
                  <kbd
                    className="rounded-md px-2.5 py-1 text-xs font-mono tracking-wide"
                    style={{
                      background: "rgba(184,127,255,0.08)",
                      color: "var(--neon-teal)",
                      border: "1px solid rgba(0,229,200,0.12)",
                    }}
                  >
                    {bind.keys}
                  </kbd>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          className="flex items-center gap-4 px-5 py-2.5 text-[11px]"
          style={{
            color: "var(--text-subtle)",
            borderTop: "1px solid rgba(184,127,255,0.08)",
          }}
        >
          <span>Esc close</span>
        </div>
      </div>
    </div>
  )
}

export default KeybindHelp
