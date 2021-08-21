import Head from 'next/head';
import Header from './Header';

export default function Layout({ title, keywords="blog, tech", description="A blog for nerds", children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='keywords' content={keywords} />
        <meta name='description' content={description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header  />
      <main className='container mx-auto my-7 px-10'>
        {children}
      </main>
    </div>
  )
}
