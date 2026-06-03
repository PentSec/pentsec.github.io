type Project = {
  name: string
  description: string
  href: string
  badges: { label: string; color: string }[]
}

const BADGE_COLORS = {
  frontend: "var(--neon-violet)",
  backend: "var(--neon-magenta)",
  infra: "var(--neon-teal)",
  game: "var(--neon-amber)",
} as const

const PROJECTS: Project[] = [
  {
    name: "MaddonsManager",
    href: "https://github.com/PentSec/MaddonsManager",
    description:
      "A manager to install those addons lost in the history of WoW Lichking, Cataclysm and Pandaria from private servers. 13 stars, community-driven addon database.",
    badges: [
      { label: "Electron", color: BADGE_COLORS.frontend },
      { label: "JavaScript", color: BADGE_COLORS.frontend },
      { label: "React", color: BADGE_COLORS.frontend },
      { label: "WoW", color: BADGE_COLORS.game },
    ],
  },
  {
    name: "pentsec.github.io",
    href: "https://github.com/PentSec/pentsec.github.io",
    description:
      "Hyprland-themed desktop-environment portfolio built with React 19, Swapy tiling, and Tailwind CSS v4. Simulates a Hyprland session in the browser.",
    badges: [
      { label: "React", color: BADGE_COLORS.frontend },
      { label: "TypeScript", color: BADGE_COLORS.frontend },
      { label: "Vite", color: BADGE_COLORS.frontend },
      { label: "Tailwind", color: BADGE_COLORS.frontend },
      { label: "Swapy", color: BADGE_COLORS.infra },
    ],
  },
  {
    name: "Leagueoflegends-champs",
    href: "https://github.com/PentSec/Leagueoflegends-champs",
    description:
      "Compare the same League of Legends champion across different game versions. Track changes to stats, abilities, and more to see how your favorite champ evolved.",
    badges: [
      { label: "JavaScript", color: BADGE_COLORS.frontend },
      { label: "React", color: BADGE_COLORS.frontend },
      { label: "LoL", color: BADGE_COLORS.game },
    ],
  },
  {
    name: "fckublizz",
    href: "https://github.com/PentSec/fckublizz",
    description:
      "Community rage counter. Un clic por IP. Turso + React + Vercel.",
    badges: [
      { label: "TypeScript", color: BADGE_COLORS.frontend },
      { label: "Blizzard", color: BADGE_COLORS.game },
    ],
  },
  {
    name: "KASA-DESKTOP",
    href: "https://github.com/PentSec/KASA-DESKTOP",
    description:
      "DA Python-based desktop application to control the Kasa KC411S camera, replicate PTZ (pan-tilt-zoom) functionality, and stream video on a PC. The project is intended to bring the features of the Kasa mobile app to desktop, using the camera's local network interface.",
    badges: [
      { label: "Java", color: BADGE_COLORS.backend },
      { label: "Desktop", color: BADGE_COLORS.infra },
    ],
  },
  {
    name: "AnimeHub",
    href: "https://github.com/PentSec/AnimeHub",
    description:
      "A React-based web application with comprehensive info about the Dragon Ball universe — characters, sagas, transformations, and more.",
    badges: [
      { label: "JavaScript", color: BADGE_COLORS.frontend },
      { label: "React", color: BADGE_COLORS.frontend },
      { label: "API", color: BADGE_COLORS.backend },
    ],
  },
]

export function WorkspaceProjects() {
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2">
      {PROJECTS.map((project) => (
        <a
          key={project.name}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-2 rounded-[10px] border border-[var(--border-inactive)] bg-[var(--bg-surface)] p-3 transition-all hover:border-[var(--neon-violet)]/40 hover:brightness-110"
        >
          <h3
            className="truncate text-sm font-semibold transition-colors group-hover:text-[var(--neon-violet)]"
            style={{ color: "var(--neon-violet)" }}
          >
            {project.name}
            <span className="ml-1 text-[var(--text-subtle)] opacity-0 transition-opacity group-hover:opacity-100">
              ↗
            </span>
          </h3>

          <p className="flex-1 text-xs leading-relaxed text-[var(--text-secondary)]">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.badges.map((badge) => (
              <span
                key={badge.label}
                className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium leading-normal"
                style={{
                  background: `${badge.color}18`,
                  border: `1px solid ${badge.color}40`,
                  color: badge.color,
                }}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </a>
      ))}
    </div>
  )
}

export default WorkspaceProjects
