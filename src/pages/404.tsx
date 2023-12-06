import Link from 'next/link'
import { BiRightArrowAlt } from 'react-icons/bi'

export default function NotFound() {
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <p className='font-bold text-2xl'>404</p>
            <p className='font-bold text-4xl my-4'>Page not found</p>
            <p className='text-slate-500'>Sorry, we couldn’t find the page you’re looking for.</p>
            <div className='flex items-center gap-x-4 font-bold text-sm mt-10'>
                <Link
                    className='text-white bg-slate-800 rounded-lg px-4 py-2.5'
                    href='/'
                >
                    Go back home
                </Link>
                <Link
                    className='flex'
                    href='/contact'
                >
                    Contact support
                    <BiRightArrowAlt size='20' />
                </Link>
            </div>
        </div>
    )
}
