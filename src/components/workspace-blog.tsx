// @ts-expect-error — github-markdown-css ships no types, CSS side-effect only
import "github-markdown-css"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useBlogHash } from "@/lib/use-blog-hash"
import { getAllPosts, getPostBySlug } from "@/lib/blog-posts"
import type { BlogPost, BlogMeta } from "@/lib/blog-posts"

function PostCard({
  post,
  onSelect,
}: {
  post: BlogMeta
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className="w-full cursor-pointer rounded-lg border border-[var(--border-inactive)] bg-[var(--bg-surface)] p-3 text-left transition-all duration-150 hover:border-[var(--neon-violet)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)]"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-[var(--text-primary)]">
          {post.title}
        </span>
        <span className="shrink-0 text-[10px] text-[var(--text-subtle)]">
          {post.date}
        </span>
      </div>
      {post.tags.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5 text-[10px] font-mono"
              style={{
                background: "rgba(184,127,255,0.12)",
                border: "1px solid rgba(184,127,255,0.30)",
                color: "var(--neon-violet)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </button>
  )
}

function PostView({
  post,
  onBack,
}: {
  post: BlogPost
  onBack: () => void
}) {
  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="mb-3 flex items-center gap-1 text-xs text-[var(--text-subtle)] transition-colors hover:text-[var(--neon-violet)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-violet)]"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5m7-7-7 7 7 7" />
        </svg>
        Back to list
      </button>

      <h1 className="mb-1 text-lg font-medium text-[var(--text-primary)]">
        {post.title}
      </h1>
      <div className="mb-4 flex items-center gap-3 text-[11px] text-[var(--text-subtle)]">
        <span>{post.date}</span>
        {post.tags.length > 0 && (
          <div className="flex gap-1">
            {post.tags.map((tag) => (
              <span key={tag} style={{ color: "var(--neon-teal)" }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="markdown-body !bg-transparent !text-inherit">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

function BlogList({
  posts,
  onSelectPost,
}: {
  posts: BlogMeta[]
  onSelectPost: (slug: string) => void
}) {
  return (
    <div className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-xs text-[var(--text-subtle)]">
          <span style={{ color: "var(--neon-violet)" }}>
            Jeff@pentsec
          </span>
          <span className="text-[var(--text-subtle)]">:</span>
          <span style={{ color: "var(--neon-teal)" }}>~/blog</span>
          <span className="text-[var(--text-subtle)]">$ </span>
          <span>ls -la --sort=date</span>
        </p>
        <span className="text-[10px] text-[var(--text-subtle)]">
          {posts.length} post(s)
        </span>
      </div>

      {posts.length === 0 ? (
        <p className="py-8 text-center text-sm italic text-[var(--text-subtle)]">
          No posts yet. Coming soon.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              onSelect={() => onSelectPost(post.slug)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function WorkspaceBlog() {
  const { blogView, setBlogSlug } = useBlogHash()
  const posts = getAllPosts()

  if (blogView?.mode === "post") {
    const post = getPostBySlug(blogView.slug)
    if (post) {
      return <PostView post={post} onBack={() => setBlogSlug(null)} />
    }
  }

  return (
    <BlogList
      posts={posts}
      onSelectPost={(slug) => setBlogSlug(slug)}
    />
  )
}

export default WorkspaceBlog
