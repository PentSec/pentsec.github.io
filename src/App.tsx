import * as React from "react"
import { WorkspaceProvider, useWorkspace } from "@/components/workspace-provider"
import { SplashScreen } from "@/components/splash-screen"
import { Waybar } from "@/components/waybar"
import { WorkspaceContainer } from "@/components/workspace-container"
import { RofiSearch } from "@/components/rofi-search"
import { KeybindHelp } from "@/components/keybind-help"
import { ThemePickerModal } from "@/components/theme-picker-modal"
import { getWallpaper } from "@/lib/wallpapers"
import { getTheme } from "@/lib/themes"

function AppContent() {
  const { state, dispatch } = useWorkspace()
  const theme = getTheme(state.activeTheme)
  const wallpaperUrl = getWallpaper(state.activeTheme)

  React.useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "")
      if (hash.startsWith("blog/") || hash === "blog") {
        dispatch({ type: "SET_WORKSPACE", payload: 5 })
      }
    }
    onHashChange()
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [dispatch])

  return (
  <div className="flex flex-col min-h-svh pt-12 bg-[var(--color-bg-base)] relative">
  <div
    aria-hidden="true"
    className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-[background-image] duration-500 ease-out"
    style={{ backgroundImage: `url(${wallpaperUrl})` }}
  />
  <div
    aria-hidden="true"
    className="fixed inset-0 z-0"
    style={{ background: theme.isLight ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.35)" }}
  />

  <div className="relative z-1 flex flex-col flex-1 min-h-0">
  {!state.splashDone && <SplashScreen />}

  <Waybar />

  <WorkspaceContainer />

  <RofiSearch />
  <ThemePickerModal />
  <KeybindHelp />
  </div>
  </div>
  )
}

export function App() {
  return (
    <WorkspaceProvider>
      <AppContent />
    </WorkspaceProvider>
  )
}

export default App;
