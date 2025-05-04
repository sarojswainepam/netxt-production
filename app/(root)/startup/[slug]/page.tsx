import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';

import { STARTUP_BY_ID_QUERY, STARTUPS_QUERY } from '@/sanity/lib/queries';
import Link from 'next/link';
async function getPost(slug: string) {
    const post = await client.fetch(`${STARTUP_BY_ID_QUERY}`, { id: slug });
    if (!post) notFound();
    return post;
}

export async function generateStaticParams() {
    const posts = await client.fetch(`${STARTUPS_QUERY}`);

    return posts.map((post: any) => ({
        id: String(post._id),
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);

    return {
        title: post.title,
    };
}

export default async function StartupDetails({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);

    return (
        <main
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
                </div>
            </div>
        </main>
    );
}