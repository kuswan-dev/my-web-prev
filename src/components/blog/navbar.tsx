import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiBookmarkAlt, BiGridAlt, BiLogOut, BiSearch, BiUser } from 'react-icons/bi'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false)
    const router = useRouter()
    const session = useSession()
    const supabase = useSupabaseClient()

    return (
        <nav className='flex items-center justify-between gap-x-4 bg-white shadow-md px-8 py-4'>
            <Link className='flex-1 font-bold text-xl' href='/blog'>My Blog</Link>
            <Link href='/blog/search'>
                <BiSearch size='24' />
            </Link>
            {session ? (
                <Image
                    className='rounded-full cursor-pointer'
                    src={session.user.user_metadata.avatar_url}
                    alt=''
                    width='35'
                    height='35'
                    onClick={() => setShowMenu(true)}
                />
            ) : (
                <Link href={'/sign-in?from=' + router.asPath}>Sign In</Link>
            )}
            {showMenu && session && (
                <>
                    <div
                        className='w-full h-full top-0 left-0 fixed z-10'
                        onClick={() => setShowMenu(false)}
                    />
                    <div className='top-16 right-8 absolute bg-white shadow-md rounded-xl overflow-hidden z-20'>
                        <div className='bg-slate-200 px-6 py-4'>
                            <p className='font-bold'>{session.user.user_metadata.full_name}</p>
                            <p className='text-slate-500 text-xs'>{session.user.email}</p>
                        </div>
                        <div className='flex flex-col text-slate-500 p-2'>
                            {session.user.email === 'codemine6@gmail.com' && (
                                <Link
                                    className='flex items-center gap-x-4 rounded-md px-4 py-2 hover:text-black hover:bg-slate-200'
                                    href='/admin'
                                >
                                    <BiGridAlt />
                                    Dashboard
                                </Link>
                            )}
                            <Link
                                className='flex items-center gap-x-4 rounded-md px-4 py-2 hover:text-black hover:bg-slate-200'
                                href='/'
                            >
                                <BiUser />
                                Profile
                            </Link>
                            <Link
                                className='flex items-center gap-x-4 rounded-md px-4 py-2 hover:text-black hover:bg-slate-200'
                                href='/'
                            >
                                <BiBookmarkAlt />
                                Bookmark
                            </Link>
                            <button
                                className='flex items-center gap-x-4 rounded-md px-4 py-2 hover:text-black hover:bg-slate-200'
                                onClick={() => supabase.auth.signOut()}
                            >
                                <BiLogOut />
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </nav>
    )
}
