import { getSortedPosts } from "../lib/posts";
import Link from "next/link";

export async function getStaticProps() {
  const posts = getSortedPosts();
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Top bar / logo */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Daily AI Productivity Brief
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              AI tools & productivity tips for{" "}
              <span className="text-indigo-400">students</span> and{" "}
              <span className="text-indigo-400">developers</span>
            </h1>
            <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl">
              Short, practical breakdowns of AI tools, workflows, and automation
              so you can write code faster, learn smarter, and build cooler side projects.
            </p>
          </div>
        </header>

        {/* If no posts yet */}
        {posts.length === 0 && (
          <p className="text-slate-400 text-sm">
            No articles yet. Check back soon – the bot will start publishing automatically.
          </p>
        )}

        {/* Posts grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => {
            const published = post.date
              ? new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "";

            return (
              <Link href={`/${post.slug}`} key={post.slug} className="group">
                <article className="h-full rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40 transition transform hover:-translate-y-1 hover:border-indigo-500/70 hover:bg-slate-900">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      AI • Productivity
                    </span>
                    {published && <span>{published}</span>}
                  </div>

                  <h2 className="text-lg md:text-xl font-semibold leading-snug text-slate-50 group-hover:text-indigo-300">
                    {post.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-300 line-clamp-3">
                    {post.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span>~ 5 min read</span>
                    <span className="inline-flex items-center gap-1 text-indigo-300 group-hover:text-indigo-200">
                      Read insights
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Small footer */}
        <footer className="mt-10 border-t border-slate-800 pt-4 text-xs text-slate-500 flex items-center justify-between">
          <span>Made with 🧠 + ⚙️ automation</span>
          <span>Auto-published daily</span>
        </footer>
      </div>
    </div>
  );
}
