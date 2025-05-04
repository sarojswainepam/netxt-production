import Link from 'next/link';
import SearchForm from "../components/searchform";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const data = await fetch('https://api.vercel.app/blog');
  const posts = await data.json();

  const query = (await searchParams).query;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">My Blog</h1>
        <SearchForm query={query} />
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    <Link href={`/post/${post.id}`} passHref>
                      <span className="hover:underline">{post.title}</span>
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-auto">
                  <Link
                    href={`/post/${post.id}`}
                    passHref
                    className="inline-block text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-sm font-medium transition-colors duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}