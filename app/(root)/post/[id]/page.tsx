import { notFound } from 'next/navigation';

interface Post {
    id: string;
    title: string;
    content: string;
}

async function getPost(id: string) {
    const res = await fetch(`https://api.vercel.app/blog/${id}`, {
        cache: 'force-cache',
    });
    const post: Post = await res.json();
    if (!post) notFound();
    return post;
}

export async function generateStaticParams() {
    const posts = await fetch('https://api.vercel.app/blog', {
        cache: 'force-cache',
    }).then((res) => res.json());

    return posts.map((post: Post) => ({
        id: String(post.id),
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await getPost(id);

    return {
        title: post.title,
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await getPost(id);

    return (
        <main className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-8 px-6">
                    <h1 className="text-4xl font-bold text-white text-center">{post.title}</h1>
                </div>

                <div className="p-6">
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{post.content}</p>
                </div>

                <footer className="p-4 bg-gray-100 border-t">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Published on {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </footer>
            </div>
        </main>
    );
}