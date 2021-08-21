import fs from 'fs'
import path from 'path'
import Layout from "@components/Layout"
import Post from '@components/Post'
import { ITEMS_PER_PAGE } from '@config/index';
import Pagination from '@components/Pagination'
import { getPosts, getCategories } from '@lib/posts';
import CategoryList from '@components/CategoryList';

export default function BlogPage({ posts, numPages, currentPage, categories }) {
  return (
    <Layout title="Devspace" keywords="blog, tech" description="A blog for nerds">
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className='text-5xl border-b-4 p-5 font-bold'>All Posts</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (<Post key={index} post={post} />))}
          </div>
          <Pagination currentPage={currentPage} numPages={numPages} />
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
  const numPages = Math.ceil(files.length / ITEMS_PER_PAGE);
  const paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: {
        page_index: i.toString(),
      }
    });
  }
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const page = parseInt((params && params.page_index) || 1)
  const posts = getPosts();

  const categories = getCategories(posts);

  const numPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const pageIndex = page - 1;

  return {
    props: {
      posts: posts.slice(pageIndex * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
      numPages,
      currentPage: page,
      categories
    }
  }
}