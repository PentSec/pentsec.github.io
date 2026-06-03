type SocialLink = {
  label: string
  path: string
  href: string
  color: string
}

const LINKS: SocialLink[] = [
  {
    label: "GitHub",
    path: "~/github/pentsec",
    href: "https://github.com/pentsec",
    color: "var(--neon-violet)",
  },
  {
    label: "Twitter / X",
    path: "~/x/__J3ff__",
    href: "https://x.com/__J3ff_",
    color: "var(--neon-teal)",
  },
  {
    label: "Instagram",
    path: "~/instagram/jeffreysfuenmayor_",
    href: "https://www.instagram.com/jeffreysfuenmayor_/",
    color: "var(--neon-magenta)",
  },
  {
    label: "YouTube",
    path: "~/youtube/@sitoz1",
    href: "https://www.youtube.com/@Sitoz1",
    color: "var(--neon-red)",
  },
  {
    label: "Twitch",
    path: "~/twitch/sitoz1",
    href: "https://twitch.tv/sitoz1",
    color: "var(--neon-amber)",
  },
  {
    label: "Discord",
    path: "~/discord/pentsec",
    href: "https://discord.gg/fUw5C6tcZs",
    color: "var(--neon-violet)",
  },
  {
    label: "LinkedIn",
    path: "~/linkedin/in/jeffreys-fuenmayor",
    href: "https://linkedin.com/in/jeffreys-fuenmayor",
    color: "var(--neon-teal)",
  },
  {
    label: "Website",
    path: "~/sites/jeff.is-a.dev",
    href: "https://jeff.is-a.dev/",
    color: "var(--neon-amber)",
  },
]

export function WorkspaceContact() {
  return (
    <div className="p-4 text-sm leading-relaxed">
      <p className="mb-3">
        <span style={{ color: "var(--neon-violet)" }}>Jeff@pentsec</span>
        <span className="text-[var(--text-subtle)]">:</span>
        <span style={{ color: "var(--neon-teal)" }}>~</span>
        <span className="text-[var(--text-subtle)]">$ </span>
        <span>cat ~/contact.md</span>
      </p>

      <div className="space-y-2">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 transition-all hover:bg-[var(--bg-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)]"
          >
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full transition-transform group-hover:scale-125"
              style={{ background: link.color }}
            />

            <span className="font-mono text-xs text-[var(--text-subtle)]">
              {link.path}
            </span>

            <span
              className="ml-auto text-xs opacity-0 transition-opacity group-hover:opacity-100"
              style={{ color: link.color }}
            >
              &#8599;
            </span>
          </a>
        ))}
      </div>

      <p className="mt-4 border-t border-[var(--border-inactive)] pt-3 text-xs text-[var(--text-subtle)]">
        ORCID:{" "}
        <span style={{ color: "var(--neon-violet)" }}>
          0009-0006-9354-178X
        </span>
      </p>
    </div>
  )
}

export default WorkspaceContact
