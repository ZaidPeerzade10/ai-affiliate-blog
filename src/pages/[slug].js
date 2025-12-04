import Link from "next/link";
import { getPost, getSortedPosts } from "../lib/posts";
import { useEffect, useState } from "react";


export async function getStaticPaths() {
  const posts = getSortedPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  return { props: { post } };
}

export default function Post({ post }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrollTop / height) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const published = post.date
    ? new Date(post.date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div
      className="fixed top-0 left-0 z-50 h-[3px] bg-indigo-500"
      style={{ width: `${progress}%` }}
    />
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-300"
          >
            <span aria-hidden="true">←</span>
            Back to all articles
          </Link>
        </div>

        {/* Article header */}
        <header className="mb-6">
        {/* HERO IMAGE */}
        <div className="mb-5 overflow-hidden rounded-2xl border border-slate-800">
          <noscript>
            <img
              src="https://picsum.photos/1200/600"
              alt="Article image"
              className="h-60 w-full object-cover"
            />
          </noscript>

        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            AI • Productivity
          </span>
          {published && (
            <>
              <span>•</span>
              <span>{published}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-3 text-sm md:text-base text-slate-300">
            {post.description}
          </p>
        )}
      </header>

        <div className="mb-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
            <p className="text-indigo-400 text-xs font-semibold">IN THIS ARTICLE</p>
            <p className="text-sm text-slate-200 mt-1">
              Learn how this AI issue impacts developers and what tools you should use today.
            </p>
          </div>

          <div className="rounded-xl bg-indigo-950 border border-indigo-800 p-4">
            <p className="text-indigo-300 text-xs font-semibold">RECOMMENDED</p>
            <p className="text-sm">
              Scroll for tools that can automate your workflow and save hours each week.
            </p>
          </div>
        </div>

        {/* Body */}
        <article className="mt-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 px-6 py-7 md:px-8 md:py-8 shadow-2xl ring-1 ring-white/5">
          <div className="prose prose-invert max-w-none 
            prose-h2:bg-slate-900 prose-h2:p-3 prose-h2:rounded-xl 
            prose-h2:border prose-h2:border-slate-800 
            prose-h3:text-indigo-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        {/* Call to action box */}
        <div className="mt-10 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 to-slate-950 p-5 shadow-lg">
          <h3 className="text-sm font-semibold text-indigo-300">
            Want to work faster with AI?
          </h3>
          <p className="mt-2 text-slate-200 text-sm">
            These tools were selected to help students and developers reduce effort,
            learn quicker, and build better projects.
          </p>
          <p className="mt-3 text-indigo-400 text-xs">
            Scroll up to the recommendations 👆 and try one today.
          </p>
        </div>
        {/* CTA footer */}
        <div className="mt-8 rounded-2xl border border-indigo-500/40 bg-indigo-950/40 px-5 py-4 text-xs md:text-sm text-slate-100">
          <p className="font-medium">
            Found this useful for your studies or dev workflow?
          </p>
          <p className="mt-1 text-slate-200/90">
            Try the recommended tools in the article above — they&apos;re
            hand-picked to help you learn faster, ship projects quicker, and
            automate more of your boring tasks.
          </p>
        </div>
      </div>
    </div>
  );
}
