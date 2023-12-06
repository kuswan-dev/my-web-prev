import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'

export default function SignIn() {
    const router = useRouter()
    const supabase = useSupabaseClient()

    function signIn(provider: 'google' | 'facebook') {
        supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: 'http://localhost:3000/' + router.query.from }
        })
    }

    return (
        <main className='h-screen flex items-center justify-center'>
            <div className='bg-white shadow-md rounded-xl px-12 py-8'>
                <h1 className='font-bold text-3xl text-center'>Welcome</h1>
                <p className='text-slate-500 mt-4'>Please sign in with your account.</p>
                <div className='flex flex-col gap-y-4 font-bold text-white my-8'>
                    <button
                        className='flex items-center gap-x-2 bg-red-500 rounded-lg px-8 py-2.5 hover:bg-red-600'
                        onClick={() => signIn('google')}
                    >
                        <FaGoogle />
                        Google
                    </button>
                    <button
                        className='flex items-center gap-x-2 bg-sky-600 rounded-lg px-8 py-2.5 hover:bg-sky-700'
                    >
                        <FaFacebook />
                        Facebook
                    </button>
                    <button
                        className='flex items-center gap-x-2 bg-sky-400 rounded-lg px-8 py-2.5 hover:bg-sky-500'
                    >
                        <FaTwitter />
                        Twitter
                    </button>
                    <button
                        className='flex items-center gap-x-2 bg-slate-500 rounded-lg px-8 py-2.5 hover:bg-slate-600'
                    >
                        <FaGithub />
                        Github
                    </button>
                </div>
                <div className='flex justify-center gap-x-2 text-sm'>
                    <p>Read our</p>
                    <Link
                        className='font-bold'
                        href='/'
                    >
                        Privacy and Policy
                    </Link>
                </div>
            </div>
        </main>
    )
}
