import * as React from "react"
import { X } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export type FloatingWindowProps = {
  title: string
  subtitle?: string
  children?: React.ReactNode
  active?: boolean
  onActivate?: () => void
  onClose?: () => void
  className?: string
}

export function FloatingWindow({
  title,
  subtitle,
  children,
  active,
  onActivate,
  onClose,
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
    "bg-[var(--bg-overlay)]/70 backdrop-blur-md",
    active && "max-md:bg-[var(--bg-overlay)] max-md:backdrop-blur-none",
    "hover:bg-[var(--bg-overlay)] hover:backdrop-blur-none",
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
    "flex h-9 max-md:h-11 items-center gap-2 px-[14px] max-md:px-3 chrome-no-select cursor-grab transition-colors duration-150 rounded-t-[12px]",
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

        <div className="flex-1" />

        {onClose && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="md:hidden flex items-center justify-center rounded-md p-1 text-[var(--text-subtle)] transition-colors hover:text-[var(--neon-red)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)]"
            aria-label={`Close ${title}`}
            style={{ minWidth: "36px", minHeight: "36px" }}
          >
            <X size={14} weight="bold" />
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-hidden rounded-b-[12px]">{children}</div>
    </div>
  )
}

export default FloatingWindow
