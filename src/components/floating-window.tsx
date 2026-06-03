import * as React from "react"
import { cn } from "@/lib/utils"

export type FloatingWindowProps = {
  title: string
  subtitle?: string
  children?: React.ReactNode
  active?: boolean
  onActivate?: () => void
  className?: string
}

export function FloatingWindow({
  title,
  subtitle,
  children,
  onActivate,
  className,
}: FloatingWindowProps) {
  return (
    <div
      role="application"
      aria-label={title}
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onActivate?.()
        }
      }}
  className={cn(
    "group rounded-[12px] w-full h-full flex flex-col",
    "bg-[var(--bg-overlay)]/70 backdrop-blur-md hover:bg-[var(--bg-overlay)] hover:backdrop-blur-none",
    "border border-[var(--border-inactive)] hover-aurora",
    "shadow-[0_4px_6px_rgba(0,0,0,0.4),0_8px_20px_rgba(0,0,0,0.45)]",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(184,127,255,0.25)]",
    "transition-all duration-200 ease-out",
    className,
  )}
    >
      <div
        data-swapy-handle
        className={cn(
    "flex h-9 items-center gap-2 px-[14px] chrome-no-select cursor-grab transition-colors duration-150 rounded-t-[12px]",
    "bg-[var(--bg-surface)]/60 backdrop-blur-sm group-hover:bg-[var(--bg-surface)]",
    "text-[var(--text-subtle)] group-hover:text-[var(--neon-violet)]",
        )}
      >
        <span className="text-sm font-medium leading-none">{title}</span>
        {subtitle && (
          <>
            <span className="text-xs text-[var(--text-subtle)]">&mdash;</span>
            <span className="truncate text-xs text-[var(--text-subtle)]">
              {subtitle}
            </span>
          </>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-hidden rounded-b-[12px]">{children}</div>
    </div>
  )
}

export default FloatingWindow
