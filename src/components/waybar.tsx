import * as React from "react"
import { Question, Palette } from "@phosphor-icons/react"
import { useWorkspace } from "@/components/workspace-provider"
import { MAX_WORKSPACES, WORKSPACE_LABELS } from "@/lib/workspace-reducer"

function useClock(intervalMs = 60000) {
  const [time, setTime] = React.useState(() => new Date())
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return time
}

export function Waybar() {
  const { state, dispatch } = useWorkspace()
  const clock = useClock(60000)

  const formattedTime = clock.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  const [discovered, setDiscovered] = React.useState<Set<number>>(() => new Set([0]))

  const nextUndiscovered = React.useMemo(() => {
    for (let i = 1; i < MAX_WORKSPACES; i++) {
      if (!discovered.has(i)) return i
    }
    return -1
  }, [discovered])

  function handleWorkspaceClick(i: number) {
    if (!discovered.has(i)) {
      setDiscovered((prev) => new Set(prev).add(i))
    }
    dispatch({ type: "SET_WORKSPACE", payload: i })
  }

  return (
    <header
      className="chrome-no-select fixed top-0 left-0 right-0 z-100 flex h-9 items-center gap-2 px-3 mx-2 mt-2 rounded-[12px] text-xs"
      style={{
        background: "rgba(10,10,15,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(245,230,200,0.07)",
      }}
      role="menubar"
      aria-label="Waybar"
    >
      <button
        onClick={() => dispatch({ type: "TOGGLE_ROFI" })}
        className="max-md:hidden flex items-center justify-center rounded-md p-1 text-[var(--text-subtle)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)]"
        aria-label="Open launcher"
        title="Open launcher (Ctrl+Space)"
      >
        <img src="/favicon-32x32.png" alt="" className="size-4" />
      </button>

      <nav className="flex gap-1" role="tablist" aria-label="Workspaces">
        {Array.from({ length: MAX_WORKSPACES }, (_, i) => {
          const isActive = state.activeWorkspace === i
          return (
            <button
              key={i}
              role="tab"
              aria-selected={isActive}
              aria-label={`Switch to workspace ${i + 1}`}
              aria-controls={`workspace-panel-${i}`}
              onClick={() => handleWorkspaceClick(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleWorkspaceClick(i)
                }
              }}
              className={`rounded-md text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)] max-md:text-[10px] max-md:px-1 max-md:py-0.5 px-2 py-0.5 ${
                i === nextUndiscovered ? "animate-subtle-pulse" : ""
              }`}
              style={
                isActive
                  ? {
                      background: "rgba(184,127,255,0.15)",
                      border: "1px solid var(--neon-violet)",
                      color: "var(--neon-violet)",
                    }
                  : {
                      background: "#2a2017",
                      border: "1px solid #4a3520",
                      color: "#c9a97a",
                    }
              }
            >
              {i + 1}
            </button>
          )
        })}
      </nav>

      <div className="max-md:hidden truncate text-[11px] text-[var(--text-subtle)]" style={{ borderLeft: "1px solid rgba(245,230,200,0.08)", paddingLeft: "10px" }}>
        <span className="text-[var(--neon-violet)]">{WORKSPACE_LABELS[state.activeWorkspace]}</span>
        <span className="text-[var(--text-subtle)]"> — </span>
      </div>

      <div className="flex-1" />

      <span
        className="relative inline-flex h-2 w-2"
        aria-label="System active"
      >
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ background: "var(--neon-teal)" }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ background: "var(--neon-teal)" }}
        />
      </span>

      <span
        className="mx-1 inline-block h-3 w-px"
        style={{ background: "rgba(255,255,255,0.1)" }}
      />

      <time
        className="tabular-nums text-[var(--text-secondary)]"
        dateTime={clock.toISOString()}
        aria-label="Current time"
      >
        {formattedTime}
      </time>

      <button
        onClick={() => dispatch({ type: "TOGGLE_HELP" })}
        className="flex items-center justify-center rounded-md p-1 text-[var(--text-subtle)] transition-colors hover:text-[var(--neon-violet)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)]"
        aria-label="Toggle keybind help"
        title="Keybind help (?)"
      >
        <Question size={14} weight="fill" />
      </button>

      <button
        onClick={() => dispatch({ type: "TOGGLE_THEME_PICKER" })}
        className="flex items-center justify-center rounded-md p-1 text-[var(--text-subtle)] transition-colors hover:text-[var(--neon-violet)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)]"
        aria-label="Toggle theme picker"
        title="Theme picker (T)"
      >
        <Palette size={14} weight="fill" />
      </button>
    </header>
  )
}

export default Waybar
