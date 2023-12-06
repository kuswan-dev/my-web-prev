import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'

export default function SignInOption() {
    const router = useRouter()
    const supabase = useSupabaseClient()

    function signIn(provider: 'google') {
        supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: 'http://localhost:3000/' + router.asPath }
        })
    }

    return (
        <div className='text-center my-12'>
            <p className='font-bold text-3xl'>Login to start Discussion</p>
            <p className='text-slate-500 mt-4'>You can login with your social media account.</p>
            <div className='flex justify-center gap-x-4 mt-8'>
                <button
                    className='bg-white shadow-md rounded-full p-4 hover:text-white hover:bg-slate-800'
                    onClick={() => signIn('google')}
                >
                    <FaGoogle size='28' />
                </button>
                <button
                    className='bg-white shadow-md rounded-full p-4 hover:text-white hover:bg-slate-800'
                >
                    <FaFacebook size='28' />
                </button>
                <button
                    className='bg-white shadow-md rounded-full p-4 hover:text-white hover:bg-slate-800'
                >
                    <FaTwitter size='28' />
                </button>
                <button
                    className='bg-white shadow-md rounded-full p-4 hover:text-white hover:bg-slate-800'
                >
                    <FaGithub size='28' />
                </button>
            </div>
        </div>
    )
}
