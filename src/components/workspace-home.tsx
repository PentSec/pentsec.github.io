import * as React from "react"

const AVATAR_URL = "https://github.com/PentSec.png"

const CODING_START = new Date("2006-06-01T00:00:00")

function calcUptime(): string {
  const now = new Date()
  let years = now.getFullYear() - CODING_START.getFullYear()
  let months = now.getMonth() - CODING_START.getMonth()
  if (months < 0) { years--; months += 12 }
  return `${years} years, ${months} months`
}

export function WorkspaceHome() {
  const [uptime, setUptime] = React.useState(calcUptime)

  React.useEffect(() => {
    const id = setInterval(() => setUptime(calcUptime()), 60000)
    return () => clearInterval(id)
  }, [])

  const SYS_INFO: [string, string][] = [
    ["user", "visitor"],
    ["hostname", "pentsec"],
    ["os", "Arch Linux x86_64"],
    ["kernel", "7.0.10-2-cachyos"],
    ["uptime", uptime],
    ["packages", "1379 (pacman)"],
    ["shell", "zsh 5.9"],
    ["resolution", "1920×1080 @ 120Hz"],
    ["de", "Hyprland"],
    ["wm", "Hyprland"],
    ["terminal", "Kitty"],
    ["cpu", "Intel Core i7-6700 (8) @ 3.4GHz"],
    ["gpu", "NVIDIA GeForce GTX 1060 3GB"],
    ["memory", "10 GiB / 31 GiB"],
  ]

  return (
    <div className="p-4 text-sm leading-relaxed">
      <p className="mb-3">
        <span style={{ color: "var(--neon-violet)" }}>Jeff@pentsec</span>
        <span className="text-[var(--text-subtle)]">:</span>
        <span style={{ color: "var(--neon-teal)" }}>~</span>
        <span className="text-[var(--text-subtle)]">$ </span>
        <span>neofetch</span>
      </p>

      <div className="flex gap-6">
        <div className="hidden shrink-0 sm:block">
          <img
            src={AVATAR_URL}
            alt="PentSec avatar"
            className="h-28 w-28 rounded-[12px] border border-[var(--border-inactive)] object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <table className="w-full border-collapse">
            <tbody>
              {SYS_INFO.map(([key, val]) => (
                <tr key={key} className="align-top">
                  <td
                    className="w-24 shrink-0 whitespace-nowrap py-[1px] pr-3 text-right text-xs uppercase tracking-wider"
                    style={{ color: "var(--neon-violet)" }}
                  >
                    {key}
                  </td>
                  <td className="py-[1px] text-[var(--text-primary)]">
                    {val}
                    {key === "user" && (
                      <span className="ml-1 text-[var(--text-subtle)]">
                        (U╭∩╮U)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 space-y-1 border-t border-[var(--border-inactive)] pt-3 text-[var(--text-secondary)]">
        <p>
          Welcome to{" "}
          <span style={{ color: "var(--neon-violet)" }}>pentsec</span>
          {" —"}your neopunk desktop-environment portfolio.
        </p>
        <p className="text-xs text-[var(--text-subtle)]">
          Navigate with{" "}
          <kbd className="rounded border border-[var(--border-inactive)] px-1 py-0.5 text-[10px] text-[var(--text-subtle)]">
            Ctrl+1–5
          </kbd>{" "}
          <kbd className="rounded border border-[var(--border-inactive)] px-1 py-0.5 text-[10px] text-[var(--text-subtle)]">
            Ctrl+←/→
          </kbd>
          {" "}or click the pills in the Waybar.{" "}
          <kbd className="rounded border border-[var(--border-inactive)] px-1 py-0.5 text-[10px] text-[var(--text-subtle)]">
            T
          </kbd>{" "}
          for themes.
        </p>
      </div>
    </div>
  )
}

export default WorkspaceHome
