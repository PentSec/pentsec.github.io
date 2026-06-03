import * as React from "react"
import { THEMES } from "@/lib/themes"
import { useWorkspace } from "@/components/workspace-provider"

interface ThemePickerModalProps {
  children?: React.ReactNode
}

export function ThemePickerModal({}: ThemePickerModalProps) {
  const { state, dispatch } = useWorkspace()
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!state.themePickerOpen) return
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
  }, [state.themePickerOpen])

  const close = React.useCallback(() => {
    dispatch({ type: "TOGGLE_THEME_PICKER" })
  }, [dispatch])

  const selectTheme = React.useCallback(
    (themeId: string) => {
      dispatch({ type: "SET_THEME", payload: themeId })
    },
    [dispatch],
  )

  if (!state.themePickerOpen) return null

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Theme picker"
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
        className="w-full max-w-[640px] overflow-hidden rounded-[12px] shadow-2xl"
        style={{
          background: "var(--bg-overlay)",
          border: "1px solid rgba(184,127,255,0.15)",
        }}
      >
        <div className="px-4 py-3 border-b border-[var(--border-inactive)]">
          <h2 
            className="text-lg font-bold"
            style={{ color: "var(--neon-violet)" }}
          >
            Themes
          </h2>
          <p className="text-sm text-[var(--text-subtle)]">
            HyDE theme picker
          </p>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {THEMES.map((theme) => {
              const isActive = state.activeTheme === theme.id
              return (
                <div
                  key={theme.id}
                  onClick={() => selectTheme(theme.id)}
                  className="rounded-lg p-4 cursor-pointer transition-all duration-200 border"
                  style={{
                    border: isActive 
                      ? "2px solid var(--neon-violet)" 
                      : "1px solid var(--border-inactive)",
                    background: isActive 
                      ? "rgba(184,127,255,0.05)" 
                      : "transparent",
                    boxShadow: isActive 
                      ? "0 0 8px var(--glow-violet)" 
                      : "none"
                  }}
                >
                  <div className="flex gap-1 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full border border-[var(--border-inactive)]"
                      style={{ backgroundColor: theme.colors.neonViolet }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-[var(--border-inactive)]"
                      style={{ backgroundColor: theme.colors.neonMagenta }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-[var(--border-inactive)]"
                      style={{ backgroundColor: theme.colors.neonTeal }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-[var(--border-inactive)]"
                      style={{ backgroundColor: theme.colors.neonAmber }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-[var(--border-inactive)]"
                      style={{ backgroundColor: theme.colors.bgBase }}
                    />
                  </div>

                  <div 
                    className="h-1 rounded-full mb-3"
                    style={{ 
                      background: theme.colors.activeBorder,
                      border: "1px solid var(--border-inactive)"
                    }}
                  />

                  <div className="font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    {theme.name}
                  </div>
                  <div className="text-xs truncate text-[var(--text-subtle)]">
                    {theme.description}
                  </div>

                  {isActive && (
                    <div className="mt-2 text-xs text-[var(--neon-violet)] flex items-center gap-1">
                      <span>✓</span> Active
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div 
          className="flex items-center gap-4 px-4 py-2 text-[11px]"
          style={{
            color: "var(--text-subtle)",
            borderTop: "1px solid rgba(184,127,255,0.08)",
          }}
        >
          <span>↵ select theme</span>
          <span>Esc close</span>
        </div>
      </div>
    </div>
  )
}

export default ThemePickerModal
