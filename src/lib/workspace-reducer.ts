/* ─── Workspace State Types ─── */

export type WindowData = {
  id: string
  title: string
  subtitle: string
}

export type WorkspaceState = {
  /** Active workspace index (0-5) */
  activeWorkspace: number
  /** Currently focused window ID, or null */
  activeWindowId: string | null
  /** Whether the Rofi search overlay is open */
  rofiOpen: boolean
  /** Whether the keybind help overlay is open */
  helpOpen: boolean
  /** Whether the splash animation has completed */
  splashDone: boolean
  /** Ordered window IDs per workspace (persisted from Swapy reorder) */
  windows: Record<number, string[]>
  /** Active HyDE theme ID */
  activeTheme: string
  /** Whether the theme picker modal is open */
  themePickerOpen: boolean
}

export type WorkspaceAction =
  | { type: "SET_WORKSPACE"; payload: number }
  | { type: "SET_ACTIVE_WINDOW"; payload: string }
  | { type: "CLOSE_WINDOW"; payload: string }
  | { type: "TOGGLE_ROFI" }
  | { type: "TOGGLE_HELP" }
  | { type: "SPLASH_DONE" }
  | { type: "WORKSPACE_NEXT" }
  | { type: "WORKSPACE_PREV" }
  | { type: "UPDATE_WINDOWS"; payload: { workspace: number; windowIds: string[] } }
  | { type: "OPEN_WINDOW"; payload: { windowId: string } }
  | { type: "SET_THEME"; payload: string }
  | { type: "TOGGLE_THEME_PICKER" }

/* ─── Constants ─── */

export const MAX_WORKSPACES = 5
export const INITIAL_WORKSPACE = 0

export const WORKSPACE_LABELS: Record<number, string> = {
  0: "~/",
  1: "~/projects",
  2: "~/skills",
  3: "~/contact",
  4: "~/blog",
}

/** Default window IDs per workspace — matches WORKSPACE_LABELS */
export const DEFAULT_WINDOW_IDS: Record<number, string[]> = {
  0: ["about", "home"],
  1: ["projects"],
  2: ["skills"],
  3: ["contact"],
  4: ["blog"],
}

/* ─── Initial State ─── */

export const initialWorkspaceState: WorkspaceState = {
  activeWorkspace: INITIAL_WORKSPACE,
  activeWindowId: null,
  rofiOpen: false,
  helpOpen: false,
  splashDone: false,
  windows: Object.fromEntries(
    Object.entries(DEFAULT_WINDOW_IDS).map(([k, v]) => [Number(k), [...v]]),
  ),
  activeTheme: "neopunk",
  themePickerOpen: false,
}

/* ─── Reducer ─── */

export function workspaceReducer(
  state: WorkspaceState,
  action: WorkspaceAction,
): WorkspaceState {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, activeTheme: action.payload, themePickerOpen: false }

    case "TOGGLE_THEME_PICKER":
      return { ...state, themePickerOpen: !state.themePickerOpen, rofiOpen: false, helpOpen: false }

    case "SET_WORKSPACE": {
      const idx = action.payload
      // Clamp 0-5; no-op if out of range
      if (idx < 0 || idx >= MAX_WORKSPACES) {
        return state
      }
      const wsWindows = state.windows[idx] ?? DEFAULT_WINDOW_IDS[idx] ?? []
      return {
        ...state,
        activeWorkspace: idx,
        activeWindowId: wsWindows[0] ?? null,
        rofiOpen: false,
        helpOpen: false,
        themePickerOpen: false,
      }
    }

    case "SET_ACTIVE_WINDOW":
      return {
        ...state,
        activeWindowId: action.payload,
      }

    case "CLOSE_WINDOW": {
      const ws = state.activeWorkspace
      const current = state.windows[ws] ?? []
      const filtered = current.filter((id) => id !== action.payload)
      return {
        ...state,
        windows: { ...state.windows, [ws]: filtered },
        activeWindowId:
          state.activeWindowId === action.payload ? null : state.activeWindowId,
      }
    }

    case "UPDATE_WINDOWS":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.payload.workspace]: action.payload.windowIds,
        },
      }

    case "OPEN_WINDOW": {
      const ws = state.activeWorkspace
      const current = state.windows[ws] ?? []
      // Don't add duplicates
      if (current.includes(action.payload.windowId)) return state
      return {
        ...state,
        windows: { ...state.windows, [ws]: [...current, action.payload.windowId] },
        activeWindowId: action.payload.windowId,
      }
    }

    case "TOGGLE_ROFI":
      return {
        ...state,
        rofiOpen: !state.rofiOpen,
        helpOpen: false,
        themePickerOpen: false,
      }

    case "TOGGLE_HELP":
      return {
        ...state,
        helpOpen: !state.helpOpen,
        rofiOpen: false,
        themePickerOpen: false,
      }

    case "SPLASH_DONE":
      return {
        ...state,
        splashDone: true,
      }

    case "WORKSPACE_NEXT": {
      const next = (state.activeWorkspace + 1) % MAX_WORKSPACES
      const wsWindows = state.windows[next] ?? DEFAULT_WINDOW_IDS[next] ?? []
      return {
        ...state,
        activeWorkspace: next,
        activeWindowId: wsWindows[0] ?? null,
      }
    }

    case "WORKSPACE_PREV": {
      const prev =
        state.activeWorkspace === 0
          ? MAX_WORKSPACES - 1
          : state.activeWorkspace - 1
      const wsWindows = state.windows[prev] ?? DEFAULT_WINDOW_IDS[prev] ?? []
      return {
        ...state,
        activeWorkspace: prev,
        activeWindowId: wsWindows[0] ?? null,
      }
    }

    default:
      return state
  }
}
