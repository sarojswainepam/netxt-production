import { client } from '@/sanity/lib/client';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import Link from 'next/link';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default async function Startup() {

    const { data } = await sanityFetch({ query: STARTUPS_QUERY });


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Startups
                </h1>
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((post: { _id: Key | null | undefined; image: string | Blob | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; category: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; author: { image: string | Blob | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; _createdAt: string | number | Date; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; views: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; slug: { current: any; }; }) => (
                        <Link
                            href={`/startup/${post._id}`}
                            key={post._id}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-5 flex flex-col h-full">
                                <p className="text-sm text-blue-500 font-bold mb-2">
                                    {post.category}
                                </p>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {post.title}
                                </h2>
                                <div className="flex items-center mb-4">
                                    <img
                                        src={post.author.image}
                                        alt={post.author.name}
                                        className="h-10 w-10 rounded-full object-cover mr-3 border border-gray-300"
                                    />
                                    <div>
                                        <p className="text-gray-700 font-medium">{post.author.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(post._createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                                    {post.description}
                                </p>
                                <div className="mt-auto flex justify-between items-center">
                                    <p className="text-sm text-gray-500">
                                        {post.views} Views
                                    </p>
                                    <Link
                                        href={`/post/${post.slug.current}`}
                                        className="inline-block text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-sm font-medium transition-colors duration-300"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <SanityLive />
        </div>

    );
}