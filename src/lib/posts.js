import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getSortedPosts() {
  const files = fs.readdirSync(postsDirectory);

  return files.map((file) => {
    const fullPath = path.join(postsDirectory, file);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContent);

    return {
      ...data,
      slug: data.slug
    };
  });
}

export async function getPost(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContent);

  const processed = await remark().use(html).process(content);
  const htmlContent = processed.toString();

  return { ...data, slug, content: htmlContent };
}
