import { useEffect, useState } from "react"

export type BlogView =
  | { mode: "list" }
  | { mode: "post"; slug: string }

export function useBlogHash(): {
  blogView: BlogView | null
  setBlogSlug: (slug: string | null) => void
} {
  const [blogView, setBlogView] = useState<BlogView | null>(() =>
    parseHash(),
  )

  useEffect(() => {
    const onHashChange = () => setBlogView(parseHash())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const setBlogSlug = (slug: string | null) => {
    const hash = slug ? `#/blog/${slug}` : "#/blog"
    window.history.pushState(null, "", hash)
    setBlogView(slug ? { mode: "post", slug } : { mode: "list" })
  }

  return { blogView, setBlogSlug }
}

function parseHash(): BlogView | null {
  const hash = window.location.hash
  if (!hash.startsWith("#/blog")) return null

  const rest = hash.slice("#/blog".length)
  const slug = rest.replace(/^\//, "")

  if (!slug) return { mode: "list" }
  return { mode: "post", slug }
}
