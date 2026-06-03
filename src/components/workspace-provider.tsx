import * as React from "react"
import { DEFAULT_THEME_ID } from "@/lib/themes"
import {
  workspaceReducer,
  initialWorkspaceState,
  MAX_WORKSPACES,
  type WorkspaceState,
  type WorkspaceAction,
} from "@/lib/workspace-reducer"

export function useHydeTheme() {
  const [theme, setTheme] = React.useState("neopunk")
  
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("hyde-theme") || DEFAULT_THEME_ID
    setTheme(savedTheme)
  }, [])

  return theme
}

type WorkspaceContextValue = {
  state: WorkspaceState
  dispatch: React.Dispatch<WorkspaceAction>
}

const WorkspaceContext = React.createContext<
  WorkspaceContextValue | undefined
>(undefined)

export function useWorkspace(): WorkspaceContextValue {
  const ctx = React.useContext(WorkspaceContext)
  if (!ctx) {
    throw new Error(
      "useWorkspace must be used within a <WorkspaceProvider>",
    )
  }
  return ctx
}

type WorkspaceProviderProps = {
  children?: React.ReactNode
}

export function WorkspaceProvider({ children }: WorkspaceProviderProps) {
  const [state, dispatch] = React.useReducer(
    workspaceReducer,
    initialWorkspaceState,
  )
  
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = state.activeTheme
      localStorage.setItem("hyde-theme", state.activeTheme)
    }
  }, [state.activeTheme])

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!state.splashDone) return

      const superKey = event.metaKey || event.ctrlKey

      if (superKey && event.key >= "1" && event.key <= "6") {
        event.preventDefault()
        const wsIndex = parseInt(event.key, 10) - 1
        if (wsIndex < MAX_WORKSPACES) {
          dispatch({ type: "SET_WORKSPACE", payload: wsIndex })
        }
        return
      }

      if (event.altKey && event.key.toLowerCase() === "w") {
        event.preventDefault()
        const targetId =
          state.activeWindowId ??
          state.windows[state.activeWorkspace]?.[0] ??
          null
        if (targetId) {
          dispatch({ type: "CLOSE_WINDOW", payload: targetId })
        }
        return
      }

      if (superKey && event.key.toLowerCase() === "f") {
        event.preventDefault()
        return
      }

      if (superKey && event.key.toLowerCase() === "r") {
        event.preventDefault()
        dispatch({ type: "TOGGLE_ROFI" })
        return
      }

      if (event.ctrlKey && !event.metaKey && event.key === " ") {
        event.preventDefault()
        dispatch({ type: "TOGGLE_ROFI" })
        return
      }

      if (event.ctrlKey && (event.key === "/" || event.key === "?")) {
        event.preventDefault()
        dispatch({ type: "TOGGLE_HELP" })
        return
      }

      if (event.key === "Escape" && (state.rofiOpen || state.helpOpen || state.themePickerOpen)) {
        event.preventDefault()
        if (state.rofiOpen) dispatch({ type: "TOGGLE_ROFI" })
        if (state.helpOpen) dispatch({ type: "TOGGLE_HELP" })
        if (state.themePickerOpen) dispatch({ type: "TOGGLE_THEME_PICKER" })
        return
      }

      if (superKey && event.key === "ArrowLeft") {
        event.preventDefault()
        dispatch({ type: "WORKSPACE_PREV" })
        return
      }

      if (superKey && event.key === "ArrowRight") {
        event.preventDefault()
        dispatch({ type: "WORKSPACE_NEXT" })
        return
      }
      
      if (event.key.toLowerCase() === "t" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const target = event.target as HTMLElement
        if (target && (target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) {
          return
        }
        event.preventDefault()
        dispatch({ type: "TOGGLE_THEME_PICKER" })
        return
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [state.splashDone, state.rofiOpen, state.helpOpen, state.themePickerOpen, state.activeWindowId, state.activeWorkspace, state.windows, state.activeTheme])

  const value = React.useMemo(
    () => ({ state, dispatch }),
    [state, dispatch],
  )

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}
