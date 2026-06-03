import * as React from "react"
import { createSwapy, utils } from "swapy"
import type { SlotItemMapArray } from "swapy"
import { useWorkspace } from "@/components/workspace-provider"
import { FloatingWindow } from "@/components/floating-window"
import { WorkspaceHome } from "@/components/workspace-home"
import { WorkspaceAbout } from "@/components/workspace-about"
import { WorkspaceProjects } from "@/components/workspace-projects"
import { WorkspaceSkills } from "@/components/workspace-skills"
import { WorkspaceContact } from "@/components/workspace-contact"
import { WorkspaceBlog } from "@/components/workspace-blog"
import { DEFAULT_WINDOW_IDS } from "@/lib/workspace-reducer"

type WorkspaceItem = {
  id: string
  title: string
  subtitle: string
  component: React.ComponentType
}

const WINDOW_META: Record<string, Pick<WorkspaceItem, "title" | "subtitle">> = {
  home:     { title: "~/home",     subtitle: "neofetch" },
  about:    { title: "~/about",    subtitle: "about.md" },
  projects: { title: "~/projects", subtitle: "projects/" },
  skills:   { title: "~/skills",   subtitle: "skills.json" },
  contact:  { title: "~/contact",  subtitle: "contact.md" },
  blog:     { title: "~/blog",     subtitle: "latest.md" },
}

const WINDOW_COMPONENTS: Record<string, React.ComponentType> = {
  home: WorkspaceHome,
  about: WorkspaceAbout,
  projects: WorkspaceProjects,
  skills: WorkspaceSkills,
  contact: WorkspaceContact,
  blog: WorkspaceBlog,
}

function buildWorkspaceItems(windowIds: string[]): WorkspaceItem[] {
  return windowIds
    .filter((id) => id in WINDOW_COMPONENTS)
    .map((id) => ({
      id,
      ...WINDOW_META[id],
      component: WINDOW_COMPONENTS[id]!,
    }))
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  })

  React.useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [query])

  return matches
}

