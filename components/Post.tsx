import Link from "next/link"
import Image from "next/image"
import CategoryLabel from "./CategoryLabel"

export default function Post(props) {
  return (
    <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>
      {!props.compact && (<Image src={props.post.frontmatter.cover_image} alt='' height={420} width={600} className="mb-4 rounded" />)}
      <div className="flex justify-between items-center">
        <span className="fint-light text-gray-600">
          {props.post.frontmatter.date}
        </span>
        <CategoryLabel>
          {props.post.frontmatter.category}
        </CategoryLabel>
      </div>
      <div className="mt-2">
        <Link href={`/blog/${props.post.slug}`}>
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {props.post.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">
          {props.post.frontmatter.excerpt}
        </p>
      </div>
      {!props.compact && (<div className="flex justify-between items-center mt-6">
        <Link href={`/blog/${props.post.slug}`}>
          <a className='text-gray-900 hover:text-blue-600'>
            Read more
          </a>
        </Link>
        <div className="flex items-center">
          <img src={props.post.frontmatter.author_image} alt="author" className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" />
          <p className="text-gray-700 font-bold">
            {props.post.frontmatter.author}
          </p>
        </div>
      </div>)}
    </div>
  )
}
