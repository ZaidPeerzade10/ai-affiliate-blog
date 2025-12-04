import { getSortedPosts } from "../lib/posts";
import Link from "next/link";

export async function getStaticProps() {
  const posts = getSortedPosts();
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <main style={{ padding: "40px" }}>
      <h1>AI Tools & Productivity for Students & Developers</h1>
      {posts.map(post => (
        <div key={post.slug}>
          <h2>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </h2>
          <p>{post.description}</p>
          <hr/>
        </div>
      ))}
    </main>
  );
}