function WorkspaceGrid({ items }: { items: WorkspaceItem[] }) {
  const { state, dispatch } = useWorkspace()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const swapyRef = React.useRef<ReturnType<typeof createSwapy> | null>(null)
  const isMobile = useMediaQuery("(max-width: 767px)")
  const wsRef = React.useRef(state.activeWorkspace)
  wsRef.current = state.activeWorkspace

  const [slotItemMap, setSlotItemMap] = React.useState<SlotItemMapArray>(() =>
    utils.initSlotItemMap(items, "id"),
  )

  React.useEffect(() => {
    const el = containerRef.current
    if (!el || items.length < 2 || isMobile) return

    swapyRef.current = createSwapy(el, {
      manualSwap: true,
      swapMode: "hover",
      animation: "dynamic",
    })

    swapyRef.current.onSwap((event) => {
      setSlotItemMap(event.newSlotItemMap.asArray)
    })

    swapyRef.current.onSwapEnd(() => {
      const finalMap = swapyRef.current!.slotItemMap().asArray
      const orderedIds = finalMap
        .filter((entry) => entry.item !== null)
        .map((entry) => entry.item as string)
      dispatch({
        type: "UPDATE_WINDOWS",
        payload: { workspace: wsRef.current, windowIds: orderedIds },
      })
      requestAnimationFrame(() => {
        swapyRef.current?.update()
      })
    })

    return () => {
      swapyRef.current?.destroy()
      swapyRef.current = null
    }
  }, [items.length, isMobile])

  React.useEffect(() => {
    if (!swapyRef.current) return

    const itemIds = new Set(items.map((i) => i.id))
    const mappedIds = new Set(slotItemMap.map((s) => s.item).filter(Boolean))
    if (
      itemIds.size === mappedIds.size &&
      [...itemIds].every((id) => mappedIds.has(id))
    ) {
      return
    }

    utils.dynamicSwapy(
      swapyRef.current,
      items,
      "id",
      slotItemMap,
      setSlotItemMap,
    )
  }, [items])

  const gridCols =
    items.length <= 1
      ? "grid-cols-1"
      : items.length === 2
        ? "2xl:grid-cols-2 lg:grid-cols-2 max-lg:grid-cols-1"
        : "2xl:grid-cols-3 lg:grid-cols-2 max-lg:grid-cols-1"

  const slottedItems = utils.toSlottedItems(items, "id", slotItemMap)

  return (
    <main
        className="flex-1 min-h-0 flex flex-col"
        role="region"
        aria-label="Workspace content"
        id={`workspace-panel-${state.activeWorkspace}`}
      >
      <div
        ref={containerRef}
        className={`grid gap-2 p-2 ${gridCols} auto-rows-fr flex-1`}
        style={
          isMobile
            ? { gap: "6px" }
            : undefined
        }
      >
        {slottedItems.map(({ slotId, itemId, item }) =>
          item ? (
            <div key={slotId} data-swapy-slot={slotId} className="h-full">
              <div key={itemId} data-swapy-item={itemId} className="h-full">
                <FloatingWindow
                  title={item.title}
                  subtitle={item.subtitle}
                  active={itemId === state.activeWindowId}
                  onActivate={() =>
                    dispatch({
                      type: "SET_ACTIVE_WINDOW",
                      payload: itemId,
                    })
                  }
                >
                  <item.component />
                </FloatingWindow>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </main>
  )
}

type TransitionPhase = "idle" | "exit" | "enter-wait" | "enter"

const WS_TRANSITION_EXIT_MS = 180
const WS_TRANSITION_ENTER_MS = 200

export function WorkspaceContainer() {
  const { state } = useWorkspace()
  const [displayedWs, setDisplayedWs] = React.useState(state.activeWorkspace)
  const [direction, setDirection] = React.useState<1 | -1>(1)
  const [animPhase, setAnimPhase] = React.useState<TransitionPhase>("idle")

  React.useEffect(() => {
    if (state.activeWorkspace === displayedWs) return

    const dir = state.activeWorkspace > displayedWs ? 1 : -1
    setDirection(dir)
    setAnimPhase("exit")
  }, [state.activeWorkspace, displayedWs])

  React.useEffect(() => {
    if (animPhase === "idle") return

    let t: ReturnType<typeof setTimeout> | undefined

    if (animPhase === "exit") {
      t = setTimeout(() => {
        setDisplayedWs(state.activeWorkspace)
        setAnimPhase("enter-wait")
      }, WS_TRANSITION_EXIT_MS)
    } else if (animPhase === "enter-wait") {
      const raf = requestAnimationFrame(() => {
        setAnimPhase("enter")
      })
      return () => cancelAnimationFrame(raf)
    } else if (animPhase === "enter") {
      t = setTimeout(() => {
        setAnimPhase("idle")
      }, WS_TRANSITION_ENTER_MS)
    }

    return () => {
      if (t) clearTimeout(t)
    }
  }, [animPhase, state.activeWorkspace])

  const items = React.useMemo(
    () => buildWorkspaceItems(state.windows[displayedWs] ?? DEFAULT_WINDOW_IDS[displayedWs] ?? []),
    [state.windows, displayedWs],
  )

  const animStyle: React.CSSProperties = {}

  if (animPhase === "exit") {
    animStyle.opacity = 0
    animStyle.transform = `scale(0.95) translateX(${direction * -10}px)`
    animStyle.transition = `opacity ${WS_TRANSITION_EXIT_MS}ms ease-out, transform ${WS_TRANSITION_EXIT_MS}ms ease-out`
  } else if (animPhase === "enter-wait") {
    animStyle.opacity = 0
    animStyle.transform = `scale(0.95) translateX(${direction * 20}px)`
  } else if (animPhase === "enter") {
    animStyle.opacity = 1
    animStyle.transform = "scale(1) translateX(0)"
    animStyle.transition = `opacity ${WS_TRANSITION_ENTER_MS}ms ease-out, transform ${WS_TRANSITION_ENTER_MS}ms ease-out`
  }

  return (
    <div className="flex flex-col flex-1 min-h-0" style={animPhase !== "idle" ? animStyle : undefined}>
      <WorkspaceGrid key={displayedWs} items={items} />
    </div>
  )
}

export default WorkspaceContainer
