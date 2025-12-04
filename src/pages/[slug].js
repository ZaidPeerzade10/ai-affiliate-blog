import { getPost, getSortedPosts } from "../lib/posts";

export async function getStaticPaths() {
  const posts = getSortedPosts();
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  return { props: { post } };
}

export default function Post({ post }) {
  return (
    <main style={{ padding: "40px" }}>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <article dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
