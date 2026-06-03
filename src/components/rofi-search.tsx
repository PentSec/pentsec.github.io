import * as React from "react"
import { useWorkspace } from "@/components/workspace-provider"
import { WORKSPACE_LABELS } from "@/lib/workspace-reducer"

type EntryType = "workspace" | "app" | "theme"

type RofiEntry = {
  id: string
  type: EntryType
  label: string
  sublabel: string
  icon: string
}

const APP_ENTRIES: RofiEntry[] = [
  { id: "home",     type: "app", label: "~/home",     sublabel: "welcome.md",       icon: "🏠" },
  { id: "projects", type: "app", label: "~/projects", sublabel: "projects/",        icon: "📁" },
  { id: "about",    type: "app", label: "~/.about",    sublabel: "about.sh",         icon: "👤" },
  { id: "skills",   type: "app", label: "~/.skills",   sublabel: "skills.json",      icon: "⚡" },
  { id: "contact",  type: "app", label: "~/contact",  sublabel: "contact.md",       icon: "✉️" },
  { id: "blog",     type: "app", label: "~/blog",     sublabel: "latest.md",        icon: "📝" },
]

const WORKSPACE_ENTRIES: RofiEntry[] = Array.from(
  { length: Object.keys(WORKSPACE_LABELS).length },
  (_, i) => ({
    id: `ws-${i}`,
    type: "workspace" as const,
    label: WORKSPACE_LABELS[i],
    sublabel: `Workspace ${i + 1}`,
    icon: i === 0 ? "◆" : `${i + 1}`,
  }),
)

const THEME_ENTRIES: RofiEntry[] = [
  { id: "themes", type: "theme", label: "~/themes", sublabel: "Select theme", icon: "🎨" },
]

const ALL_ENTRIES: RofiEntry[] = [...APP_ENTRIES, ...THEME_ENTRIES, ...WORKSPACE_ENTRIES]

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = React.useState(value)
  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(id)
  }, [value, delayMs])
  return debounced
}

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

export function RofiSearch() {
  const { state, dispatch } = useWorkspace()
  const [query, setQuery] = React.useState("")
  const [selectedIdx, setSelectedIdx] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebouncedValue(query, 150)

  const filtered = React.useMemo(() => {
    if (!debouncedQuery.trim()) return ALL_ENTRIES

    const q = debouncedQuery.toLowerCase()
    return ALL_ENTRIES.filter(
      (entry) =>
        entry.label.toLowerCase().includes(q) ||
        entry.sublabel.toLowerCase().includes(q),
    )
  }, [debouncedQuery])

  React.useEffect(() => {
    setSelectedIdx(0)
  }, [debouncedQuery])

  React.useEffect(() => {
    if (state.rofiOpen) {
      setQuery("")
      setSelectedIdx(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [state.rofiOpen])

  useFocusTrap(containerRef, state.rofiOpen)

  const executeEntry = React.useCallback(
    (entry: RofiEntry) => {
      if (entry.type === "theme") {
        dispatch({ type: "TOGGLE_THEME_PICKER" })
        dispatch({ type: "TOGGLE_ROFI" })
        return
      }
      
      if (entry.type === "workspace") {
        const idx = parseInt(entry.id.replace("ws-", ""), 10)
        dispatch({ type: "SET_WORKSPACE", payload: idx })
      } else {
        dispatch({ type: "OPEN_WINDOW", payload: { windowId: entry.id } })
      }
      dispatch({ type: "TOGGLE_ROFI" })
    },
    [dispatch],
  )

  const close = React.useCallback(() => {
    dispatch({ type: "TOGGLE_ROFI" })
  }, [dispatch])

  const handleInputKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault()
          setSelectedIdx((prev) => (prev + 1) % filtered.length)
          break
        }
        case "ArrowUp": {
          e.preventDefault()
          setSelectedIdx(
            (prev) => (prev - 1 + filtered.length) % filtered.length,
          )
          break
        }
        case "Enter": {
          e.preventDefault()
          if (filtered.length > 0) {
            executeEntry(filtered[selectedIdx])
          }
          break
        }
        case "Escape": {
          e.preventDefault()
          close()
          break
        }
      }
    },
    [filtered, selectedIdx, executeEntry, close],
  )

  if (!state.rofiOpen) return null

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Rofi launcher"
      className="fixed inset-0 z-200 flex items-start justify-center pt-[15vh]"
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
        className="w-full max-w-[480px] overflow-hidden rounded-[12px] shadow-2xl"
        style={{
          background: "var(--bg-overlay)",
          border: "1px solid rgba(184,127,255,0.15)",
        }}
      >
        <div className="relative">
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm"
            aria-hidden="true"
            style={{ color: "var(--neon-violet)" }}
          >
            ◆
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search app or workspace..."
            className="w-full border-0 bg-transparent py-4 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] outline-none"
            style={{
              borderBottom: "1px solid rgba(184,127,255,0.10)",
            }}
            autoComplete="off"
            aria-label="Search apps and workspaces"
          />
          <div
            className="pointer-events-none absolute bottom-0 left-4 right-4 h-px"
            style={{
              background:
                "linear-gradient(90deg, var(--neon-violet), transparent)",
              opacity: 0.6,
            }}
          />
        </div>

        <div
          className="max-h-[360px] overflow-y-auto"
          role="listbox"
          aria-label="Results"
        >
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-[var(--text-subtle)]">
              No matches
            </div>
          ) : (
            filtered.map((entry, idx) => {
              const isSelected = idx === selectedIdx
              const isApp = entry.type === "app"
              return (
                <button
                  key={entry.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => executeEntry(entry)}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--neon-violet)]"
                  style={
                    isSelected
                      ? {
                          background: "rgba(184,127,255,0.08)",
                          borderBottom: "1px solid rgba(184,127,255,0.06)",
                        }
                      : {
                          background: "transparent",
                          borderBottom: "1px solid rgba(245,230,200,0.04)",
                        }
                  }
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs"
                    style={{
                      background: isApp
                        ? "rgba(0,229,200,0.10)"
                        : "rgba(184,127,255,0.10)",
                      color: isApp ? "var(--neon-teal)" : "var(--neon-violet)",
                    }}
                  >
                    {entry.icon}
                  </span>

                  <div className="flex-1 truncate">
                    <span
                      className="block truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {entry.label}
                    </span>
                    <span className="block truncate text-[11px] text-[var(--text-subtle)]">
                      {entry.sublabel}
                    </span>
                  </div>

                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10px]"
                    style={{
                      background: isApp
                        ? "rgba(0,229,200,0.10)"
                        : entry.type === "theme" 
                        ? "rgba(184,127,255,0.10)"
                        : "rgba(184,127,255,0.10)",
                      color: isApp ? "var(--neon-teal)" : "var(--neon-violet)",
                    }}
                  >
                    {isApp ? "app" : entry.type === "theme" ? "theme" : "ws"}
                  </span>
                </button>
              )
            })
          )}
        </div>

        <div
          className="flex items-center gap-4 px-4 py-2 text-[11px]"
          style={{
            color: "var(--text-subtle)",
            borderTop: "1px solid rgba(184,127,255,0.08)",
          }}
        >
          <span>↑↓ navigate</span>
          <span>↵ open app / switch workspace</span>
          <span>Esc close</span>
        </div>
      </div>
    </div>
  )
}

export default RofiSearch
