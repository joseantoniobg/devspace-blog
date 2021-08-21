import fs from 'fs'
import path from 'path'
import Layout from "@components/Layout"
import matter from 'gray-matter'
import Post from '@components/Post'
import { getPosts, getCategories } from '@lib/posts';
import CategoryList from '@components/CategoryList';

export default function CategoryBlogPage({posts, categoryTitle, categories}) {
  return (
    <Layout title="Devspace" keywords="blog, tech" description="A blog for nerds">
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
           <h1 className='text-5xl border-b-4 p-5 font-bold'>Posts for category {categoryTitle}</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, index) => (<Post key={index} post={post} />))}
            </div>
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))
  const categories = files.map((file) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', file), 'utf-8');
    const { data:frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  })

  const paths = categories.map((category) => ({
    params: {
      category_name: category,
    }
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params: { category_name } }) => {
  const posts = getPosts()
  const categoryPosts = posts.filter((post) => post.frontmatter.category.toLowerCase() === category_name)
  const categories = getCategories(posts);

  return {
    props: {
      posts: categoryPosts,
      category: category_name,
      categoryTitle: categoryPosts.length > 0 ? categoryPosts[0].frontmatter.category : category_name,
      categories
    }
  }
}