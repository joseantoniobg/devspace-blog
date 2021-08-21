import fs from "fs";
import path from "path";
import matter from "gray-matter";

const files = fs.readdirSync(path.join("posts"));

export const getPosts = () => {
  const posts = files.map((file) => {
    const slug = file.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(path.join("posts", file), "utf-8");
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
};

export const getCategories = (posts) => {
  const categories: string[] = [];

  posts.forEach((post) => {
    if (!categories.find((cat) => cat === post.frontmatter.category))
      categories.push(post.frontmatter.category);
  });

  return categories;
};
