export type BlogMeta = {
  slug: string
  title: string
  date: string
  tags: string[]
}

export type BlogPost = BlogMeta & {
  content: string
}

function parseFrontmatter(
  raw: string,
): { meta: Record<string, string>; content: string } {
  const meta: Record<string, string> = {}
  let content = raw

  if (raw.startsWith("---")) {
    const end = raw.indexOf("---", 3)
    if (end !== -1) {
      const block = raw.slice(3, end).trim()
      content = raw.slice(end + 3).trim()

      for (const line of block.split("\n")) {
        const colonIdx = line.indexOf(":")
        if (colonIdx === -1) continue
        const key = line.slice(0, colonIdx).trim()
        let value = line.slice(colonIdx + 1).trim()
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1)
        }
        meta[key] = value
      }
    }
  }

  return { meta, content }
}

function parseTags(raw: string | undefined): string[] {
  if (!raw) return []
  const match = raw.match(/^\[(.+)\]$/)
  if (match) {
    return match[1].split(",").map((t) => t.trim()).filter(Boolean)
  }
  return [raw]
}

function slugFromPath(path: string): string {
  const parts = path.split("/")
  const file = parts[parts.length - 1] ?? ""
  return file.replace(/\.md$/, "")
}

const modules = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

let cached: BlogPost[] | null = null

function buildPosts(): BlogPost[] {
  if (cached) return cached

  const posts: BlogPost[] = []

  for (const [path, raw] of Object.entries(modules)) {
    const slug = slugFromPath(path)
    const { meta, content } = parseFrontmatter(raw as string)

    posts.push({
      slug,
      title: meta["title"] ?? slug,
      date: meta["date"] ?? "",
      tags: meta["tags"] ? parseTags(meta["tags"]) : [],
      content,
    })
  }

  posts.sort((a, b) => b.date.localeCompare(a.date))
  cached = posts
  return posts
}

export function getAllPosts(): BlogPost[] {
  return buildPosts()
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return buildPosts().find((p) => p.slug === slug)
}
