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
    <>
      {/* ─── Top Waybar (desktop) ─── */}
      <header
        className="chrome-no-select fixed top-0 left-0 right-0 z-100 hidden md:flex h-9 items-center gap-2 px-3 mx-2 mt-2 rounded-[12px] text-xs"
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
          className="flex items-center justify-center rounded-md p-1 text-[var(--text-subtle)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)]"
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
                className={`rounded-md text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)] px-2 py-0.5 ${
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

        <div
          className="truncate text-[11px] text-[var(--text-subtle)]"
          style={{
            borderLeft: "1px solid rgba(245,230,200,0.08)",
            paddingLeft: "10px",
          }}
        >
          <span className="text-[var(--neon-violet)]">{WORKSPACE_LABELS[state.activeWorkspace]}</span>
          <span className="text-[var(--text-subtle)]"> — </span>
        </div>

        <div className="flex-1" />

        <span className="relative inline-flex h-2 w-2" aria-label="System active">
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

      {/* ─── Mobile: Compact top bar ─── */}
      <header
        className="chrome-no-select fixed top-0 left-0 right-0 z-100 flex md:hidden items-center justify-between h-8 px-3"
        style={{
          background: "rgba(10,10,15,0.45)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(245,230,200,0.05)",
          paddingTop: "var(--safe-area-top)",
        }}
        role="menubar"
        aria-label="Top bar"
      >
        <time
          className="tabular-nums text-[11px] text-[var(--text-secondary)]"
          dateTime={clock.toISOString()}
        >
          {formattedTime}
        </time>

        <span className="text-[10px] text-[var(--neon-violet)] font-medium truncate mx-2">
          {WORKSPACE_LABELS[state.activeWorkspace]}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => dispatch({ type: "TOGGLE_ROFI" })}
            className="flex items-center justify-center rounded-md p-1.5 text-[var(--text-subtle)] transition-colors hover:text-[var(--neon-violet)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)]"
            aria-label="Open launcher"
          >
            <img src="/favicon-32x32.png" alt="" className="size-3.5" />
          </button>
          <button
            onClick={() => dispatch({ type: "TOGGLE_THEME_PICKER" })}
            className="flex items-center justify-center rounded-md p-1.5 text-[var(--text-subtle)] transition-colors hover:text-[var(--neon-violet)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)]"
            aria-label="Theme picker"
          >
            <Palette size={13} weight="fill" />
          </button>
          <button
            onClick={() => dispatch({ type: "TOGGLE_HELP" })}
            className="flex items-center justify-center rounded-md p-1.5 text-[var(--text-subtle)] transition-colors hover:text-[var(--neon-violet)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)]"
            aria-label="Keybind help"
          >
            <Question size={13} weight="fill" />
          </button>
        </div>
      </header>

      {/* Mobile pagination dots — always visible above bottom nav */}
      <div
        className="fixed md:hidden bottom-[56px] left-0 right-0 z-100 flex items-center justify-center gap-1.5 pb-1 pointer-events-none"
        style={{
          paddingBottom: "var(--safe-area-bottom, 0px)",
        }}
        aria-hidden="true"
      >
        {Array.from({ length: MAX_WORKSPACES }, (_, i) => (
          <span
            key={i}
            className="rounded-full transition-all duration-200"
            style={{
              width: i === state.activeWorkspace ? "6px" : "3px",
              height: i === state.activeWorkspace ? "6px" : "3px",
              background:
                i === state.activeWorkspace
                  ? "var(--neon-violet)"
                  : "var(--text-subtle)",
              opacity: i === state.activeWorkspace ? 1 : 0.25,
              boxShadow:
                i === state.activeWorkspace
                  ? "0 0 4px var(--glow-violet)"
                  : "none",
            }}
          />
        ))}
      </div>

      {/* ─── Mobile: Bottom workspace nav ─── */}
      <nav
        className="chrome-no-select fixed bottom-0 left-0 right-0 z-100 flex md:hidden items-center justify-evenly px-2"
        style={{
          background: "rgba(10,10,15,0.65)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(245,230,200,0.06)",
          paddingBottom: "var(--safe-area-bottom)",
          height: "56px",
        }}
        role="tablist"
        aria-label="Workspaces"
      >
        {Array.from({ length: MAX_WORKSPACES }, (_, i) => {
          const isActive = state.activeWorkspace === i
          return (
            <button
              key={i}
              role="tab"
              aria-selected={isActive}
              aria-label={`Workspace ${i + 1}: ${WORKSPACE_LABELS[i]}`}
              onClick={() => handleWorkspaceClick(i)}
              className={`relative flex items-center justify-center rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)] ${
                isActive ? "text-[var(--neon-violet)]" : "text-[var(--text-subtle)]"
              } ${i === nextUndiscovered ? "animate-subtle-pulse" : ""}`}
              style={{
                width: "44px",
                height: "44px",
              }}
            >
              <span
                className="relative z-10 text-sm font-bold leading-none"
                style={
                  isActive
                    ? {
                        textShadow: "0 0 10px var(--glow-violet)",
                      }
                    : undefined
                }
              >
                {i + 1}
              </span>

              {/* Active indicator */}
              {isActive && (
                <span
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "rgba(184,127,255,0.12)",
                    border: "1px solid rgba(184,127,255,0.25)",
                  }}
                />
              )}
            </button>
          )
        })}
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="block md:hidden h-[56px]" aria-hidden="true" />
    </>
  )
}

export default Waybar
