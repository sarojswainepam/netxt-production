import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = async () => {
    const session = await auth();
    console.log('Session:', session);
    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href="/">
                    <Image src={"/logo.png"} alt='logo' width={144} height={30} />
                </Link>
                <div className='flex items-center gap-5 text-black'>
                    {session && session.user ? (
                        <>
                            <Link href="/dashboard" className='text-sm text-gray-500 hover:text-gray-900'>Dashboard</Link>
                            <Link href={`/profile/${session?.user.id}`} className='text-sm text-gray-500 hover:text-gray-900'>Profile</Link>
                            <form
                                action={async () => {
                                    'use server';
                                    await signOut({ redirectTo: '/' })
                                }}
                                className='text-sm text-gray-500 hover:text-gray-900'>
                                <button type='submit' className='bg-gray-900 text-white px-4 py-2 rounded-md'>Sign out</button>
                            </form>
                        </>
                    ) : (
                        <>
                            <form
                                action={async () => {
                                    'use server';
                                    await signIn('github')
                                }}
                                className='text-sm text-gray-500 hover:text-gray-900'>
                                <button type='submit' className='bg-gray-900 text-white px-4 py-2 rounded-md'>Sign In</button>
                            </form>
                            <Link href="/register" className='text-sm text-gray-500 hover:text-gray-900'>Register</Link>
                        </>
                    )
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar