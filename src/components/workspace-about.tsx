export function WorkspaceAbout() {
  const INFO: [string, string][] = [
    ["name", "Jeff."],
    ["role", "⚡ FullStack developer | Open Source Enthusiast | Electron | Node.js | React ⚡"],
    ["company", "@MaddonsManager"],
    ["location", "/dev/null"],
    ["languages", "Spanish (native), English (fluent)"],
    ["email", "jeff@pentsec.dev"],
    ["site", "jeff.is-a.dev"],
  ]

  return (
    <div className="p-4 text-sm leading-relaxed">
      <p className="mb-3">
        <span style={{ color: "var(--neon-violet)" }}>Jeff@pentsec</span>
        <span className="text-[var(--text-subtle)]">:</span>
        <span style={{ color: "var(--neon-teal)" }}>~/.about</span>
        <span className="text-[var(--text-subtle)]">$ </span>
        <span>cat about.md</span>
      </p>

      <table className="w-full border-collapse">
        <tbody>
          {INFO.map(([key, val]) => (
            <tr key={key} className="align-top">
              <td
                className="w-24 shrink-0 whitespace-nowrap py-[2px] pr-3 text-right text-xs uppercase tracking-wider"
                style={{ color: "var(--neon-violet)" }}
              >
                {key}
              </td>
              <td className="py-[2px] text-[var(--text-primary)]">{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WorkspaceAbout
