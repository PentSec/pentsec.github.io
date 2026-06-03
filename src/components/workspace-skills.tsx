type Badge = {
  label: string
  color: string
}

type SkillCategory = {
  name: string
  badges: Badge[]
}

const V = "var(--neon-violet)"
const M = "var(--neon-magenta)"
const T = "var(--neon-teal)"
const A = "var(--neon-amber)"

const CATEGORIES: SkillCategory[] = [
  {
    name: "Frontend",
    badges: [
      { label: "TypeScript", color: V },
      { label: "JavaScript", color: V },
      { label: "React", color: V },
      { label: "Electron", color: V },
      { label: "Next.js", color: V },
      { label: "TailwindCSS", color: V },
    ],
  },
  {
    name: "UI & Design",
    badges: [
      { label: "HeroUI", color: M },
      { label: "DaisyUI", color: M },
      { label: "MUI", color: M },
      { label: "React Icons", color: M },
    ],
  },
  {
    name: "Backend",
    badges: [
      { label: "Node.js", color: A },
      { label: "Express", color: A },
      { label: "Sequelize", color: A },
      { label: "SQLite", color: A },
      { label: "MySQL", color: A },
    ],
  },
  {
    name: "Ecosystem",
    badges: [
      { label: "Linux", color: T },
      { label: "Docker", color: T },
      { label: "Git", color: T },
      { label: "GitHub", color: T },
      { label: "Nginx", color: T },
    ],
  },
  {
    name: "Misc",
    badges: [
      { label: "Python", color: V },
      { label: "Lua", color: V },
      { label: "Ruby", color: V },
      { label: "Perl", color: V },
      { label: "C++", color: V },
      { label: "Shell", color: V },
      { label: "Scala", color: V },
      { label: "Tcl", color: V },
    ],
  },
]

export function WorkspaceSkills() {
  return (
    <div className="p-4 text-sm">
      <p className="mb-3">
        <span style={{ color: "var(--neon-violet)" }}>Jeff@pentsec</span>
        <span className="text-[var(--text-subtle)]">:</span>
        <span style={{ color: "var(--neon-teal)" }}>~</span>
        <span className="text-[var(--text-subtle)]">$ </span>
        <span>cat ~/skills.json</span>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((cat) => (
          <section key={cat.name}>
            <h3
              className="mb-2 text-xs font-semibold uppercase tracking-widest"
              style={{ color: cat.badges[0]?.color ?? V }}
            >
              {cat.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.badges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-block rounded-md px-2.5 py-1 text-xs font-medium transition-colors hover:brightness-125"
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
          </section>
        ))}
      </div>
    </div>
  )
}

export default WorkspaceSkills
